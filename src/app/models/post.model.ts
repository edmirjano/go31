export interface Acf {
    id: string;
    image_2: number;
    image_3: number;
    information: string;
    ministry_obstacles: string;
    outreach_oportunities: string;
    pray_for_the_followers_of_christ: string;
    pray_for_the_entire_of_group: string;
    scripture_focus: string;
    si_also: string;
    the_full_profile: string;
}
export interface Title {
    rendered: string;
}
export interface Guid {
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
export interface PostModel {
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
    comment_status: string;
    ping_status: string;
    sticky: boolean;
    template: string;
    format: string;
    meta: any[];
    categories: number[];
    tags: any[];
    acf: Acf;
}

