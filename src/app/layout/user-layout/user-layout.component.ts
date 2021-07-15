import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.css'],
})
export class UserLayoutComponent implements OnInit {
  public userName: string = '';
  constructor(private router: Router) {}

  ngOnInit(): void {
    if (sessionStorage.getItem('user')) {
      let temp = sessionStorage.getItem('user');
      this.userName = temp !== null ? temp : '';
    }
  }
  logOut(): void {
    sessionStorage.clear();
    this.router.navigate(['/']).then(() => {
      window.location.reload();
    });
  }
  uploadQuestion(): void {
    this.router.navigate(['/uploadQuestion']);
  }
}
