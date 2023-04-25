import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PAGESIZE, PAGE, COUNT } from '../const';
import { Post } from '../entity/Post';
import { PostsService } from '../_services/posts.service';
import { PublicService } from '../_services/public.service';
import { StorageService } from '../_services/storage.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  content?: string;
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;
  listPost!: Post[]
  pageSize = PAGESIZE;
  page = PAGE;
  term = '';
  count = COUNT;

  constructor(private postService: PostsService,
    private storageService: StorageService,
    private router: Router,
      private publicService: PublicService) { }

  ngOnInit(): void {
    this.publicService.getAllPostIsActive().subscribe({
      next: data => {
        this.listPost = data;
      },
      error: err => {console.log(err)
        if (err.error) {
          this.content = JSON.parse(err.error).message;
        } else {
          this.content = "Error with status: " + err.status;
        }
      }
    });
  }

  viewPost(id: number){
    this.router.navigate(['view-post', id]);
  }

  handlePageChange(event: number): void {
    this.page = event;
    this.retrievePosts(this.term);
  }

  retrievePosts(term: string){
    this.postService.getAllPostsWithPagination(term).subscribe(res =>{
      this.listPost = res.content;
      this.count = res.totalElements
    })
  }

  searchByTerm(){
    this.retrievePosts(this.term);
  }
}
