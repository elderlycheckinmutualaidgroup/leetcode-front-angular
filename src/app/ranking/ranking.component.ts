import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { UserRecordServiceService } from '../services/userRecord-service/user-record-service.service';
import { UserRecord } from '../interfaces/userRecordInterface';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css'],
})
export class RankingComponent implements AfterViewInit {
  constructor(private service: UserRecordServiceService) {}
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = [
    'userName',
    'userQuestionNumber',
    'userCurrentRecord',
    'userHistoryRecord',
  ];

  async getAll() {
    var temp = await this.service.getAll().then(
      (responseDate) => {
        console.log(responseDate);
        this.ELEMENT_DATA = responseDate;
      },
      (responseError) => {
        // window.location.reload();
      }
    );
  }

  async ngOnInit() {
    await this.getAll();
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  }
  ngAfterViewInit() {
    if (this.paginator) this.dataSource.paginator = this.paginator;
  }
  ELEMENT_DATA: UserRecord[] = [];
}
