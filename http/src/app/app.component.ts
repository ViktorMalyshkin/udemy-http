import { Component, OnInit } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators'
import { Post } from './post.model'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  loadedPosts = []

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.fetchPosts()
  }

  onCreatePost(postData: Post) {
    // Send Http request
    // console.log(postData)
    // this.http.post('https://ng-complete-guide-c56d3.firebaseio.com/posts.json', postData)
    this.http.post<{name: string}>('https://udemy-cource-project-default-rtdb.europe-west1.firebasedatabase.app/posts.json', postData)
      .subscribe((responseData) => {
        console.log(responseData)
      })
  }

  onFetchPosts() {
    // Send Http request
    this.fetchPosts()
  }

  onClearPosts() {
    // Send Http request
  }

  fetchPosts() {
    this.http.get<{ [key: string]: Post }>('https://udemy-cource-project-default-rtdb.europe-west1.firebasedatabase.app/posts.json')
      .pipe(
        map(responseData => {
          const postsArray: Post[] = []
          for (const key in responseData) {
            postsArray.push({...responseData[key], id: key})
          }
          return postsArray
        }),
      )
      .subscribe((posts) => {
        // console.log(responseData)
        this.loadedPosts = posts
      })
  }

}
