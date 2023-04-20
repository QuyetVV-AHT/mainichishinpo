import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ExamService } from 'src/app/_services/exam.service';
import { Exam } from '../exam';

@Component({
  selector: 'app-exam-create',
  templateUrl: './exam-create.component.html',
  styleUrls: ['./exam-create.component.css']
})
export class ExamCreateComponent {
  exam = new Exam();
  formGroup!: FormGroup;
  file!: File;
  constructor(private examService: ExamService,
    private router: Router,
    private toastrService: ToastrService,
    private httpClient: HttpClient,
    private formBuilder: FormBuilder,
    ) { }

  ngOnInit(): void {

    this.formGroup = this.formBuilder.group({
      exam_name: ['', Validators.required],
      note: [''],
    });
  }

  goToListExam(){
    this.toastrService.success('Thành công', 'Tạo bài thi mới');
    this.router.navigate(['exam']);
  }
   onSubmit(){
    const formData = new FormData();
    // Store form name as "file" with file data
    formData.append('file', this.file, this.file.name);

    this.examService.addExam(this.exam, formData).subscribe(data =>{
      this.goToListExam();
  },
  error => console.log(error));
   }



    // On file Select
  onChange(event: any) {
    this.file = event.target.files[0];

  }

  // OnClick of button Upload
  onUpload() {
    if (this.file) {
       // Create form data
    const formData = new FormData();

    // Store form name as "file" with file data
    formData.append('file', this.file, this.file.name);
    console.log(this.file.name);

    }
  }
}
