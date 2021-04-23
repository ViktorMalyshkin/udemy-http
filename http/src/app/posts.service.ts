import { Injectable } from '@angular/core'
import { Post } from '../../../http-05-handling-errors/src/app/post.model'
import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from '@angular/common/http'
import { catchError, map, tap } from 'rxjs/operators'
import { Subject, throwError } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  error = new Subject<string>()

  constructor(private http: HttpClient) {
  }

  createAndStorePost(title: string, content: string) {
    const postData: Post = {title, content}
    this.http.post<{ name: string }>(
      'https://udemy-cource-project-default-rtdb.europe-west1.firebasedatabase.app/posts.json', postData, {
        // observe: 'body'
        observe: 'response',
      },
    )
      .subscribe((responseData) => {
        console.log(responseData)
      }, error => {
        this.error.next(error.message)
      })
  }

  fetchPosts() {
    let searchParams = new HttpParams()
    searchParams = searchParams.append('print', 'pretty')
    searchParams = searchParams.append('custom', 'key')
    return this.http.get<{ [key: string]: Post }>('https://udemy-cource-project-default-rtdb.europe-west1.firebasedatabase.app/posts.json',
      {headers: new HttpHeaders({'Custom-Header': 'Hello'}), params: searchParams})
      .pipe(
        map(responseData => {
          const postsArray: Post[] = []
          for (const key in responseData) {
            postsArray.push({...responseData[key], id: key})
          }
          return postsArray
        }),
        catchError(errorRes => {
          // Send to analytics server
          return throwError(errorRes)
        }))
  }

  deletePosts() {
    return this.http.delete(
      'https://udemy-cource-project-default-rtdb.europe-west1.firebasedatabase.app/posts.json',
      {
        observe: 'events',
      },
    ).pipe(
      tap((event: any) => {
        console.log(event)
        if(event.type === HttpEventType.Sent){
          // console.log(event.type)
          // ...
        }
        if(event.type === HttpEventType.Response) {
          console.log(event.body)
        }
      })
    )
  }
}
