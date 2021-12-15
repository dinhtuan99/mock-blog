import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';

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
        return this.httpClient.get<ITag>(url).pipe(
            catchError(this.handleError)
        )
    }

    private handleError(error: HttpErrorResponse) {
        Swal.fire({
            icon: 'error',
            title:  'Oops, something went wrong. Please try again later',
            confirmButtonText: 'OK',
            confirmButtonColor: '#fa6342',
            
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              return true 
            } else {
              return false
            }
          })
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
