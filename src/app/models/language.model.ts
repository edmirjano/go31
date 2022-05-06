export interface Acf {
    language_list: LanguageList;
}
export interface LanguageList {
    en: Lang;
    al: Lang;
}
export interface Lang {
    path: string;
    flag: string;
    name: string;
    lable_1: string;
}

export interface LanguageModel {
    acf: Acf;
}