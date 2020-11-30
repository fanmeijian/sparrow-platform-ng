export const GlobalVariable = Object.freeze({
    BASE_API_URL: 'http://localhost:6060',
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