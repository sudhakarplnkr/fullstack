import * as React from 'react';
import 'react-fa';
import { IProjectBatchModel } from '../models/ProjectBatch';
import { Project, ProjectGroup, ProjectGroupPlanWithStatus } from '../typings/ApiClient';
import AddBatchComponent from './AddBatchComponent';
import AddPlanComponent from './AddPlanComponent';
import AssociateStatusComponent from './AssociateStatusComponent';
import ModalDialogComponent from './Shared/ModalDialogComponent';

type Props = {
    loadProjectGroupPlan: (batchId: string) => void;
    loadBatches: (projectId: string) => void;
    showModal: (show: Boolean) => void;
    loadAddPlan: (addPlan: Boolean, projectGroupPlan?: ProjectGroupPlanWithStatus) => void;
    loadAssociateStatus: (groupPlan: Boolean, groupPlanId: string) => void;
    updateProjectBatch: (projectBatchModel: IProjectBatchModel) => void;
    projectBatchModel: IProjectBatchModel;
    saveBatch: () => void;
    loadAddBatch: (addBatch: boolean) => void;
    deleteBatch: () => void;
    deletePlan: () => void;
    updateAddPlan: (updatePlan: ProjectGroupPlanWithStatus) => void;
    formHandler: () => void;
    downloadPlan: (file?: string, fileName?: string) => void;
};

const ProjectBatchComponent = (props: Props) => {
    return (
        <React.Fragment>
            <ModalDialogComponent showDialog={!!props.projectBatchModel.showDialog} title={'CONFIRMATION'} Ok={() => props.deleteBatch()} Cancel={() => props.showModal(false)} element={<p>Are you sure you want to delete this batch?</p>} />

            <ModalDialogComponent showDialog={!!props.projectBatchModel.deletedPlanId} title={'CONFIRMATION'} Ok={() => props.deletePlan()} Cancel={() => props.updateProjectBatch({ deletedPlanId: undefined })} element={<p>Are you sure you want to delete this plan?</p>} />

            <AddPlanComponent
                projectBatchModel={props.projectBatchModel}
                loadAddPlan={(addPlan: boolean, projectGroupPlan: ProjectGroupPlanWithStatus) => props.loadAddPlan(addPlan, projectGroupPlan)}
                updateAddPlan={(updatePlan: ProjectGroupPlanWithStatus) => props.updateAddPlan(updatePlan)}
                formHandler={() => props.formHandler()}
            />
            <AddBatchComponent
                updateProjectBatch={(projectBatchModel: IProjectBatchModel) => props.updateProjectBatch(projectBatchModel)}
                saveBatch={() => props.saveBatch()}
                projectBatchModel={props.projectBatchModel}
            />
            <AssociateStatusComponent
                projectBatchModel={props.projectBatchModel}
                loadAssociateStatus={(groupPlan: Boolean, groupPlanId: string) => props.loadAssociateStatus(groupPlan, groupPlanId)}
                downloadPlan={(file: string, fileName: string) => this.downloadPlan(file, fileName)}
            />
            <div className="col-md-12" style={{ position: 'static' }}>
                <div className="col-md-1">
                    <h5> Project </h5>
                </div>
                <div className="col-md-4">
                    <div className="dropdown">
                        <select
                            className="form-control"
                            value={props.projectBatchModel.selectedProject ? props.projectBatchModel.selectedProject.id : '0'}
                            onChange={(event) => props.loadBatches(event.target.value)}
                        >
                            <option key="0" value="Select Project">Select Project</option>
                            {props.projectBatchModel.project && props.projectBatchModel.project.map((project: Project) => {
                                return (
                                    <option key={project.id} value={project.id}>{project.name}</option>
                                );
                            })}
                        </select>
                    </div>
                </div>
                <div className="col-md-1">
                    <h5> Batch </h5>
                </div>
                <div className="col-md-4">
                    <div className="dropdown" key="option">
                        <select
                            key="values"
                            value={props.projectBatchModel.selectedBatch ? props.projectBatchModel.selectedBatch.id : '0'}
                            className="form-control"
                            onChange={(event) => props.loadProjectGroupPlan(event.target.value)}
                        >
                            <option key="0" value="Select Batch">Select Batch</option>
                            {props.projectBatchModel.batch && props.projectBatchModel.batch.map((batch: ProjectGroup) => {
                                return (
                                    <option key={batch.id} value={batch.id}>{batch.name}</option>
                                );
                            })}
                        </select>
                    </div>
                </div>
                <div className="col-md-1">
                    {props.projectBatchModel.selectedProject && props.projectBatchModel.selectedBatch ?
                        <button type="button" className="btn btn-primary" onClick={() => props.loadAddBatch(true)}>Edit Batch</button>
                        : props.projectBatchModel.selectedProject ?
                            <button type="button" className="btn btn-primary" onClick={() => props.loadAddBatch(true)}>Create Batch</button>
                            : ''
                    }
                </div>
                <div className="col-md-1">
                    {props.projectBatchModel.selectedProject && props.projectBatchModel.selectedBatch &&
                        <button type="button" className="btn btn-secondary" onClick={() => props.showModal(true)}>Delete Batch</button>
                    }
                </div>
            </div>
            <div className="col-md-12">
                {props.projectBatchModel.selectedProject && props.projectBatchModel.selectedBatch ?
                    <button type="button" className="btn btn-link btn pull-right" onClick={() => props.loadAddPlan(true)}>Add Plan</button>
                    : ''
                }
            </div>
            <div>
                {props.projectBatchModel.selectedProject && props.projectBatchModel.selectedBatch ?
                    <table id="dtBasicExample" className="table table-striped table-bordered table-sm" cellSpacing="0">
                        <thead>
                            <tr>
                                <th className="th-sm">Week</th>
                                <th className="th-sm">Day</th>
                                <th className="th-sm">Title</th>
                                <th className="th-sm">Mode</th>
                                <th className="th-sm">Owner</th>
                                <th className="th-sm">Scheduled Date</th>
                                <th className="th-sm">Status</th>
                                <th className="th-sm text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.projectBatchModel.projectGroupPlan && props.projectBatchModel.projectGroupPlan.map((projectGroupPlan: ProjectGroupPlanWithStatus, index: number) => {
                                return (
                                    <tr key={index}>
                                        <td>{projectGroupPlan.week}</td>
                                        <td>{projectGroupPlan.day}</td>
                                        <td>{projectGroupPlan.knowledgeTransferName}</td>
                                        <td>{projectGroupPlan.modeName}</td>
                                        <td>{projectGroupPlan.ownerName}</td>
                                        <td>{projectGroupPlan.scheduledDate.toLocaleDateString()}</td>
                                        <td><i className="btn btn-link" onClick={() => props.loadAssociateStatus(true, projectGroupPlan.id)}>{projectGroupPlan.completedCount}/{projectGroupPlan.totalCount}</i></td>
                                        <td className="text-center">
                                            <i className="fa fa-edit hand-pointer" onClick={() => props.loadAddPlan(true, projectGroupPlan)} />&nbsp;&nbsp;
                                            <i className="fa fa-remove hand-pointer" onClick={() => props.updateProjectBatch({ deletedPlanId: projectGroupPlan.id })} />
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    : ''
                }
            </div>

        </React.Fragment >
    );
};
export default ProjectBatchComponent;
