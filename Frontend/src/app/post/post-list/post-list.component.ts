import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PAGESIZE, PAGE, COUNT } from 'src/app/const';
import { PostsService } from 'src/app/_services/posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent {
  listPosts: any;
  pageSize = PAGESIZE;
  page = PAGE;
  term = '';
  count = COUNT;

   constructor(
    private postService: PostsService,
    private toastrService: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllPosts();
    this.retrievePosts(this.term);
  }

  private getAllPosts(){
    this.postService.getListPosts().subscribe(data =>{
      this.listPosts = data;
    })
  }

  handlePageChange(event: number): void {
    this.page = event;
    this.retrievePosts(this.term);
  }

  updatePost(postId: number){
    this.router.navigate(['update-post', postId]);
  }

  deletePost(postId: number){
    this.postService.deletePostbyId(postId).subscribe(data => {
      this.router.navigate(['post']);
      window.location.reload();
      this.toastrService.success('Thành công', 'Xóa bài viết');
    })
  }

  retrievePosts(term: string){
    this.postService.getAllPostsWithPagination(term).subscribe(res =>{
      this.listPosts = res.content;
      this.count = res.totalElements
    })
  }

  searchByTerm(){
    this.retrievePosts(this.term);
  }
}
