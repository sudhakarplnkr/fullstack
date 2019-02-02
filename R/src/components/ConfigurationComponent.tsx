import * as React from 'react';
import 'react-fa';
import { AssociateModel, EmployeeDetail } from '../models/Associate';
import { AssociateDetails } from '../typings/ApiClient';
import AssociateAddComponent from './AddAssociateComponent';
import ModalDialogComponent from './Shared/ModalDialogComponent';
import PaginationComponent from './Shared/PaginationComponent';

type Props = {
    associateModel: AssociateModel;
    saveAssociate: () => void;
    updateAssociateDetail: (employeeDetail: EmployeeDetail) => void;
    updateAssociateModel: (associateModel?: AssociateModel) => void;
    addEditAssociateDetail: (employeeDetail?: EmployeeDetail) => void;
    loadTeam: (projectId: string) => void;
    deleteAssociate: () => void;
    OnPageChange(pageNumber: number): void;
    OnSearch(searchText: string): void;
};

const AssociateComponent = (props: Props) => {
    return (
        <React.Fragment>
            <ModalDialogComponent showDialog={props.associateModel && !!props.associateModel.DeletingAssociateId} title={'CONFIRMATION'} Ok={() => props.deleteAssociate()} Cancel={() => props.updateAssociateModel({ DeletingAssociateId: undefined })} element={<p>Are you sure you want to delete this Associate?</p>} />
            <AssociateAddComponent updateAssociateModel={props.updateAssociateModel} associateModel={props.associateModel} updateAssociateDetail={(employeeDetail: EmployeeDetail) => props.updateAssociateDetail(employeeDetail)} loadTeam={(projectId: string) => props.loadTeam(projectId)} saveAssociate={props.saveAssociate} />
            {!props.associateModel.IsAddEdit &&
                <React.Fragment>
                    <div className="col-md-12">
                        <div className="col-md-6 no-left-padding bottom-space">
                            <input className="form-control" type="text" onChange={(event) => props.OnSearch(event.target.value)} placeholder="Search" aria-label="Search" />
                        </div>
                        <button type="button" className="btn btn-link btn pull-right" onClick={() => props.addEditAssociateDetail()}>Add Associate</button>
                    </div>
                    <table className="table table-striped table-bordered table-sm grid-view" cellSpacing="0">
                        <thead>
                            <tr><th className="th-sm">Associate ID</th>
                                <th className="th-sm">Associate Name</th>
                                <th className="th-sm">EmailId</th>
                                <th className="th-sm">Billable</th>
                                <th className="th-sm">Project Name</th>
                                <th className="th-sm">Contact No</th>
                                <th className="th-sm">FSE</th>
                                <th className="th-sm text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.associateModel.Associate && props.associateModel.Associate.result && props.associateModel.Associate.result.map((associate: AssociateDetails, index: number) => {
                                return (
                                    <tr key={index}>
                                        <td>{associate.cognizantId}</td>
                                        <td>{associate.associateName}</td>
                                        <td>{associate.cognizantEmailId}</td>
                                        <td>{(() => {
                                            switch (associate.billable) {
                                                case 'Billable': return 'Yes';
                                                default: return 'No';
                                            }
                                        })()
                                        }</td>
                                        <td>{associate.projectName}</td>
                                        <td>{associate.contactNo}</td>
                                        <td>{(() => {
                                            switch (associate.fse) {
                                                case true: return 'Yes';
                                                default: return 'No';
                                            }
                                        })()
                                        }</td>
                                        <td className="text-center">
                                            <i onClick={() => props.addEditAssociateDetail(associate as EmployeeDetail)} className="fa fa-edit hand-pointer" />&nbsp;&nbsp;
                                        <i onClick={() => props.updateAssociateModel({ DeletingAssociateId: associate.associateId })} className="fa fa-remove hand-pointer" />
                                        </td>
                                    </tr>);
                            })}
                        </tbody>
                    </table>
                    <PaginationComponent PageRequest={props.associateModel.PageRequest} TotalNumberOfRecord={props.associateModel.Associate ? props.associateModel.Associate.totalNumberOfRecords : 0} OnPageChange={(pageNumber: number) => props.OnPageChange(pageNumber)} />
                </React.Fragment>}
        </React.Fragment>
    );
};

export default AssociateComponent;