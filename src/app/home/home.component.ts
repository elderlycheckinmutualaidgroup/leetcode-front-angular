import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  showGuestLayout: boolean = false;
  showUserLayout: boolean = false;
  constructor() {}

  ngOnInit(): void {
    if (sessionStorage.getItem('user') == null) {
      this.showGuestLayout = true;
    } else {
      this.showUserLayout = true;
    }
  }
}
