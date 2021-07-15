import { Component, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { QuestionServiceService } from '../services/question-service/question-service.service';
import { QuestionDetail } from '../interfaces/questionDetailInterface';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-my-view',
  templateUrl: './my-view.component.html',
  styleUrls: ['./my-view.component.css'],
})
export class MyViewComponent implements OnInit {
  public showButton: boolean = false;
  public showEdit: boolean = false;
  question: QuestionDetail | undefined;
  public currentTime: string = '';

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

  currentTags: string[] = [];
  questionForm: FormGroup;

  constructor(
    private service: QuestionServiceService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    this.currentTime = mm + '/' + dd + '/' + yyyy;

    this.questionForm = this.formBuilder.group({
      questionName: [''],
      questionDescription: [''],
      questionAnswer: [''],
    });
  }

  async ngOnInit() {
    var id = this.route.snapshot.paramMap.get('questionId') || '';
    await this.get(id);
    this.currentTags = this.question?.questionTag || [];
    this.questionForm = this.formBuilder.group({
      questionName: [this.question?.questionName],
      questionDescription: [this.question?.questionDescription],
      questionAnswer: [this.question?.questionAnswer],
    });
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
  edit(): void {
    this.showButton = !this.showButton;
    this.showEdit = true;
  }
  async save() {
    var id = this.route.snapshot.paramMap.get('questionId') || '';
    var questionDetail = {
      questionId: id,
      questionName: this.questionForm.value.questionName,
      questionTag: this.currentTags,
      questionDescription: this.questionForm.value.questionDescription,
      questionAnswer: this.questionForm.value.questionSolution,
      questionDate: this.currentTime,
      userName: this.question?.userName,
    };
    var temp = this.service.update(questionDetail).then(
      (responseDate) => {
        window.location.reload();
      },
      (responseError) => {}
    );
  }
  async cancle() {
    var id = this.route.snapshot.paramMap.get('questionId') || '';
    await this.get(id);
    this.currentTags = this.question?.questionTag || [];
    this.questionForm = this.formBuilder.group({
      questionName: [this.question?.questionName],
      questionDescription: [this.question?.questionDescription],
      questionAnswer: [this.question?.questionAnswer],
    });
    this.showButton = !this.showButton;
    this.showEdit = false;
  }
  async delete() {
    var id = this.route.snapshot.paramMap.get('questionId') || '';

    const temp = await this.service.delete(id).then(
      (responseData) => {
        this.router.navigate(['/my']);
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