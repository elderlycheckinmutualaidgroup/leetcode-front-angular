import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { UserRecordServiceService } from '../services/userRecord-service/user-record-service.service';
import { UserRecord } from '../interfaces/userRecordInterface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css'],
})
export class RankingComponent implements AfterViewInit {
  constructor(
    private service: UserRecordServiceService,
    private router: Router
  ) {}
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = [
    'userName',
    'userQuestionNumber',
    'userCurrentRecord',
    'userHistoryRecord',
  ];
  ELEMENT_DATA: UserRecord[] = [];

  async getAll() {
    await this.service.getAll().then(
      (responseDate) => {
        this.ELEMENT_DATA = responseDate;
      },
      (responseError) => {
        alert('server error');
      }
    );
  }

  clickedUser(row: any) {
    this.router.navigate(['/user-detail', row._id]);
  }

  async ngOnInit() {
    await this.getAll();
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  }
  ngAfterViewInit() {
    if (this.paginator) this.dataSource.paginator = this.paginator;
  }
}
