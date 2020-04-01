import { Injectable } from '@angular/core';
import { timeout, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient , HttpErrorResponse } from '@angular/common/Http';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class Covid19Service {

    maxRetries = 1;

    constructor(private http: HttpClient) { }

    public getAllCountries(): Observable<any[]> {
        const urlAllCountries =  environment.hostCountries + '/countries';
        return this.http.get<any[]>(urlAllCountries)
            .pipe(
                timeout(5000),
                catchError(this.errorHandler)
            );
    }

    public getCountrie(countrieName:String): Observable<any> {
        const urlCountrie = environment.hostCountries + '/countries/' + countrieName;
        return this.http.get<any>(urlCountrie)
            .pipe(
                timeout(5000),
                catchError(this.errorHandler)
            );
    }

    public getHistory(countrieName:String): Observable<any> {
        const urlCountrie = environment.hostHistory + '/historical/' + countrieName;
        return this.http.get<any>(urlCountrie)
            .pipe(
                timeout(5000),
                catchError(this.errorHandler)
            );
    }

    private errorHandler(error: HttpErrorResponse) {
        return Observable.throw({ 'message': error.message || "Server Error" });
    }
}
