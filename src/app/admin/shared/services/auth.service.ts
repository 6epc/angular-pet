import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { User } from 'src/app/shared/interfaces';
import { catchError, Observable, Subject, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {

    public error$: Subject<string> = new Subject<string>();

    constructor(private http: HttpClient) { }

    get token(): string | null {
        const date = localStorage.getItem('fb-token-expires');
        const expiresInDate = date !== null ? new Date(date) : '';

        if (new Date() > expiresInDate) {
            this.logout();
            return null;
        }
        return localStorage.getItem('fb-token');
    }

    login(user: User): Observable<any> {
        user.returnSecureToken = true; //needs alwayes to be true for FireBase
        return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
            .pipe(
                tap(this.setToken),
                catchError(this.handleError.bind(this))
            );
    }

    logout() {
        this.setToken(null);
    }

    isAuthenticated(): boolean {
        return !!this.token;
    }

    private handleError(error: HttpErrorResponse): any {
        const { message } = error.error.error

        switch (message) {
            case 'INVALID_EMAIL':
                this.error$.next('Неверный email')
                break;
            case 'INVALID_PASSWORD':
                this.error$.next('Неверный пароль')
                break;
            case 'EMAIL_NOT_FOUND':
                this.error$.next('Такого email нет')
                break;
        }

        return throwError(() => error);
    }

    private setToken(response: any) {
        if (response) {
            const expiresInDate = new Date(new Date().getTime() + +response.expiresIn * 1000);
            localStorage.setItem('fb-token', response.idToken);
            localStorage.setItem('fb-token-expires', expiresInDate.toString());
        } else {
            localStorage.clear();
        }
    }

}
