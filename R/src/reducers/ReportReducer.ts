import { AP_ONLOGOUT } from '../actions/AppActions';
import { UPDATE_PROJECT_BATCH } from '../actions/ReportActions';
import { IProjectState } from '../models/ProjectBatch';

const initialState: IProjectState = {
    projectBatchModel: {
        project: [],
        batch: [],
        projectGroupPlan: [],
        associate: [],
        knowledgeTransfer: [],
        mode: [],
        role: [],
        associateProjectGroup: [],
        associatePlan: [],
        showDialog: false,
        showAddPlan: false,
        showAddBatch: false,
        showStatus: false,
        selectedProject: undefined,
        selectedBatch: undefined,
        processProjectGroup: undefined,       
        projectPlan: undefined
    }
};

const ReportReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case UPDATE_PROJECT_BATCH:
            return {
                ...state,
                projectBatchModel: { ...state.projectBatchModel, ...action.payload }
            };
        case AP_ONLOGOUT:
            return {
                ...state,
                projectBatchModel: { ...initialState }
            };
        default:
            return state;
    }
};

export default ReportReducer;