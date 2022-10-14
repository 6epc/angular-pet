import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AdminRoutingModule } from "./admin-routing.module";
import { SharedModule } from "../shared/shared.module";

import { AdminLayoutComponent } from './shared/components/admin-layout/admin-layout.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { CreatePageComponent } from './create-page/create-page.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { AlertComponent } from './shared/components/alert/alert.component';

import { AuthGuard } from "./shared/services/auth.guard";
import { SearchPipe } from "./shared/search.pipe";
import { AlertService } from "./shared/services/alert.service";

@NgModule({
    imports: [
        CommonModule,
        AdminRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule
    ],
    exports: [],
    declarations: [
        AdminLayoutComponent,
        LoginPageComponent,
        DashboardPageComponent,
        CreatePageComponent,
        EditPageComponent,
        SearchPipe,
        AlertComponent
    ],
    providers: [AuthGuard, AlertService]
})
export class AdminModule { }
