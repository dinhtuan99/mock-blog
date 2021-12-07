import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ITag } from '../models/tag.model';
import { UserService } from './user.service';

@Injectable({
    providedIn: 'root'
})
export class TagService {
    BASE_URL = "https://conduit.productionready.io/api/";

    constructor(private httpClient: HttpClient, private userService: UserService) {
    }

    getTags(): Observable<ITag> {
        const url = `${this.BASE_URL}tags`;
        const httpOptions = {
            headers: new HttpHeaders({
                "Content-Type": "application/json; charset=utf-8"
            })
        }
        return this.httpClient.get<ITag>(url, httpOptions).pipe(
            catchError(this.handleError)
        )
    }

    private handleError(error: HttpErrorResponse) {
        if (error.status === 0) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong.
            console.error(
                `Backend returned code ${error.status}, body was: `, error.error);
        }
        // Return an observable with a user-facing error message.
        return throwError(
            'Something bad happened; please try again later.');
    }

}
