import { asapScheduler } from "rxjs";

export class Pageable {
    page: number = 0;
    size: number = 10;
    sort: string;
    direction: string = 'asc';
}
