import { Component, OnDestroy, OnInit } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Post } from './post.model'
import { PostsService } from './posts.service'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts = []
  isFetching = false
  error = null
  private errorSub: Subscription

  constructor(private http: HttpClient, private postsService: PostsService) {
  }

  ngOnInit(): void {
    this.errorSub = this.postsService.error.subscribe(errorMessage => {
      this.error = errorMessage;
    });
    this.isFetching = true
    this.postsService.fetchPosts().subscribe(
      posts => {
        this.isFetching = false
        this.loadedPosts = posts
      }, error => {
        this.error = error.message
      })
  }

  onCreatePost(postData: Post) {
    this.postService.createAndStorePost(postData.title, postData.content)
  }

  onFetchPosts() {
    // Send Http request
    this.isFetching = true
    this.postService.fetchPosts().subscribe(posts => {
      this.isFetching = false
      this.loadedPosts = posts
    }, error => {
      this.error = error.message
      console.log(error)
    })
  }

  onClearPosts() {
    // Send Http request
    this.postsService.deletePosts().subscribe(() => {
      this.loadedPosts = []
    })
  }

  ngOnDestroy() {
    this.errorSub.unsubscribe();
  }

}
