import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { switchMap, Subscription } from 'rxjs';

import { Post } from 'src/app/shared/interfaces';

import { PostsService } from './../../shared/posts.service';
import { AlertService } from '../shared/services/alert.service';

@Component({
    selector: 'app-edit-page',
    templateUrl: './edit-page.component.html',
    styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit, OnDestroy {

    form!: FormGroup;
    post!: Post;
    submitted = false;
    updateSub!: Subscription;

    constructor(
        private activatedRoute: ActivatedRoute,
        private postsService: PostsService,
        private alertService: AlertService
    ) { }


    ngOnInit(): void {
        this.activatedRoute.params.pipe(
            switchMap((params: Params) => {
                return this.postsService.getById(params['id']);
            })
        ).subscribe((post: Post) => {
            this.post = post;
            this.formInit(post);
        });
    }

    private formInit(post: Post) {
        this.form = new FormGroup({
            title: new FormControl(post.title, Validators.required),
            text: new FormControl(post.text, Validators.required)
        })
    }

    get title() { return this.form.get('title')!; }

    submit() {
        if (this.form.invalid) {
            return
        }

        this.submitted = true;

        this.updateSub = this.postsService.update({
            ...this.post,
            title: this.form.value.title,
            text: this.form.value.text
        }).subscribe(() => {
            console.log('post updated');
            this.submitted = false;
            this.alertService.success('Пост был обновлен');
        })
    }

    ngOnDestroy(): void {
        if (this.updateSub) {
            this.updateSub.unsubscribe();
        }
    }

}
