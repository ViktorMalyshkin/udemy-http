import { Injectable } from '@angular/core';
import { Post } from '../../../http-05-handling-errors/src/app/post.model'
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) {
  }

  createAndStorePost(title: string, content: string) {
    const postData: Post = { title, content };
    this.http.post<{ name: string }>('https://udemy-cource-project-default-rtdb.europe-west1.firebasedatabase.app/posts.json', postData)
      .subscribe((responseData) => {
        console.log(responseData)
      })
  }

  fetchPosts() {
    return this.http.get<{ [key: string]: Post }>('https://udemy-cource-project-default-rtdb.europe-west1.firebasedatabase.app/posts.json')
      .pipe(
        map(responseData => {
          const postsArray: Post[] = []
          for (const key in responseData) {
            postsArray.push({...responseData[key], id: key})
          }
          return postsArray
        }),
      )
  }

  deletePosts() {
    return this.http.delete(
      'https://udemy-cource-project-default-rtdb.europe-west1.firebasedatabase.app/posts.json'
    );
  }
}