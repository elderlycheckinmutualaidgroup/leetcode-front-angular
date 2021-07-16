import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service/auth-service.service';

@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.css'],
})
export class UserLayoutComponent implements OnInit {
  constructor(private router: Router, private service: AuthServiceService) {}

  public userName: string = '';

  ngOnInit(): void {
    this.userName = sessionStorage.getItem('user') || '';
    this.service.login(this.userName, '').then(
      (responseData) => {
        if (responseData.message == 'yes') {
        } else {
          sessionStorage.removeItem('user');
          window.location.reload();
          alert('Fuck, how dare you cheat on this web?');
        }
      },
      (responseError) => {
        sessionStorage.removeItem('user');
        window.location.reload();
        alert('server error');
      }
    );
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
