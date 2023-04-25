import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Post, PostRequest } from 'src/app/entity/Post';
import { PostsService } from 'src/app/_services/posts.service';

@Component({
  selector: 'app-post-update',
  templateUrl: './post-update.component.html',
  styleUrls: ['./post-update.component.css']
})
export class PostUpdateComponent {
  post: Post = new Post();
  id!: number;
  formGroup!: FormGroup;
  constructor(
    private postService : PostsService,
   private route: ActivatedRoute,
    private router:Router,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private httpClient: HttpClient
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.postService.getPostById(this.id).subscribe(data=>{
      this.post=data;
    },error => console.log(error));

    this.formGroup = this.formBuilder.group({
      post_name: ['', Validators.required],
      contents: ['', Validators.required],
    });
  }

  onSubmit(value: any){

    this.postService.updatePost(this.id, this.post).subscribe(data =>{
      this.toastrService.info('Thành công', 'Cập nhật bài viết');
      this.router.navigate(['post']);

    },error => console.log(error));
  }

  isActive(isActive: any){
    this.postService.activePost(this.id, isActive).subscribe(data =>{

      this.router.navigate(['post']);
    })
  }
}
