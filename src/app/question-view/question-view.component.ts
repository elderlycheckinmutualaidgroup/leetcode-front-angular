import { Component, OnInit } from '@angular/core';
import { QuestionServiceService } from '../services/question-service/question-service.service';
import { QuestionDetail } from '../interfaces/questionDetailInterface';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-question-view',
  templateUrl: './question-view.component.html',
  styleUrls: ['./question-view.component.css'],
})
export class QuestionViewComponent implements OnInit {
  constructor(
    private service: QuestionServiceService,
    private route: ActivatedRoute
  ) {}

  async ngOnInit() {
    var id = this.route.snapshot.paramMap.get('questionId') || '';
    await this.get(id);
  }
  async get(id: string) {
    await this.service.getOneQuestion(id).then(
      (responseData) => {
        this.question = responseData;
      },
      (responseError) => {
        alert('server error');
      }
    );
  }

  question: QuestionDetail | undefined;
}
