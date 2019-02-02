import * as React from 'react';
import 'react-fa';
import { AssociateModel, EmployeeDetail } from '../models/Associate';
import { AccountRole, Project, Role, Team } from '../typings/ApiClient';
import DatePicker from './Shared/DatePicker';

type Props = {
    loadTeam: (projectId: string) => void;
    saveAssociate: () => void;
    updateAssociateDetail: (employeeDetail?: EmployeeDetail) => void;
    updateAssociateModel: (associateModel: AssociateModel) => void;
    associateModel: AssociateModel;
};

const AssociateAddComponent = (props: Props) => {

    const { EmployeeDetails } = props.associateModel;

    const onNumberChange = (value: string) => {
        if (value) {
            props.updateAssociateDetail({ fNZExperience: Number(value) });
        }
    };

    const onNumberChangeExperience = (value: string) => {
        if (value) {
            props.updateAssociateDetail({ experienceOfAssociate: Number(value) });
        }
    };

    const onProjectChange = (value: string) => {
        if (value) {
            props.loadTeam(value);
            props.updateAssociateDetail({ projectId: value });
        }
    };

    if (!props.associateModel.IsAddEdit) {
        return null;
    }
    return (
        <div className="container-fluid">
            <div className="col-md-12">
                <button name="associatedetails" type="button" onClick={() => props.updateAssociateModel({ IsAddEdit: false })} value="add" className=" btn btn-link btn pull-left">Associate Details</button>
            </div>
            <div className="col-md-12">
                <form>
                    <fieldset>
                        <legend>Basic Information</legend>
                        <div className="form-group col-md-4">
                            <label>Cognizant ID</label>
                            <input type="number" className="form-control" defaultValue={EmployeeDetails && EmployeeDetails.cognizantId ? EmployeeDetails.cognizantId : ''} onChange={(event) => props.updateAssociateDetail({ cognizantId: event.target.value })} id="CognizantId" />
                        </div>
                        <div className="form-group col-md-4">
                            <label>Associate Name</label>
                            <input type="text" className="form-control" defaultValue={EmployeeDetails && EmployeeDetails.associateName} onChange={(event) => props.updateAssociateDetail({ associateName: event.target.value })} id="AssociateName" />
                        </div>
                        <div className="form-group col-md-4">
                            <label>Cognizant Email Id</label>
                            <input type="text" className="form-control" defaultValue={EmployeeDetails && EmployeeDetails.cognizantEmailId} onChange={(event) => props.updateAssociateDetail({ cognizantEmailId: event.target.value })} id="CognizantEmailId" />
                        </div>
                        <div className="form-group col-md-4">
                            <label>Cognizant Role</label>
                            <select className="form-control" value={EmployeeDetails && EmployeeDetails.cognizantRoleId} onChange={(event) => props.updateAssociateDetail({ cognizantRoleId: event.target.value })} >
                                <option key="0" value="">Select Cognizant Role</option>
                                {props.associateModel.Role && props.associateModel.Role.map((role: Role) => {
                                    return (
                                        <option key={role.id} value={role.id}>{role.name}</option>
                                    );
                                })}
                            </select>
                        </div>
                        <div className="form-group col-md-4 ">
                            <label>Project Name</label>
                            <select className="form-control" value={EmployeeDetails && EmployeeDetails.projectId} onChange={(event) => onProjectChange(event.target.value)}>
                                <option key="0" value="">Select Project</option>
                                {props.associateModel.Project && props.associateModel.Project.map((project: Project) => {
                                    return (
                                        <option key={project.id} value={project.id}>{project.name}</option>
                                    );
                                })}
                            </select>
                        </div>
                        <div className="form-group col-md-4">
                            <label>Team Name</label>
                            <select className="form-control" value={EmployeeDetails && EmployeeDetails.teamId} onChange={(event) => props.updateAssociateDetail({ teamId: event.target.value })}>
                                <option key="0" value="">Select Team</option>
                                {props.associateModel.Team && props.associateModel.Team.map((team: Team) => {
                                    return (
                                        <option key={team.id} value={team.id}>{team.name}</option>
                                    );
                                })}
                            </select>
                        </div>
                        <div className="form-group col-md-4">
                            <label>Skill Set</label>
                            <input type="text-area" className="form-control" defaultValue={EmployeeDetails && EmployeeDetails.skillSet} onChange={(event) => props.updateAssociateDetail({ skillSet: event.target.value })} id="SkillSet" />
                        </div>
                        <div className="form-group col-md-4">
                            <label>Experience of the Associate </label>
                            <input type="number" className="form-control" defaultValue={`${EmployeeDetails && EmployeeDetails.experienceOfAssociate ? EmployeeDetails.experienceOfAssociate : ''}`} onChange={(event) => onNumberChangeExperience(event.target.value)} id="ExperienceOfAssociate" />
                        </div>
                        <div className="form-group col-md-3">
                            <label>City</label>
                            <input type="text" className="form-control" defaultValue={EmployeeDetails && EmployeeDetails.city} onChange={(event) => props.updateAssociateDetail({ city: event.target.value })} id="City" />
                        </div>
                        <div className="form-group col-md-1">
                            <label>FSE</label>
                            <label className="container">
                                <input type="checkbox" checked={EmployeeDetails && EmployeeDetails.fse} name="form-control" onChange={(event) => props.updateAssociateDetail({ fse: event.target.checked })} />
                                <span className="checkmark" />
                            </label>
                        </div>
                    </fieldset>
                    <fieldset>
                        <legend>Additional Information</legend>
                        <div className="form-group col-md-4">
                            <label>FNZ User Name</label>
                            <input type="text" className="form-control" defaultValue={EmployeeDetails && EmployeeDetails.fNZUserName} onChange={(event) => props.updateAssociateDetail({ fNZUserName: event.target.value })} id="FNZUserName" />
                        </div>
                        <div className="form-group col-md-4">
                            <label>FNZ Staff ID</label>
                            <input type="text" className="form-control" defaultValue={EmployeeDetails && EmployeeDetails.fNZStaffId} onChange={(event) => props.updateAssociateDetail({ fNZStaffId: event.target.value })} id="FNZStaffId" />
                        </div>
                        <div className="form-group col-md-4">
                            <label>FNZ Role</label>
                            <select className="form-control" value={EmployeeDetails && EmployeeDetails.fNZRoleId ? EmployeeDetails.fNZRoleId : ''} onChange={(event) => props.updateAssociateDetail({ fNZRoleId: event.target.value })}>
                                <option key="0" value="Select Project">Select FNZ Role</option>
                                {props.associateModel.AccountRole && props.associateModel.AccountRole.map((accountRole: AccountRole) => {
                                    return (
                                        <option key={accountRole.id} value={accountRole.id}>{accountRole.name}</option>
                                    );
                                })}
                            </select>
                        </div>
                        <div className="form-group col-md-4">
                            <label>FNZ Email</label>
                            <input type="text" className="form-control" defaultValue={EmployeeDetails && EmployeeDetails.fNZEmail} onChange={(event) => props.updateAssociateDetail({ fNZEmail: event.target.value })} id="FNZEmail" />
                        </div>
                        <div className="form-group col-md-4">
                            <label>Asset No</label>
                            <input type="text" className="form-control" defaultValue={EmployeeDetails && EmployeeDetails.assetNo} onChange={(event) => props.updateAssociateDetail({ assetNo: event.target.value })} id="AssetNo" />
                        </div>
                        <div className="form-group col-md-4">
                            <label>Virtual Machine No</label>
                            <input type="text" className="form-control" defaultValue={EmployeeDetails && EmployeeDetails.virtualMachineNo} onChange={(event) => props.updateAssociateDetail({ virtualMachineNo: event.target.value })} id="VirtualMachineNo" />
                        </div>
                        <div className="form-group col-md-4">
                            <label>Portfolio</label>
                            <select className="form-control" value={(() => { switch (EmployeeDetails && EmployeeDetails.portfolio) { case 'Yes': return 'Yes'; case 'No': return 'No'; default: return 'Select Portfolio'; } })()} onChange={(event) => props.updateAssociateDetail({ portfolio: event.target.value })} id="Portfolio">
                                <option>Select Portfolio</option>
                                <option>Yes</option>
                                <option>No</option>
                            </select>
                        </div>
                        <div className="form-group col-md-4">
                            <label>FNZ Experience(months)</label>
                            <input type="number" className="form-control" defaultValue={`${EmployeeDetails && EmployeeDetails.fNZExperience ? EmployeeDetails.fNZExperience : ''}`} onChange={(event) => onNumberChange(event.target.value)} id="FNZExperience" />
                        </div>
                        <div className="form-group col-md-4">
                            <label>Billability</label>
                            <select className="form-control" value={(() => { switch (EmployeeDetails && EmployeeDetails.billable) { case 'Non-Billable': return 'Non-Billable'; case 'Billable': return 'Billable'; default: return 'Select Billability'; } })()} onChange={(event) => props.updateAssociateDetail({ billable: event.target.value })} id="Billable">
                                <option>Select Billability</option>
                                <option>Non-Billable</option>
                                <option>Billable</option>
                            </select>
                        </div>
                        <div className="form-group col-md-4">
                            <label>Location</label>
                            <select className="form-control" value={(() => { switch (EmployeeDetails && EmployeeDetails.location) { case 'Offshore': return 'Offshore'; case 'Onshore': return 'Onshore'; default: return 'Select Location'; } })()} onChange={(event) => props.updateAssociateDetail({ location: event.target.value })} id="Location">
                                <option>Select Location</option>
                                <option>Offshore</option>
                                <option>Onshore</option>
                            </select>
                        </div>
                        <div className="form-group col-md-4">
                            <label>Contact Number</label>
                            <input type="number" className="form-control" defaultValue={EmployeeDetails && EmployeeDetails.contactNo} onChange={(event) => props.updateAssociateDetail({ contactNo: event.target.value })} id="ContactNo" />
                        </div>
                        <div className="form-group col-md-4">
                            <label>FNZ Date of Joining</label>
                            <DatePicker
                                value={EmployeeDetails && EmployeeDetails.fNZDateofJoining}
                                onChange={(date: Date) => props.updateAssociateDetail({ fNZDateofJoining: date })}
                            />
                        </div>
                        <div className="form-group col-md-4">
                            <label>FNZ Date of Leaving</label>
                            <DatePicker
                                value={EmployeeDetails && EmployeeDetails.fNZDateofLeaving}
                                onChange={(date: Date) => props.updateAssociateDetail({ fNZDateofLeaving: date })}
                            />
                        </div>
                    </fieldset>
                    <div className="form-group  col-md-6 col-md-offset-5">
                        <button name="add" type="button" onClick={() => props.saveAssociate()} value="add" className="btn btn-primary"> {EmployeeDetails && EmployeeDetails.associateId ? 'Update' : 'Add'}</button>&nbsp;
                            <button name="back" type="button" onClick={() => props.updateAssociateModel({ IsAddEdit: false })} value="add" className="btn btn-danger">Back</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AssociateAddComponent;