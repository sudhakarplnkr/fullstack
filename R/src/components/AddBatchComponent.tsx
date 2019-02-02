import * as React from 'react';
import 'react-fa';
import { IProjectBatchModel, ProcessProjectGroup } from '../models/ProjectBatch';
import { AssociateProjectGroup } from '../typings/ApiClient';
import { DateExtension } from '../utils/DateExtension';
import ModalDialogComponent from './Shared/ModalDialogComponent';

type Props = {
    saveBatch: () => void;
    updateProjectBatch: (projectBatchModel: IProjectBatchModel) => void;
    projectBatchModel: IProjectBatchModel
};
const AddBatchComponent = (props: Props) => {
    const selectedProjectGroup = React.createRef<HTMLSelectElement>();
    const nonSelectedProjectGroup = React.createRef<HTMLSelectElement>();
    const selectProjectBatch = (isAll: boolean) => {
        if (!nonSelectedProjectGroup.current) {
            return;
        }
        let options = nonSelectedProjectGroup.current && nonSelectedProjectGroup.current.options;
        const projectBatchModel = { ...props.projectBatchModel };
        if (projectBatchModel.associateProjectGroup && options) {
            const associateProjectGroup = Object.create(projectBatchModel.associateProjectGroup) as AssociateProjectGroup[];
            if (associateProjectGroup) {
                for (let index = 0; index < options.length; index++) {
                    if (options[index].selected || isAll) {
                        const associate = associateProjectGroup.filter(u => u.id === options[index].value).pop();
                        if (associate) {
                            associate.isGroup = true;
                        }
                    }
                }
            }
            props.updateProjectBatch(projectBatchModel);
        }
    };

    const unSelectProjectBatch = (isAll: boolean) => {
        if (!selectedProjectGroup.current) {
            return;
        }
        let options = selectedProjectGroup.current.options;
        const projectBatchModel = { ...props.projectBatchModel };
        if (projectBatchModel.associateProjectGroup) {
            const associateProjectGroup = Object.create(projectBatchModel.associateProjectGroup) as AssociateProjectGroup[];
            for (let index = 0; index < options.length; index++) {
                if (options[index].selected || isAll) {
                    const existingAssociate = associateProjectGroup.filter(u => u.id === options[index].value).pop();
                    if (existingAssociate) {
                        existingAssociate.isGroup = false;
                    }
                }
            }
        }
        props.updateProjectBatch(projectBatchModel);
    };

    const selectedSearchTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.updateProjectBatch({ selectedSearchText: event.target.value });
    };

    const nonSelectedSearchTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.updateProjectBatch({ nonSelectedSearchText: event.target.value });
    };

    const onChange = (processProjectGroup?: ProcessProjectGroup) => {
        const model = { ...props.projectBatchModel };
        if (!model.selectedBatch) {
            model.selectedBatch = { addAssociates: [] };
        }
        Object.assign(model.selectedBatch, processProjectGroup);
        props.updateProjectBatch(model);
    };

    return (
        <ModalDialogComponent
            showDialog={!!props.projectBatchModel.showAddBatch}
            okayLabel={'Save'}
            title={props.projectBatchModel.selectedBatch && props.projectBatchModel.selectedBatch.id ? 'Edit Batch' : 'Add Batch'}
            Ok={() => props.saveBatch()}
            Cancel={() => props.updateProjectBatch({ showAddBatch: false })}
            element={
                <form className="form-horizontal vertical-form-control">
                    <div className="form-group">
                        <label className="control-label col-sm-3">Batch Name:</label>
                        <div className="col-md-2">
                            <input
                                type="text"
                                className="form-control"
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChange({ name: event.target.value })}
                                defaultValue={props.projectBatchModel.selectedBatch && props.projectBatchModel.selectedBatch.name}
                                placeholder="Name"
                            />
                        </div>
                        <label className="control-label col-sm-3">Start Date:</label>
                        <div className="col-md-4">
                            <input
                                type="date"
                                className="form-control"
                                defaultValue={DateExtension.formatDate(props.projectBatchModel.selectedBatch && props.projectBatchModel.selectedBatch.startDate)}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChange({ startDate: new Date(event.target.value) })}
                                placeholder="dd-MM-yyyy"
                            />
                        </div>
                    </div>
                    <div className="row center">
                        <div className="col-md-5">
                            <input className="form-control" onChange={(event: React.ChangeEvent<HTMLInputElement>) => selectedSearchTextChange(event)} type="text" placeholder="Filter" name="associateCodeNotInGroup" />
                            <label className="control-label col-sm-3">Non-selected</label>
                            <select ref={nonSelectedProjectGroup} className="form-control" multiple={true} key="non-selected">
                                {props.projectBatchModel.associateProjectGroup && props.projectBatchModel.associateProjectGroup
                                    .filter((u: AssociateProjectGroup) => !props.projectBatchModel.selectedSearchText || u.name && u.name.toLowerCase().includes(props.projectBatchModel.selectedSearchText.toLowerCase()))
                                    .filter((u: AssociateProjectGroup) => !u.isGroup)
                                    .map((associateProjectGroup: AssociateProjectGroup) => {
                                        return (
                                            <option key={associateProjectGroup.id} value={associateProjectGroup.id}>{associateProjectGroup.code + '-' + associateProjectGroup.name}</option>
                                        );
                                    })}
                            </select>
                        </div>
                        <div className="col-md-2 btn-group-vertical buttons">
                            <button type="button" onClick={() => selectProjectBatch(true)} className="btn btn-default" title="Move all">
                                <i className="glyphicon glyphicon-arrow-right" />
                                <i className="glyphicon glyphicon-arrow-right" />
                            </button>
                            <button type="button" onClick={() => selectProjectBatch(false)} className="btn btn-default" title="Move selected">
                                <i className="glyphicon glyphicon-arrow-right" />
                            </button>
                            <button type="button" onClick={() => unSelectProjectBatch(false)} className="btn btn-default" title="Remove selected">
                                <i className="glyphicon glyphicon-arrow-left" />
                            </button>
                            <button type="button" onClick={() => unSelectProjectBatch(true)} className="btn btn-default" title="Remove all">
                                <i className="glyphicon glyphicon-arrow-left" />
                                <i className="glyphicon glyphicon-arrow-left" />
                            </button>
                        </div>
                        <div className="col-md-5">
                            <input className="form-control" onChange={(event: React.ChangeEvent<HTMLInputElement>) => nonSelectedSearchTextChange(event)} type="text" placeholder="Filter" name="associateCodeNotInGroup" />
                            <label className="control-label col-sm-3">Selected</label>
                            <select ref={selectedProjectGroup} className="form-control" multiple={true} key="non-selected">
                                {props.projectBatchModel.associateProjectGroup && props.projectBatchModel.associateProjectGroup
                                    .filter((u: AssociateProjectGroup) => !props.projectBatchModel.nonSelectedSearchText || u.name && u.name.toLowerCase().includes(props.projectBatchModel.nonSelectedSearchText.toLowerCase()))
                                    .filter((u: AssociateProjectGroup) => u.isGroup)
                                    .map((associateProjectGroup: AssociateProjectGroup) => {
                                        return (
                                            <option key={associateProjectGroup.id} value={associateProjectGroup.id}>{associateProjectGroup.code + '-' + associateProjectGroup.name}</option>
                                        );
                                    })}
                            </select>
                        </div>
                    </div>
                    <div className="row" />
                </form>}
        />
    );
};
export default AddBatchComponent;