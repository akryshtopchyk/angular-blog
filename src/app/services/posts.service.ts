import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Post, RbCreateRes} from '../Interfaces/interfaces';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class PostsService {

  constructor(private http: HttpClient) {
  }

  create(post: Post): Observable<Post> {
    return this.http.post(`${environment.fbDbUrk}posts.json`, post)
      .pipe(
        map((res: RbCreateRes) => {
          return {
            ...post,
            id: res.name,
            date: new Date(post.date)
          };
        })
      );
  }

  getAll(): Observable<Post[]> {
    return this.http.get<Post[]>(`${environment.fbDbUrk}posts.json`)
      .pipe(map((res: {[key: string]: any}) => {
        return Object
          .keys(res)
          .map(key => ({
            ...res[key],
            id: key,
            date: new Date(res[key].date)
          }));
      }));
  }

  getById(id: string): Observable<Post> {
    return this.http.get<Post>(`${environment.fbDbUrk}posts/${id}.json`)
      .pipe(
        map((post: Post) => {
          return {
            ...post,
            id,
            date: new Date(post.date)
          };
        })
      );
  }

  remove(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.fbDbUrk}posts/${id}.json`);
  }

  update(post: Post): Observable<Post>{
    return this.http.patch<Post>(`${environment.fbDbUrk}posts/${post.id}.json`, post);
  }
}
