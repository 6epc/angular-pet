import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Post } from 'src/app/shared/interfaces';
import { AlertService } from '../shared/services/alert.service';
import { PostsService } from './../../shared/posts.service';

@Component({
    selector: 'app-dashboard-page',
    templateUrl: './dashboard-page.component.html',
    styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {
    posts: Post[] = [];
    pSub!: Subscription;
    deleteSub!: Subscription;
    searchStr = '';

    constructor(
        private postsService: PostsService,
        private alertService: AlertService
    ) { }

    ngOnInit(): void {
        this.pSub = this.postsService.getAll().subscribe(posts => {
            this.posts = posts;
        });
    }

    remove(id: string) {
        this.deleteSub = this.postsService.remove(id).subscribe(response => {
            this.posts = this.posts.filter(post => post.id !== id);
            this.alertService.danger('Пост был удален');
        });
    }

    ngOnDestroy(): void {
        if (this.pSub) {
            this.pSub.unsubscribe();
        }
        if (this.deleteSub) {
            this.deleteSub.unsubscribe();
        }
    }

}
