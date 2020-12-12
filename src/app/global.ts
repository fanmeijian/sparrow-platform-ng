export const GlobalVariable = Object.freeze({
    BASE_API_URL: 'http://localhost:8091/sparrow-platform',
    OAUTH_URL: 'http://localhost:6060',
    KOGITO_GQL_URL: 'http://localhost:8180',
    SPARROW_BPM_URL: 'http://localhost:8091/sparrow-bpm'
    //... more of your variables
});


export const HumanTaskAction = Object.freeze({
    START: 'start',
    STOP: 'stop',
    RELEASE: 'release',
    SUSPEND: 'suspend',
    RESUME: 'resume',
    SKIP: 'skip',
    DELEGATE: 'delegate',
    COMPLETE: 'complete',
    CLAIM: 'claim'
    //... more of your variables
});

export class SpringPage{
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
}

export class SpringHref{
    href: string;
}

export class SpringLinks{
    first: SpringHref;
    prev: SpringHref;
    self: SpringHref;
    next: SpringHref;
    last: SpringHref;
    profile: SpringHref;
    search: SpringHref;
}

export class SpringEmbeddedList{
    _links: SpringLinks;
    page: SpringPage;
}

export class SwdSysrolesLinks{
    self: SpringLinks;
    swdSysrole: SpringLinks;
    swdMenus: SpringLinks;
    swdAuthorities: SpringLinks;
    swdDataPermissions: SpringLinks;
}

export class SwdSysrolesRep{
    name: string;
    _links: SwdSysrolesLinks;
}




export class SwdMenu {
    id: string;
    name: string;
    parentId: string;
    sort: number;
    url: string;
}

export class ProcessInstance{
    id: string;
    addons: string[];
    endpoint: string;
    lastUpdate: string;
    milestones:[];
    models:KogitoModel[];
    processId: string;
    processName: string;
    start: string;
    state: number;
    variables: any[];
}

export class KogitoModel{
    id: string;
    definitionId: string;
    enter: string;
    name: string;
    nodeId: number;
    type: string;
}
