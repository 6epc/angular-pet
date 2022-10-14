import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap, Observable } from 'rxjs';

import { PostsService } from '../shared/posts.service';
import { Post } from '../shared/interfaces';

@Component({
    selector: 'app-post-page',
    templateUrl: './post-page.component.html',
    styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {

    post$!: Observable<Post>

    constructor(
        private activatedRoute: ActivatedRoute,
        private prostsService: PostsService
    ) { }

    ngOnInit(): void {
        this.post$ = this.activatedRoute.params.pipe(
            switchMap((params: Params) => {
                return this.prostsService.getById(params['id']);
            })
        )

    }

}
