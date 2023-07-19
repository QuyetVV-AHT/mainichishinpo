import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Track } from 'ngx-audio-player';
import { s3urlShinkanzenN3 } from 'src/app/const';
import { ExamService } from 'src/app/_services/exam.service';
import { QuestionService } from 'src/app/_services/question.service';

@Component({
  selector: 'app-e-start-audio-fillword',
  templateUrl: './e-start-audio-fillword.component.html',
  styleUrls: ['./e-start-audio-fillword.component.scss']
})
export class EStartAudioFillwordComponent implements OnInit {

  examId: any;
  type!: string;
  url_audio!: string;
  examname!: string;
  title_exam: string | undefined;
  questions: any;
  s3urlShinkanzenN3 = s3urlShinkanzenN3;
  msaapPlaylist!: Track[];
  constructor(
    private locationStrategy: LocationStrategy,
    private route: ActivatedRoute,
    private questionService: QuestionService,
    private examService: ExamService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.examId = this.route.snapshot.params['id'];
    this.examname = this.route.snapshot.params['examname'];
    this.type = this.route.snapshot.params['type'];
    this.msaapPlaylist = [];

      this.examService.getExamByIdAndExamName(this.examId, this.examname, this.type).subscribe(
        (data) => {
            this.questions = data.questionFillWords;
            this.title_exam = data.exam_name;
            this.url_audio = data.url_audio;
            this.questions.forEach((ques: any) => {
              ques['givenAnswer'] = '';
              ques['color'] = false;  // Mac dinh cau tra loi sai
            });
            let track = new Track();
            track.title = this.url_audio;
            track.link = this.s3urlShinkanzenN3 +this.url_audio;
            this.msaapPlaylist.push(track);

        },
        (error) => {}
      );
    }

  }




