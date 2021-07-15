import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Question } from 'src/app/interfaces/questionInterface';
import { QuestionDetail } from 'src/app/interfaces/questionDetailInterface';
import { promise } from 'protractor';

@Injectable({
  providedIn: 'root',
})
export class QuestionServiceService {
  constructor(private http: HttpClient) {}
  public serverUrl = environment.baseUrl;

  upload(question: QuestionDetail): Promise<any> {
    var result = this.http
      .post<any>(this.serverUrl + 'questions/upload', question)
      .pipe(catchError(this.errorHandler))
      .toPromise();
    return result;
  }

  update(question: any): Promise<any> {
    var result = this.http
      .post<any>(this.serverUrl + 'questions/update', question)
      .pipe(catchError(this.errorHandler))
      .toPromise();
    return result;
  }

  delete(questionId: any): Promise<any> {
    var temp = {
      questionId: questionId,
    };
    var result = this.http
      .post<any>(this.serverUrl + 'questions/delete', temp)
      .pipe(catchError(this.errorHandler))
      .toPromise();
    return result;
  }

  getAllQuestions(): Promise<Question[]> {
    var result = this.http
      .get<Question[]>(this.serverUrl + 'questions')
      .pipe(catchError(this.errorHandler))
      .toPromise();
    return result;
  }

  getByUserName(userName: string): Promise<Question[]> {
    var temp = {
      userName: userName,
    };
    var result = this.http
      .post<Question[]>(this.serverUrl + 'questions/getByUserName', temp)
      .pipe(catchError(this.errorHandler))
      .toPromise();
    return result;
  }

  getOneQuestion(questionId: string): Promise<QuestionDetail> {
    var temp = {
      questionId: questionId,
    };
    var result = this.http
      .post<any>(this.serverUrl + 'questions/one', temp)
      .pipe(catchError(this.errorHandler))
      .toPromise();
    return result;
  }

  errorHandler(error: HttpErrorResponse) {
    console.error(error);
    return throwError(error.message || 'Sericer error');
  }
}
