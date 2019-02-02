import * as React from 'react';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import { bindActionCreators } from 'redux';
import { addAssociateDetail, buildAssociateSearchParam, deleteAssociate, loadAddAssociate, loadAssociate, loadTeam, updateAssociateModel } from '../actions/ConfigurationActions';
import AssociateComponent from '../components/ConfigurationComponent';
import { MessageConstants } from '../constants/MessageConstants';
import { RegexPatterns } from '../constants/RegexPatterns';
import { AssociateModel, EmployeeDetail, IAssociateProps } from '../models/Associate';
import { AssociateDetails } from '../typings/ApiClient';

class ConfigurationContainer extends React.Component<IAssociateProps, {}> {
    public componentWillMount() {
        this.props.loadAssociate(this.props.associateModel.PageRequest);
    }

    private OnSearch = (searchText: string) => {
        const model = { ...this.props.associateModel };
        if (model.PageRequest) {
            model.PageRequest.searchParams = buildAssociateSearchParam(searchText, model.PageRequest.searchParams);
            model.PageRequest.pageNumber = 1;
            this.props.updateAssociateModel(model);
            this.props.loadAssociate(this.props.associateModel.PageRequest);
        }
    };

    private OnPageChange = (pageNumber: number) => {
        const model = { ...this.props.associateModel };
        if (model.PageRequest) {
            model.PageRequest.pageNumber = pageNumber;
            this.props.updateAssociateModel(model);
            this.props.loadAssociate(this.props.associateModel.PageRequest);
        }
    };

    private saveAssociateDetail() {
        const associateDetail = { ...this.props.associateModel.EmployeeDetails } as AssociateDetails;

        if (!associateDetail.cognizantId) {
            toastr.error(MessageConstants.ASSOCIATE_TITLE_MESSAGE, MessageConstants.ASSOCIATE_ID_REQUIRED_MESSAGE);
            return;
        }
        if (!associateDetail.associateName) {
            toastr.error(MessageConstants.ASSOCIATE_TITLE_MESSAGE, MessageConstants.ASSOCIATE_NAME_REQUIRED_MESSAGE);
            return;
        }
        if (!associateDetail.cognizantEmailId) {
            toastr.error(MessageConstants.ASSOCIATE_TITLE_MESSAGE, MessageConstants.ASSOCIATE_EMAIL_REQUIRED_MESSAGE);
            return;
        }
        if (!associateDetail.cognizantRoleId) {
            toastr.error(MessageConstants.ASSOCIATE_TITLE_MESSAGE, MessageConstants.ASSOCIATE_ROLE_REQUIRED_MESSAGE);
            return;
        }
        if (!associateDetail.projectId) {
            toastr.error(MessageConstants.ASSOCIATE_TITLE_MESSAGE, MessageConstants.ASSOCIATE_PROJECT_REQUIRED_MESSAGE);
            return;
        }
        if (associateDetail.cognizantEmailId && !associateDetail.cognizantEmailId.match(RegexPatterns.EMAIL_VALIDATION)) {
            toastr.error(MessageConstants.ASSOCIATE_TITLE_MESSAGE, MessageConstants.ASSOCIATE_EMAIL_ERROR);
            return;
        }
        if (associateDetail.fNZEmail && !associateDetail.fNZEmail.match(RegexPatterns.EMAIL_VALIDATION)) {
            toastr.error(MessageConstants.ASSOCIATE_TITLE_MESSAGE, MessageConstants.ASSOCIATE_EMAIL_ERROR);
            return;
        }

        this.props.addAssociateDetail(associateDetail);
    }

    private onAddEditAssociateDetail = (employeeDetail?: EmployeeDetail) => {
        this.updateAssociateDetail(employeeDetail);
        this.props.loadAddAssociate();
    }

    private updateAssociateDetail(employeeDetail?: EmployeeDetail) {
        const associateDetail = { ...this.props.associateModel.EmployeeDetails, ...employeeDetail };
        this.props.updateAssociateModel({ EmployeeDetails: associateDetail });
    }

    private deleteAssociate() {
        if (this.props.associateModel && this.props.associateModel.DeletingAssociateId) {
            this.props.updateAssociateModel({ DeletingAssociateId: undefined });
            this.props.deleteAssociate(this.props.associateModel.DeletingAssociateId);
        }
    }

    public render() {
        return (
            <AssociateComponent
                OnPageChange={(pageNumber: number) => this.OnPageChange(pageNumber)}
                OnSearch={(searchText: string) => this.OnSearch(searchText)}
                associateModel={this.props.associateModel}
                updateAssociateModel={(associateModel?: AssociateModel) => this.props.updateAssociateModel(associateModel)}
                addEditAssociateDetail={this.onAddEditAssociateDetail}
                updateAssociateDetail={(employeeDetail: EmployeeDetail) => this.updateAssociateDetail(employeeDetail)}
                deleteAssociate={() => this.deleteAssociate()}
                loadTeam={(projectId: string) => this.props.loadTeam(projectId)}
                saveAssociate={() => this.saveAssociateDetail()}
            />
        );
    }
}
const mapStateToProps = (state: any) => {
    return {
        associateModel: state.associate.associateModel
    };
};

const mapDispatchToProps = (dispatch: any) =>
    bindActionCreators(
        {
            loadAssociate,
            loadAddAssociate,
            loadTeam,
            addAssociateDetail,
            deleteAssociate,
            updateAssociateModel
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ConfigurationContainer);