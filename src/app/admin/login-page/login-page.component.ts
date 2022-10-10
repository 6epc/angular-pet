import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { User } from 'src/app/shared/interfaces';

import { AuthService } from '../shared/services/auth.service';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
    form!: FormGroup;
    submitted = false;
    alertMsg!: string;

    constructor(
        public authService: AuthService,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.activatedRoute.queryParams.subscribe(params => {
            if (params['loginAgaine']) {
                this.alertMsg = 'Пожайлуйста, введите данные для авторизации в админ панель'
            }
        })

        this.form = new FormGroup({
            email: new FormControl('par@mail.ru', [Validators.required, Validators.email]),
            password: new FormControl('111111', [Validators.required, Validators.minLength(3)])
        })
    }

    get email() { return this.form.get('email')!; }
    get password() { return this.form.get('password')!; }

    submit() {
        if (this.form.invalid) {
            return
        }

        this.submitted = true;

        const user: User = {
            email: this.email.value,
            password: this.password.value
        };

        this.authService.login(user).subscribe({
                next: (v) => {
                    this.form.reset();
                    this.router.navigate(['/admin', 'dashboard']);
                    this.submitted = false;
                },
                error: () => this.submitted = false
        })

    }

}
