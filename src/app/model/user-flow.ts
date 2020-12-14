export class UserFlow {
    id: UserFlowPK = new UserFlowPK();
}

export class UserFlowPK{
    username: string;
    flowId: string;

    public toIdString():string{
        return this.username + ',' + this.flowId;
    }
}
