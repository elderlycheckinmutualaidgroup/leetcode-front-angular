import { Component, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { QuestionServiceService } from '../services/question-service/question-service.service';
import { QuestionDetail } from '../interfaces/questionDetailInterface';
import { ActivatedRoute, Router } from '@angular/router';
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
    var temp = await this.service.getOneQuestion(id).then(
      (responseData) => {
        console.log(responseData, 'response Data');
        this.question = responseData;
      },
      (responseError) => {}
    );
  }

  question: QuestionDetail | undefined;
}
