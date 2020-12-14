import { HttpParams } from "@angular/common/http";
import { asapScheduler } from "rxjs";

export class Pageable {
    page: number = 0;
    size: number = 10;
    sort: string;
    direction: string = 'asc';
    isPaged: boolean = true;

    public getHttpParams<HttpParams>(){
        let params = new HttpParams();
        params.append('page',this.page.toString());
        params.append('size',this.size.toString());
        params.append('sort',this.sort + ',' + this.direction);
        params.append('isPaged',String(this.isPaged));
        return params;
    }
}
