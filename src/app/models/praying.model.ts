export interface PrayingModelold2 {
    Prayingtoday: number;
    Prayingtotal: number;
}

export interface PrayingModelold {
    ID: string;
    pray: string;
    date: string;
    PeopleID: string;
    total: string;
}

export interface PrayingModel{
    today: Pray[];
    total: Pray[];
}

export interface Pray {
    peopleID: string;
    total: string;
}