import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FormControl } from '@angular/forms';
import { Question } from '../interfaces/questionInterface';
import { QuestionServiceService } from '../services/question-service/question-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my',
  templateUrl: './my.component.html',
  styleUrls: ['./my.component.css'],
})
export class MyComponent implements AfterViewInit {
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
  uniqueQuestionNameSet = new Set<string>();
  ELEMENT_DATA: Question[] = [];
  public userName = sessionStorage.getItem('user') || '';

  async getAll() {
    await this.service.getByUserName(this.userName).then(
      (responseDate) => {
        this.ELEMENT_DATA = responseDate;
      },
      (responseError) => {
        alert('server error');
      }
    );
  }

  async ngOnInit() {
    await this.getAll();
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
    this.ELEMENT_DATA.forEach((value) => {
      this.uniqueQuestionNameSet.add(value.questionName);
    });
  }

  private _filter(value: string): any {
    if (value === undefined || value == null) {
      return;
    }
    const filterValue = value.toLowerCase();
    let temp = [];
    for (let val of this.uniqueQuestionNameSet) {
      if (val.toLowerCase().includes(filterValue)) {
        temp.push(val);
      }
    }
    return temp;
  }
  onKey(event: any): any {
    this.filteredOptions = this._filter(event.target.value);
  }

  ngAfterViewInit() {
    if (this.paginator) this.dataSource.paginator = this.paginator;
  }

  clickedQuestion(row: any): void {
    this.router.navigate(['/my-view', row._id]);
  }

  searchLogic(value: string): any {
    if (this._filter(value) == null) {
      return null;
    }
    const filterValue = value.toLowerCase();

    return this.ELEMENT_DATA.filter((option) =>
      option.questionName.toLowerCase().includes(filterValue)
    );
  }

  search(): void {
    let temp = this.searchLogic(this.searchResult.value);
    this.dataSource = new MatTableDataSource(temp);
    this.ngAfterViewInit();
  }
}
