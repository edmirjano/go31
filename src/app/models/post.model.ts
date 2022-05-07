export interface Sizes {
    thumbnail: string;
    medium: string;
    medium_large: string;
    large: string;
    "1536x1536": string;
    "2048x2048": string;
    mailpoet_newsletter_max: string;
}

export interface Image {
    ID: number;
    id: number;
    title: string;
    filename: string;
    filesize: number;
    url: string;
    link: string;
    alt: string;
    author: string;
    description: string;
    caption: string;
    name: string;
    status: string;
    uploaded_to: number;
    date: string;
    modified: string;
    menu_order: number;
    mime_type: string;
    type: string;
    subtype: string;
    icon: string;
    width: number;
    height: number;
    sizes: Sizes;
}

export interface Acf {
    id: string;
    country: string;
    post_number: string;
    image_2: Image;
    image_3: Image;
    information: string;
    map: string; //link
    news: string;
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

