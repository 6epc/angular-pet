import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { User } from 'src/app/shared/interfaces';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
    form!: FormGroup

    constructor() { }

    ngOnInit(): void {
        this.form = new FormGroup({
            email: new FormControl('12@mail', [Validators.required, Validators.email]),
            password: new FormControl('111', [Validators.required, Validators.minLength(3)])
        })
    }

    get email() { return this.form.get('email')!; }
    get password() { return this.form.get('password')!; }

    submit() {
        if (this.form.invalid) {
            return
        }

        const user: User = {
            email: this.email.value,
            password: this.password.value
         };
        this.form.reset();
    }

}
