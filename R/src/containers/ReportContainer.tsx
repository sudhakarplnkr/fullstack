import * as React from 'react';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import { bindActionCreators } from 'redux';
import { addPlanSave, createBatch, deleteBatch, deletePlan, loadAddBatch, loadAddPlan, loadAssociateStatus, loadBatches, loadProjectGroupPlan, loadProjects, saveBatch, showModal, updatePlan, updateProjectBatch } from '../actions/ReportActions';
import ProjectBatchComponent from '../components/ReportComponent';
import { MessageConstants } from '../constants/MessageConstants';
import { IProjectBatchModel, IProjectProps, IProjectState } from '../models/ProjectBatch';
import { Associate, AssociateProjectGroup, CreateProjectGroupPlan, ProcessCreateProjectGroup, ProcessUpdateProjectGroup, ProjectGroupPlanWithStatus, UpdateProjectGroupPlan } from '../typings/ApiClient';
import * as DownloadClient from '../utils/DownloadService';

class ReportContainer extends React.Component<IProjectProps, IProjectState> {

    public componentWillMount() {
        this.props.loadProjects();
    }

    private updateProjectBatch(projectBatchModel: IProjectBatchModel) {
        const model: IProjectBatchModel = { ...this.props.projectBatchModel, ...projectBatchModel };
        this.props.updateProjectBatch(model);
    }
    private addPlanSave() {
        const { projectBatchModel } = this.props;

        if (projectBatchModel.selectedBatch && projectBatchModel.selectedBatch.id && projectBatchModel.selectedProject && projectBatchModel.selectedProject.id) {
            if (projectBatchModel.projectPlan && projectBatchModel.projectPlan.id) {
                const model = { ...projectBatchModel.projectPlan } as UpdateProjectGroupPlan;
                this.props.updatePlan(projectBatchModel.selectedBatch.id, model);
            } else {
                const model = { ...projectBatchModel.projectPlan, projectGroupId: projectBatchModel.selectedBatch.id } as CreateProjectGroupPlan;
                this.props.addPlanSave(projectBatchModel.selectedBatch.id, model);
            }
            this.updateProjectBatch({ showAddPlan: false });
        }
    }
    private downloadPlan = (file: string, fileName: string) => {
        DownloadClient.default.downloadFile(file, fileName);
    };

    private deletePlan() {
        const { projectBatchModel } = this.props;
        if (projectBatchModel.selectedBatch && projectBatchModel.selectedBatch.id) {
            this.props.deletePlan(projectBatchModel.selectedBatch.id, projectBatchModel.deletedPlanId);
            this.updateProjectBatch({ deletedPlanId: undefined });
        }
    }
    private updateAddPlan(projectPlan: ProjectGroupPlanWithStatus) {
        const uAddPlan = { ...this.props.projectBatchModel.projectPlan, ...projectPlan };
        this.updateProjectBatch({ projectPlan: uAddPlan });
    }

    private onProjectSelect(projectId: string) {
        const project = this.props.projectBatchModel.project && this.props.projectBatchModel.project.filter(u => u.id === projectId).pop();
        const model = { ...this.props.projectBatchModel, selectedProject: project };
        this.props.updateProjectBatch(model);
        this.props.loadBatches(projectId);
    }

    private onBatchSelect(batchId: string) {
        const batch = this.props.projectBatchModel.batch && this.props.projectBatchModel.batch.filter(u => u.id === batchId).pop();
        const model = { ...this.props.projectBatchModel, selectedBatch: batch };
        this.props.updateProjectBatch(model);
        this.props.loadProjectGroupPlan(batchId);
    }

    private saveBatch() {
        if (!this.props.projectBatchModel.selectedBatch || this.props.projectBatchModel.selectedBatch && !this.props.projectBatchModel.selectedBatch.name) {
            toastr.error(MessageConstants.PROJECT_BATCH_TITLE_MESSAGE, MessageConstants.PROJECT_BATCH_NAME_REQUIRED_MESSAGE);
            return;
        }
        if (!this.props.projectBatchModel.selectedBatch || this.props.projectBatchModel.selectedBatch && !this.props.projectBatchModel.selectedBatch.startDate) {
            toastr.error(MessageConstants.PROJECT_BATCH_TITLE_MESSAGE, MessageConstants.PROJECT_BATCH_DATE_REQUIRED_MESSAGE);
            return;
        }
        const projectBatchModel = { ...this.props.projectBatchModel };
        if (projectBatchModel.selectedBatch && projectBatchModel.selectedBatch.id) {
            this.getSelectedAssociate(projectBatchModel);
            this.getDeletedAssociate(projectBatchModel);
            const model = {} as ProcessUpdateProjectGroup;
            Object.assign(model, projectBatchModel.selectedBatch, { projectGroupId: projectBatchModel.selectedBatch.id });
            this.props.saveBatch(model.projectGroupId, model);
            this.updateProjectBatch({ showAddBatch: false });
        } else if (projectBatchModel.selectedProject && projectBatchModel.selectedBatch) {
            projectBatchModel.selectedBatch.projectId = projectBatchModel.selectedProject.id;
            this.getSelectedAssociate(projectBatchModel);
            this.props.createBatch({ ...this.props.projectBatchModel.selectedBatch } as ProcessCreateProjectGroup);                        
        }
    }

