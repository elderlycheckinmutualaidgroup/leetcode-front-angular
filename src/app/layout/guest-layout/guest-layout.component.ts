import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { AuthServiceService } from 'src/app/services/auth-service/auth-service.service';

export interface LoginData {
  userName: string;
  password: string;
}

@Component({
  selector: 'app-guest-layout',
  templateUrl: './guest-layout.component.html',
  styleUrls: ['./guest-layout.component.css'],
})
export class GuestLayoutComponent implements OnInit {
  constructor(private router: Router, public dialog: MatDialog) {}
  userName: string | undefined;
  password: string | undefined;
  ngOnInit(): void {}

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '50vw',
      data: { name: this.userName, password: this.password },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.userName = result;
    });
  }

  navigateToQuestion(): void {
    this.router.navigate(['/question']);
  }
  navigateToHome(): void {
    this.router.navigate(['/home']);
  }
}

@Component({
  selector: 'login',
  templateUrl: 'login.html',
})
export class DialogOverviewExampleDialog {
  constructor(
    private router: Router,
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: LoginData,
    private service: AuthServiceService
  ) {
    this.data.userName = '';
    this.data.password = '';
  }

  onLoginClick(): void {
    this.service.login(this.data.userName, this.data.password).subscribe(
      (responseData) => {
        console.log(responseData);
        if (responseData.message == 'yes') {
          sessionStorage.setItem('user', this.data.userName);

          this.dialogRef.close();
          this.router.navigate(['/']).then(() => {
            window.location.reload();
          });
        } else {
          alert('Something goes wrong');
        }
      },
      (responseError) => {
        alert('server error');
      }
    );
  }
  onUserNameKey(event: any): void {
    this.data.userName = event.target.value;
  }
  onPasswordKey(event: any): void {
    this.data.password = event.target.value;
  }
}
