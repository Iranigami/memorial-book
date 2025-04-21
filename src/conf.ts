export interface Person {
    id?: number;
    name?: string;
    yearStartAt?: number;
    yearEndAt?: number;
    medal?: boolean;
    image?: string  | null;
    next?: number;
    monthDeath?: string;
    city?: string;
    calledUponDate?: string;
    howDie?: string;
    placeDeath?: string;
    ranks?: string;
}

export interface Persons extends Array<Person>{}


export interface Filters {
    yearStart?: number;
    yearEnd?: number;
    rank?: string[];
    word?: string[];
}