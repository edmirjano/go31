export interface Acf {
    language_list: LanguageList;
    post_version: number;
    version_check: string;
}
export interface LanguageList {
    en: Lang;
    al: Lang;
}
export interface Lang {
    lang_name: string;
    path: string;
    flag: string;
    Population: string;
    PeopNameInCountry: string;
    PrimaryReligion: string;
    PrimaryLanguageName: string;
    PercentChristianPGAC: string;
    PercentEvangelicalPGAC: string;
    pray: string;
    prayingtoday: string;
    notifications: string;
    language: string;
    select_language: string;
    time_zone: string;
    allow_noticications: string;
    change: string;
    all_posts: string;
    index: number;
    resources: string;
    workers_needed: string;
    praying_total: string;
    im_praying: string;
    praying: string;
    pray_today: string;
}

export interface LanguageModel {
    acf: Acf;
}