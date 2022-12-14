import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { FbCreateResponse, Post } from './interfaces';

@Injectable({
    providedIn: 'root'
})
export class PostsService {

    constructor(private http: HttpClient) { }

    create(post: Post): Observable<Post> {
        return this.http.post(`${environment.fbDbUrl}/posts.json`, post)
            .pipe(
                map((response: FbCreateResponse) => {
                    //response is  ID we get from FB like: {"name":"-NE1EyLOYatDgo_8L6Fk"}
                    //so we return full post with ID and date: Date
                    return {
                        ...post,
                        id: response.name,
                        // date: new Date(post.date) //not sure if we actualy need this date...
                    };
                })
            );
    }

    getAll(): Observable<Post[]> {
        return this.http.get<Post[]>(`${environment.fbDbUrl}/posts.json`)
            .pipe(
                map((response: { [key: string]: any }) => {
                    return Object.keys(response).map(key => ({
                        ...response[key],
                        id: key,
                        // date: new Date(response[key].date) //not sure if we actualy need this date...
                    }))
                })
            );
    }

    getById(id: string): Observable<Post> {
        return this.http.get<Post>(`${environment.fbDbUrl}/posts/${id}.json`)
            .pipe(
                map((post: Post) => {
                    return { ...post, id, }
                })
            );
    }

    remove(id: string): Observable<void> {
        return this.http.delete<void>(`${environment.fbDbUrl}/posts/${id}.json`);
    }

    update(post: Post): Observable<Post> {
        return this.http.patch<Post>(`${environment.fbDbUrl}/posts/${post.id}.json`, post);
    }
}
