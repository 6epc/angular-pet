import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { FbCreatResponse, Post } from './interfaces';

@Injectable({
    providedIn: 'root'
})
export class PostsService {

    constructor(private http: HttpClient) { }

    creat(post: Post): Observable<any> {
        return this.http.post(`${environment.fbDbUrl}/posts.json`, post)
            .pipe(
                map((response: FbCreatResponse) => {
                    //response is a ID we get from FB: {"name":"-NE1EyLOYatDgo_8L6Fk"}
                    //so we return full post with ID and date: Date
                    return {
                        ...post,
                        id: response.name,
                        // date: new Date(post.date) not sure if we actualy need this date...
                    };
                })
            );
    }
}
