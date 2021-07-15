import { Component, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { QuestionServiceService } from '../services/question-service/question-service.service';
import { QuestionDetail } from '../interfaces/questionDetailInterface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload-question',
  templateUrl: './upload-question.component.html',
  styleUrls: ['./upload-question.component.css'],
})
export class UploadQuestionComponent implements OnInit {
  constructor(
    private service: QuestionServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (sessionStorage.getItem('user')) {
      let temp = sessionStorage.getItem('user');
      this.userName = temp !== null ? temp : '';
    }
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    this.currentTime = mm + '/' + dd + '/' + yyyy;
  }

  allTags = [
    'Array',
    'String',
    'Hash Table',
    'Dynamic Programming',
    'Math',
    'Depth-First Search',
    'Sorting',
    'Greedy',
    'Breadth-Frist Search',
    'Tree',
    'Binary Search',
    'Two Pointers',
    'Graph',
    'Sliding Window',
    'Stack',
    'Queue',
    'Linked List',
    'Recursion',
  ];

  currentTags = [];
  questionName: string = '';
  questionDescription: string = '';
  questionSolution: string = '';
  public userName: string = '';
  public currentTime: string = '';

  onTitleKey(event: any): void {
    this.questionName = event.target.value;
  }
  onDescriptionKey(event: any): void {
    this.questionDescription = event.target.value;
  }

  onSolutionKey(event: any): void {
    this.questionSolution = event.target.value;
  }

  async upload() {
    if (this.questionName == '') {
      return;
    }
    var question: QuestionDetail;
    question = {
      questionName: this.questionName,
      questionTag: this.currentTags,
      questionDescription: this.questionDescription,
      questionAnswer: this.questionSolution,
      questionDate: this.currentTime,
      userName: this.userName,
    };
    var temp = await this.service.upload(question).then(
      (responseData) => {
        if (responseData.message == 'success') {
          this.router.navigate(['/question']);
        }
      },
      (responseError) => {}
    );
  }

  drop(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
