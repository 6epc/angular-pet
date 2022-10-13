import { PostsService } from './../../shared/posts.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Post } from 'src/app/shared/interfaces';

@Component({
    selector: 'app-create-page',
    templateUrl: './create-page.component.html',
    styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit {

    form!: FormGroup;

    constructor(private postsService: PostsService) { }

    ngOnInit(): void {

        this.form = new FormGroup({
            title: new FormControl('', [Validators.required]),
            author: new FormControl('', [Validators.required]),
            text: new FormControl('', [Validators.required]),
        })
    }

    get title() { return this.form.get('title')!; }
    get author() { return this.form.get('author')!; }
    get text() { return this.form.get('author')!; }

    submit() {
        if (this.form.invalid) {
            return
        }

        const post: Post = {
            ...this.form.value,
            date: new Date()
        }

        this.postsService.create(post).subscribe(() => {
            //response is object {id?: string; title: string; text: string; author: string; date: Date;}
            this.form.reset();
        });
    }
}
