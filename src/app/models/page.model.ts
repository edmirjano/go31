export interface Acf {
    show_to_menu: boolean;
}
export interface PageModel {
    id: number;
    date: Date;
    date_gmt: Date;
    guid: Guid;
    modified: Date;
    modified_gmt: Date;
    slug: string;
    status: string;
    type: string;
    link: string;
    title: Title;
    content: Content;
    excerpt: Excerpt;
    author: number;
    featured_media: number;
    parent: number;
    menu_order: number;
    comment_status: string;
    ping_status: string;
    template: string;
    meta: any[];
    acf: Acf;
}


export interface Guid {
    rendered: string;
}

export interface Title {
    rendered: string;
}

export interface Content {
    rendered: string;
    protected: boolean;
}

export interface Excerpt {
    rendered: string;
    protected: boolean;
}

export interface Acf {
    show_to_menu: boolean;
}

export interface Self {
    href: string;
}

export interface Collection {
    href: string;
}

export interface About {
    href: string;
}

export interface Author {
    embeddable: boolean;
    href: string;
}

export interface Reply {
    embeddable: boolean;
    href: string;
}

export interface VersionHistory {
    count: number;
    href: string;
}

export interface PredecessorVersion {
    id: number;
    href: string;
}

export interface WpAttachment {
    href: string;
}

export interface Cury {
    name: string;
    href: string;
    templated: boolean;
}

export interface Links {
    self: Self[];
    collection: Collection[];
    about: About[];
    author: Author[];
    replies: Reply[];
}
