import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UserRecord } from '../../interfaces/userRecordInterface';

@Injectable({
  providedIn: 'root',
})
export class UserRecordServiceService {
  constructor(private http: HttpClient) {}
  public serverUrl = environment.baseUrl;

  getAll(): Promise<UserRecord[]> {
    var result = this.http
      .get<UserRecord[]>(this.serverUrl + 'userRecord')
      .pipe(catchError(this.errorHandler))
      .toPromise();
    return result;
  }

  errorHandler(error: HttpErrorResponse) {
    console.error(error);
    return throwError(error.message || 'Sericer error');
  }
}
