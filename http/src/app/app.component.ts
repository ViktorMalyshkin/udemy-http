import { Component, OnInit } from '@angular/core'
import { HttpClient } from '@angular/common/http'

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

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
    // console.log(postData)
    // this.http.post('https://ng-complete-guide-c56d3.firebaseio.com/posts.json', postData)
    this.http.post('https://udemy-cource-project-default-rtdb.europe-west1.firebasedatabase.app/posts.json', postData)
      .subscribe((responceData) => {
        console.log(responceData)
      })
  }

  onFetchPosts() {
    // Send Http request
    this.fetchPosts()
  }

  onClearPosts() {
    // Send Http request
  }
  fetchPosts(){
    this.http.get('https://udemy-cource-project-default-rtdb.europe-west1.firebasedatabase.app/posts.json')
      .subscribe((responceData) => {
        console.log(responceData)
      })
  }

}
