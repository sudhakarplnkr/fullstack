import * as React from 'react';
import 'react-fa';
import { IProjectBatchModel } from '../models/ProjectBatch';
import { AssociatePlan } from '../typings/ApiClient';
import DownloadClient from '../utils/DownloadService';
import ModalDialogComponent from './Shared/ModalDialogComponent';

type Props = {
    loadAssociateStatus: (groupPlan: Boolean, groupPlanId: string) => void;
    projectBatchModel: IProjectBatchModel;
    downloadPlan: (file?: string, fileName?: string) => void;
};
const AssociateStatusComponent = (props: Props) => {
    return (
        <ModalDialogComponent
            showDialog={!!props.projectBatchModel.showStatus}
            title={'Associate Status'}
            cancelLabel={'Close'}
            Ok={() => this.props.saveBatch()}
            Cancel={() => props.loadAssociateStatus(false, ' ')}
            hideOk={true}
            element={
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Associate</th>
                            <th>Completed Date</th>
                            <th className="text-center">Proof</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.projectBatchModel.associatePlan && props.projectBatchModel.associatePlan.map((associatePlan: AssociatePlan, index) => {
                            return (
                                <tr key={index}>
                                    <td>{associatePlan.associateName}</td>
                                    <td>{associatePlan.completionDate && associatePlan.completionDate.toDateString()}</td>
                                    <td className="text-center">{associatePlan.proof && <i onClick={() => DownloadClient.downloadFile(associatePlan.proof, associatePlan.id)} className="fa fa-download" />}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            }
        />
    );
};
export default AssociateStatusComponent;