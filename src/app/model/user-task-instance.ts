export class UserTaskInstance {
    id: string;
    adminGroups: string[];
    adminUsers: string[];
    endpoint: string;
    excludedUsers: string[];
    inputs: Object;
    lastUpdate: string;
    name: string;
    outputs: any;
    potentialGroups: string[];
    potentialUsers: string[];
    processId: string;
    processInstanceId: string;
    referenceName: string;
    started: string;
    state: string;
}
