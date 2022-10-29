import { Pipe, PipeTransform } from '@angular/core';
import { Post } from 'src/app/shared/interfaces';

@Pipe({
    name: 'searchPosts'
})

export class SearchPipe implements PipeTransform {
    transform(posts: Post[], searchStr: string): any[] {

        if (!searchStr.trim()) {
            return posts
        }

        return posts.filter(post => {
            return post.title.toLowerCase().includes(searchStr.toLowerCase());
        })
    }
}
