import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Subscribable, throwError } from 'rxjs';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  constructor(private router: Router, private http: HttpClient) {}
  public serverUrl = environment.baseUrl;

  login(userName: string, password: string): Subscribable<any> {
    var user = {
      userName: userName,
      password: password,
    };
    return this.http
      .post<any>(this.serverUrl + 'auth/login', user)
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    console.error(error);
    return throwError(error.message || 'Server Error');
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    //we should check from DB or use JWt and Redis,
    if (sessionStorage.getItem('user') == null) {
      alert('Your are not allowed to view this page');
      this.router.navigate(['']);
      return false;
    } else {
      return true;
    }
  }
}
