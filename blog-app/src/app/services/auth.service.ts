import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { IUser, IUserUpdate } from '../models/user.model';
import { UserService } from './user.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    BASE_URL = "https://conduit.productionready.io/api/";

    httpOptions = {
        headers: new HttpHeaders({
            "Content-Type": "application/json; charset=utf-8",
        })
    }

    constructor(private httpClient: HttpClient, private userService : UserService) {
    }

    logIn(email: string, password: string): Observable<IUser> {
        const url = `${this.BASE_URL}users/login`;
        const body = {
            user: {
                email: email,
                password: password
            }
        }
        return this.httpClient.post<IUser>(url, body, this.httpOptions).pipe(
            catchError(this.handleError),
            tap((user) => {
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.userService.setCurrentUser(user);
            })
        )
    }

    register(username: string, email: string, password: string) {
        const url = `${this.BASE_URL}users`;
        const body = {
            user: {
                username: username,
                email: email,
                password: password
            }
        }
        return this.httpClient.post<IUser>(url, body, this.httpOptions).pipe(
            catchError(this.handleError),
            tap((user) => {
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.userService.setCurrentUser(user);
            })
        )
    }

    //   logOut() {
    //     const url = `${this.BASE_URL}api/auth/logout`;

    //     let httpOptions = {
    //       headers: new HttpHeaders({
    //         "Content-Type": "application/json; charset=utf-8",
    //         "Authorization": `Bearer ${this.currentUserValue().token}`
    //       })
    //     }

    //     return this.httpClient.post(url, {}, httpOptions).pipe(
    //       catchError(this.handleError),
    //       tap((isLogout) => {
    //         if(isLogout) {
    //           this.router.navigate(['login'])
    //           localStorage.removeItem('currentUser');
    //           this.currentUserSubject.next(null as unknown as IUser);
    //         }
    //       })
    //     )
    //   }

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
