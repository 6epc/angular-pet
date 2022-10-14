import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError, tap } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from './../admin/shared/services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        //If user logged in - add token to requst
        if (this.authService.isAuthenticated()) {
            req = req.clone({
                setParams: {
                    auth: this.authService.token! //FB accepts param 'auth'
                }
            })
        }

        return next.handle(req).pipe(
            catchError(this.handleError)
        );
    }

    private handleError(error: HttpErrorResponse) {
        console.log('[Intercept error: ]', error);
        if (error.status === 401) {
            this.authService.logout();
            this.router.navigate(
                ['/admin', 'login'],
                {
                    queryParams: {
                        authFailed: true
                    }
                }
            );
        }
        // return throwError(error) depricated
        return throwError(() => error);
    }
}
