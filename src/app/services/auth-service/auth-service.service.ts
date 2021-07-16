import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  constructor(private router: Router, private http: HttpClient) {}
  public serverUrl = environment.baseUrl;

  login(userName: string, password: string): Promise<any> {
    var user = {
      userName: userName,
      password: password,
    };
    return this.http
      .post<any>(this.serverUrl + 'auth/login', user)
      .pipe(catchError(this.errorHandler))
      .toPromise();
  }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    //we should check from DB or use JWt and Redis,
    var temp = sessionStorage.getItem('user') || '';
    var returnResult = false;
    await this.login(temp, '').then(
      (responseData) => {
        if (responseData.message == 'yes') {
          returnResult = true;
        } else {
          alert('Your are not allowed to view this page');
          sessionStorage.removeItem('user');
          this.router.navigate(['/home']).then(() => {
            window.location.reload();
          });
          returnResult = false;
        }
      },
      (responseError) => {
        sessionStorage.removeItem('user');
        this.router.navigate(['/home']).then(() => {
          window.location.reload();
        });
        alert('server error');
      }
    );
    return returnResult;
  }

  errorHandler(error: HttpErrorResponse) {
    console.error(error);
    return throwError(error.message || 'Server Error');
  }
}
