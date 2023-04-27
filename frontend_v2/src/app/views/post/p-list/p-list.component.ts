import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PAGESIZE, PAGE, COUNT } from 'src/app/const';
import { PostsService } from '../../../_services/posts.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-p-list',
  templateUrl: './p-list.component.html',
  styleUrls: ['./p-list.component.scss']
})
export class PListComponent {
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
    this.router.navigate(['post/update', postId]);
  }

  deletePost(postId: number){
    this.postService.deletePostbyId(postId).subscribe(data => {
      this.router.navigate(['post/list']);
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
