import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Post } from 'src/app/entity/Post';
import { PostsService } from 'src/app/_services/posts.service';

@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.css']
})
export class PostViewComponent {
  post: Post = new Post();
  id!: number;
  constructor(
    private postService : PostsService,
   private route: ActivatedRoute,
    private router:Router,
    private toastrService: ToastrService,
    private httpClient: HttpClient,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.postService.getPostById(this.id).subscribe(data=>{
      this.post=data;
    },error => console.log(error));

  }


}
