import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-admin-layout',
    templateUrl: './admin-layout.component.html',
    styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {

    constructor(
        private router: Router,
        public AuthService: AuthService
        ) { }

    ngOnInit(): void {
    }

    logout(e: Event) {
        e.preventDefault();
        this.AuthService.logout();
        this.router.navigate(['/admin', 'login']);
    }

}