    private getSelectedAssociate(projectBatchModel: IProjectBatchModel) {
        if (projectBatchModel.selectedBatch) {
            projectBatchModel.selectedBatch.addAssociates = [];
        }
        if (projectBatchModel.associateProjectGroup) {
            projectBatchModel.associateProjectGroup.filter(u => u.isGroup)
                .forEach((associateProjectGroup: AssociateProjectGroup) => {
                    if (!projectBatchModel.selectedProjectBatch ||
                        projectBatchModel.selectedProjectBatch.length === 0 ||
                        projectBatchModel.selectedProjectBatch.filter(s => s === associateProjectGroup.id).length === 0) {
                        const associate = {
                            id: associateProjectGroup.id,
                            roleId: associateProjectGroup.roleId,
                            projectId: projectBatchModel.selectedProject ? projectBatchModel.selectedProject.id : ''
                        } as Associate;
                        if (projectBatchModel.selectedBatch && projectBatchModel.selectedBatch.addAssociates) {
                            projectBatchModel.selectedBatch.addAssociates.push(associate);
                        }
                    }
                });
        }
    }

    private getDeletedAssociate(projectBatchModel: IProjectBatchModel) {
        if (projectBatchModel.selectedBatch) {
            projectBatchModel.selectedBatch.deleteAssociates = [];
        }
        if (projectBatchModel.selectedProjectBatch) {
            projectBatchModel.selectedProjectBatch.forEach((id: string) => {
                const associateProject = projectBatchModel.associateProjectGroup && projectBatchModel.associateProjectGroup.filter(u => !u.isGroup && u.id === id).pop();
                if (associateProject) {
                    const associate = {
                        id: associateProject.id,
                        roleId: associateProject.roleId,
                        projectId: projectBatchModel.selectedProject ? projectBatchModel.selectedProject.id : ''
                    } as Associate;
                    if (projectBatchModel.selectedBatch && projectBatchModel.selectedBatch.deleteAssociates) {
                        projectBatchModel.selectedBatch.deleteAssociates.push(associate);
                    }
                }
            });
        }
    }

    private loadAddBatch(addBatch: boolean) {
        if (this.props.projectBatchModel.selectedProject && this.props.projectBatchModel.selectedBatch) {
            this.props.loadAddBatch(addBatch, this.props.projectBatchModel.selectedProject.id, this.props.projectBatchModel.selectedBatch.id);
        } else if (this.props.projectBatchModel.selectedProject) {
            this.props.loadAddBatch(addBatch, this.props.projectBatchModel.selectedProject.id, '');
        }
    }

    private loadAddPlan(addPlan: boolean, projectGroupPlan: ProjectGroupPlanWithStatus) {
        if (this.props.projectBatchModel.selectedProject && this.props.projectBatchModel.selectedBatch) {
            this.props.loadAddPlan(addPlan, projectGroupPlan);
        }
    }
    private deleteBatch() {
        if (this.props.projectBatchModel.selectedBatch) {
            this.clearState();
            this.props.deleteBatch(this.props.projectBatchModel.selectedBatch.id);
        }
    }

    private clearState() {
        this.updateProjectBatch({ showDialog: false, showAddBatch: false, selectedProject: undefined, selectedBatch: undefined, batch: [], selectedProjectBatch: [], projectGroupPlan: [] });
    }

    public render() {
        return (
            <ProjectBatchComponent
                deleteBatch={() => this.deleteBatch()}
                loadAddBatch={(addBatch: boolean) => this.loadAddBatch(addBatch)}
                saveBatch={() => this.saveBatch()}
                formHandler={() => this.addPlanSave()}
                updateAddPlan={(projectGroupPlan: ProjectGroupPlanWithStatus) => this.updateAddPlan(projectGroupPlan)}
                updateProjectBatch={(projectBatchModel: IProjectBatchModel) => this.updateProjectBatch(projectBatchModel)}
                loadBatches={(projectId: string) => this.onProjectSelect(projectId)}
                loadProjectGroupPlan={(batchId: string) => this.onBatchSelect(batchId)}
                projectBatchModel={this.props.projectBatchModel}
                showModal={(show: Boolean) => this.props.showModal(show)}
                loadAddPlan={(addPlan: boolean, projectGroupPlan: ProjectGroupPlanWithStatus) => this.loadAddPlan(addPlan, projectGroupPlan)}
                loadAssociateStatus={(groupPlan: Boolean, groupPlanId: string) => this.props.loadAssociateStatus(groupPlan, groupPlanId)}
                downloadPlan={(file: string, fileName: string) => this.downloadPlan(file, fileName)}
                deletePlan={() => this.deletePlan()}
            />
        );
    }
}
const mapStateToProps = (state: any) => {
    return {
        projectBatchModel: state.projectBatch.projectBatchModel
    };
};

const mapDispatchToProps = (dispatch: any) =>
    bindActionCreators(
        {
            loadProjects,
            loadBatches,
            loadProjectGroupPlan,
            showModal,
            loadAddPlan,
            loadAddBatch,
            loadAssociateStatus,
            updateProjectBatch,
            createBatch,
            saveBatch,
            deleteBatch,
            addPlanSave,
            updatePlan,
            deletePlan
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ReportContainer);