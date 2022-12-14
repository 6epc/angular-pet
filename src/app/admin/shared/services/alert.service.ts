import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

export type AlertType = 'success' | 'warning' | 'danger';
export interface Alert {
    type: AlertType;
    text: string;
}
@Injectable()
export class AlertService {
    alert$ = new Subject<Alert>();

    success(text: string) {
        this.alert$.next({ type: 'success', text: text });
    }
    warning(text: string) {
        this.alert$.next({ type: 'warning', text: text });
    }
    danger(text: string) {
        this.alert$.next({ type: 'danger', text: text });
    }
}
