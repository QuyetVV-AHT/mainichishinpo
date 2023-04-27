import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PostRequest } from 'src/app/entity/Post';
import { PostsService } from 'src/app/_services/posts.service';

@Component({
  selector: 'app-p-update',
  templateUrl: './p-update.component.html',
  styleUrls: ['./p-update.component.scss']
})
export class PUpdateComponent {
  post = new PostRequest();
  id!: number;
  formGroup!: FormGroup;
  constructor(private postService: PostsService,
    private router: Router,
    private route: ActivatedRoute,
    private toastrService: ToastrService,
    private httpClient: HttpClient,
    private formBuilder: FormBuilder,
    ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.formGroup = this.formBuilder.group({
      post_name: ['', Validators.required],
      contents: ['', Validators.required],
    });
    this.postService.getPostById(this.id).subscribe(data=>{
      this.post=data;
      this.formGroup.get('post_name')?.setValue(this.post.post_name);
      this.formGroup.get('contents')?.setValue(this.post.contents);
    },error => console.log(error));
  }
  updatePost(){
    const value = this.formGroup.getRawValue();
    this.post.post_name = value.post_name;
    this.post.contents = value.contents

    this.postService.updatePost(this.id, this.post).subscribe(data =>{
      this.toastrService.info('Thành công', 'Cập nhật bài viết');
      this.router.navigate(['post/list']);

    },error => console.log(error));
  }
}
