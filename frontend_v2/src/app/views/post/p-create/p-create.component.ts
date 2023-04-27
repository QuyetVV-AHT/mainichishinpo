import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PostRequest } from 'src/app/entity/Post';
import { PostsService } from 'src/app/_services/posts.service';

@Component({
  selector: 'app-p-create',
  templateUrl: './p-create.component.html',
  styleUrls: ['./p-create.component.scss']
})
export class PCreateComponent {
  post = new PostRequest();
  formGroup!: FormGroup;
  constructor(private postService: PostsService,
    private router: Router,
    private toastrService: ToastrService,
    private httpClient: HttpClient,
    private formBuilder: FormBuilder,
    ) { }

  ngOnInit(): void {

    this.formGroup = this.formBuilder.group({
      post_name: ['', Validators.required],
      contents: ['', Validators.required],
    });
  }

  goToListPost(){
    this.toastrService.success('Thành công', 'Tạo bài viết mới');
    this.router.navigate(['post/list']);
  }
  createPost(){
    const value = this.formGroup.getRawValue();

    this.post.post_name = value.post_name;
    this.post.contents = value.contents
    this.postService.addPost(this.post).subscribe(data =>{
      this.goToListPost();
  },
  error => console.log(error));
   }
}
