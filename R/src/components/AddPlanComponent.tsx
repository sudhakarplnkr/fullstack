import * as React from 'react';
import 'react-fa';
import { IProjectBatchModel, ProjectGrouppPlanModel } from '../models/ProjectBatch';
import { Associate, KnowledgeTransfer, Mode, ProjectGroupPlanWithStatus, Role } from '../typings/ApiClient';
import { DateExtension } from '../utils/DateExtension';
import ModalDialogComponent from './Shared/ModalDialogComponent';

type Props = {
    loadAddPlan: (addPlan: Boolean, projectGroupPlan?: ProjectGroupPlanWithStatus) => void;
    updateAddPlan: (updatePlan: ProjectGrouppPlanModel) => void;
    formHandler: () => void;
    projectBatchModel: IProjectBatchModel;
};

const AddPlanComponent = (props: Props) => {
    return (
        <ModalDialogComponent
            showDialog={!!props.projectBatchModel.showAddPlan}
            okayLabel={'Save'}
            title={props.projectBatchModel.projectPlan && props.projectBatchModel.projectPlan.id ? 'Edit Plan' : 'Add Plan'}
            Ok={() => props.formHandler()}
            Cancel={() => props.loadAddPlan(false)}
            element={
                <form className="form-horizontal vertical-form-control">
                    <div className="form-group">
                        <label className="control-label col-sm-2">KT Title:</label>
                        <div className="col-sm-10">
                            <select id="KnowledgeTransfer" className="form-control" value={props.projectBatchModel.projectPlan && props.projectBatchModel.projectPlan.knowledgeTransferId} onChange={(event) => props.updateAddPlan({ knowledgeTransferId: event.target.value })}>
                                <option key="0">Select Title</option>
                                {props.projectBatchModel.knowledgeTransfer && props.projectBatchModel.knowledgeTransfer.map((knowledgeTransfer: KnowledgeTransfer) => {
                                    return (
                                        <option key={knowledgeTransfer.id} value={knowledgeTransfer.id}>{knowledgeTransfer.name}</option>
                                    );
                                })}
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-sm-2">Role:</label>
                        <div className="col-sm-4">
                            <select id="Role" className="form-control" value={props.projectBatchModel.projectPlan && props.projectBatchModel.projectPlan.roleId} onChange={(event) => props.updateAddPlan({ roleId: event.target.value })}>
                                <option key="0">Select Role</option>
                                {props.projectBatchModel.role && props.projectBatchModel.role.map((role: Role) => {
                                    return (
                                        <option key={role.id} value={role.id} >{role.name}</option>
                                    );
                                })}
                            </select>
                        </div>
                        <label className="control-label col-sm-2">Owner:</label>
                        <div className="col-sm-4">
                            <select id="Owner" className="form-control" value={props.projectBatchModel.projectPlan && props.projectBatchModel.projectPlan.ownerId} onChange={(event) => props.updateAddPlan({ ownerId: event.target.value })}>
                                <option>Select Owner</option>
                                {props.projectBatchModel.associate && props.projectBatchModel.associate.map((associate: Associate) => {
                                    return (
                                        <option key={associate.id} value={associate.id}>{associate.name}</option>
                                    );
                                })}
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-sm-2">Mode:</label>
                        <div className="col-sm-4">
                            <select id="Mode" className="form-control" value={props.projectBatchModel.projectPlan && props.projectBatchModel.projectPlan.modeId} onChange={(event) => props.updateAddPlan({ modeId: event.target.value })}>
                                <option key="0" >Select Mode</option>
                                {props.projectBatchModel.mode && props.projectBatchModel.mode.map((mode: Mode) => {
                                    return (
                                        <option key={mode.id} value={mode.id}>{mode.name} </option>
                                    );
                                })}
                            </select>
                        </div>
                        <label className="control-label col-sm-2">Scheduled:</label>
                        <div className="col-sm-4">
                            <input type="date" className="form-control" placeholder="dd-MM-yyyy" value={props.projectBatchModel.projectPlan && props.projectBatchModel.projectPlan.scheduledDate && DateExtension.formatDate(props.projectBatchModel.projectPlan.scheduledDate)} onChange={(event) => props.updateAddPlan({ scheduledDate: new Date(event.target.value) })} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-sm-2">Week:</label>
                        <div className="col-sm-4">
                            <input type="text" className="form-control" placeholder="Week" id="Week" value={props.projectBatchModel.projectPlan && props.projectBatchModel.projectPlan.week} onChange={(event) => props.updateAddPlan({ week: Number(event.target.value) })} />
                        </div>
                        <label className="control-label col-sm-2">Day:</label>
                        <div className="col-sm-4">
                            <input type="text" className="form-control" placeholder="Day" id="Day" value={props.projectBatchModel.projectPlan && props.projectBatchModel.projectPlan.day} onChange={(event) => props.updateAddPlan({ day: Number(event.target.value) })} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-sm-2">Reference:</label>
                        <div className="col-sm-10">
                            <textarea className="form-control" placeholder="Reference" id="Reference" value={props.projectBatchModel.projectPlan && props.projectBatchModel.projectPlan.reference} onChange={(event) => props.updateAddPlan({ reference: event.target.value })} />
                        </div>
                    </div>
                </form>
            }
        />
    );
};
export default AddPlanComponent;