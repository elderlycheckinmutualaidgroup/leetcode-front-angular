import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FormControl } from '@angular/forms';
import { Question } from '../interfaces/questionInterface';
import { QuestionServiceService } from '../services/question-service/question-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css'],
})
export class QuestionComponent implements AfterViewInit {
  constructor(
    private router: Router,
    private service: QuestionServiceService
  ) {}
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = [
    'questionName',
    'questionTag',
    'userName',
    'questionDate',
  ];
  filteredOptions: string[] = [];
  searchResult = new FormControl('');
  searchTypes: string[] = ['Question Name', 'Question Tag', 'User Name'];
  uniqueQuestionNameSet = new Set<string>();
  uniqueQuestionTagSet = new Set<string>();
  uniqueUserNameSet = new Set<string>();
  selectedsearchType: string = '';

  async getAll() {
    var temp = await this.service.getAllQuestions().then(
      (responseDate) => {
        this.ELEMENT_DATA = responseDate;
      },
      (responseError) => {
        window.location.reload();
      }
    );
  }

  async ngOnInit() {
    await this.getAll();
    console.log('hello');
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
    this.ELEMENT_DATA.forEach((value) => {
      this.uniqueQuestionNameSet.add(value.questionName);
    });
    this.ELEMENT_DATA.forEach((value) => {
      value.questionTag.forEach((tag) => {
        this.uniqueQuestionTagSet.add(tag);
      });
    });
    this.ELEMENT_DATA.forEach((value) => {
      this.uniqueUserNameSet.add(value.userName);
    });
  }

  private _filter(value: string): any {
    if (
      value == null ||
      value.length == 0 ||
      this.selectedsearchType.length == 0
    ) {
      return null;
    }
    const filterValue = value.toLowerCase();

    if (this.selectedsearchType == 'Question Name') {
      let temp = [];
      for (let val of this.uniqueQuestionNameSet) {
        if (val.toLowerCase().includes(filterValue)) {
          temp.push(val);
        }
      }
      return temp;
    }
    if (this.selectedsearchType == 'Question Tag') {
      let temp = [];
      for (let val of this.uniqueQuestionTagSet) {
        if (val.toLowerCase().includes(filterValue)) {
          temp.push(val);
        }
      }
      return temp;
    }
    if (this.selectedsearchType == 'User Name') {
      let temp = [];
      for (let val of this.uniqueUserNameSet) {
        if (val.toLowerCase().includes(filterValue)) {
          temp.push(val);
        }
      }
      return temp;
    }
  }
  onKey(event: any): any {
    this.filteredOptions = this._filter(event.target.value);
  }

  ngAfterViewInit() {
    if (this.paginator) this.dataSource.paginator = this.paginator;
  }

  clickedQuestion(row: any): void {
    this.router.navigate(['/question-view', row._id]);
  }

  searchLogic(value: string): any {
    if (
      value == null ||
      value.length == 0 ||
      this.selectedsearchType.length == 0
    ) {
      return [];
    }
    if (this._filter(value) == null) {
      return null;
    }
    const filterValue = value.toLowerCase();

    if (this.selectedsearchType == 'Question Name') {
      return this.ELEMENT_DATA.filter((option) =>
        option.questionName.toLowerCase().includes(filterValue)
      );
    }
    if (this.selectedsearchType == 'Question Tag') {
      let temp = [];
      for (let val of this.ELEMENT_DATA) {
        for (let x of val.questionTag) {
          if (x.toLowerCase() == filterValue) {
            temp.push(val);
          }
        }
      }
      return temp;
    }
    if (this.selectedsearchType == 'User Name') {
      return this.ELEMENT_DATA.filter((option) =>
        option.userName.toLowerCase().includes(filterValue)
      );
    }
  }

  search(): void {
    let temp = this.searchLogic(this.searchResult.value);
    this.dataSource = new MatTableDataSource(temp);
    this.ngAfterViewInit();
  }

  ELEMENT_DATA: Question[] = [];
}
