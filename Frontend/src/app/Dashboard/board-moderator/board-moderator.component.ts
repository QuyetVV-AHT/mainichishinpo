import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PAGESIZE, PAGE, COUNT } from 'src/app/const';
import { Question } from 'src/app/question/question';
import { QuestionService } from 'src/app/_services/question.service';

@Component({
  selector: 'app-board-moderator',
  templateUrl: './board-moderator.component.html',
  styleUrls: ['./board-moderator.component.css']
})
export class BoardModeratorComponent {

  ngOnInit(): void {
  }

}
