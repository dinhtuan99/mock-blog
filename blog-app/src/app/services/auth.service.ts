import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
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

    constructor(private httpClient: HttpClient, private userService: UserService, private router: Router) {
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

    logOut() {
        localStorage.removeItem('currentUser');
        this.userService.setCurrentUser(null as any);
        this.router.navigate(['login']);
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
