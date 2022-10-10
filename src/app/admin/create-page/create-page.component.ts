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

    constructor() { }

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
            title: this.form.value.title,
            text: this.form.value.text,
            author: this.form.value.author,
            date: new Date()
        }
    }
}
