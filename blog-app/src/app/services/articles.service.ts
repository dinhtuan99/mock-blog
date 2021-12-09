import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { IArticle, IArticleCreate, IArticles, IArticleUpdate } from '../models/articles.model';
import { UserService } from './user.service';

@Injectable({
    providedIn: 'root'
})
export class ArticlesService {
    BASE_URL = "https://conduit.productionready.io/api/";

    constructor(private httpClient: HttpClient) {
    }

    getListArticles(): Observable<IArticles> {
        const url = `${this.BASE_URL}articles`;
        return this.httpClient.get<IArticles>(url).pipe(
            catchError(this.handleError)
        )
    }

    getListArticlesByTag(tagName: string): Observable<IArticles> {
        const url = `${this.BASE_URL}articles?tag=${tagName}`;
        return this.httpClient.get<IArticles>(url).pipe(
            catchError(this.handleError)
        )
    }

    getListArticlesByAuthor(author: string): Observable<IArticles> {
        const url = `${this.BASE_URL}articles?author=${author}`;
        return this.httpClient.get<IArticles>(url).pipe(
            catchError(this.handleError)
        )
    }

    getListArticlesByFavorited(favorited: string): Observable<IArticles> {
        const url = `${this.BASE_URL}articles?favorited=${favorited}`;
        return this.httpClient.get<IArticles>(url).pipe(
            catchError(this.handleError)
        )
    }

    getListArticlesByPage(top: number, skip: number): Observable<IArticles> {
        const url = `${this.BASE_URL}articles?limit=${top}&offset=${skip}`;
        return this.httpClient.get<IArticles>(url).pipe(
            catchError(this.handleError)
        )
    }

    getFeedArticles() {
        const url = `${this.BASE_URL}articles/feed`;
        return this.httpClient.get<IArticles>(url).pipe(
            catchError(this.handleError)
        )
    }

    getFeedArticlesByPage(top: number, skip: number): Observable<IArticles> {
        const url = `${this.BASE_URL}articles/feed?limit=${top}&offset=${skip}`;
        return this.httpClient.get<IArticles>(url).pipe(
            catchError(this.handleError)
        )
    }

    getArticleBySlug(slug: string) {
        const url = `${this.BASE_URL}articles/${slug}`;
        return this.httpClient.get<IArticle>(url).pipe(
            catchError(this.handleError)
        )
    }

    createArticle(articleCreate: IArticleCreate) {
        const url = `${this.BASE_URL}articles`;
        const body: IArticleCreate = articleCreate
        return this.httpClient.post<IArticle>(url, body).pipe(
            catchError(this.handleError)
        )
    }

    //slug se cap nhat neu title thay doi
    updateArticle(articleUpdate: IArticleUpdate, slug: string) {
        const url = `${this.BASE_URL}articles/${slug}`;
        const body: IArticleUpdate = articleUpdate
        return this.httpClient.put<IArticle>(url, body).pipe(
            catchError(this.handleError)
        )
    }

    deleteArticle(slug: string) {
        const url = `${this.BASE_URL}articles/${slug}`;
        return this.httpClient.delete(url).pipe(
            catchError(this.handleError)
        )
    }

    favoriteArticle(slug: string) {
        const url = `${this.BASE_URL}articles/${slug}/favorite`;
        return this.httpClient.post<IArticle>(url, {}).pipe(
            catchError(this.handleError)
        )
    }

    unfavoriteArticle(slug: string) {
        const url = `${this.BASE_URL}articles/${slug}/favorite`;
        return this.httpClient.delete<IArticle>(url).pipe(
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
