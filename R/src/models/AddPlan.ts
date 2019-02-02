import { Associate, KnowledgeTransfer, Mode, Role } from '../typings/ApiClient';

export interface IAddPlanProps {
    associate: Associate[];
    knowledgeTransfer: KnowledgeTransfer[];
    mode: Mode[];
    role: Role[];
    loadAddPlan: (addPlan: Boolean) => void;
}
export interface IAddPlanState {
    associate: Associate[];
    knowledgeTransfer: KnowledgeTransfer[];
    mode: Mode[];
    role: Role[];
}