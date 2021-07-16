import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MyViewComponent } from './my-view/my-view.component';
import { MyComponent } from './my/my.component';
import { QuestionViewComponent } from './question-view/question-view.component';
import { QuestionComponent } from './question/question.component';
import { RankingComponent } from './ranking/ranking.component';
import { AuthServiceService } from './services/auth-service/auth-service.service';
import { UploadQuestionComponent } from './upload-question/upload-question.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', component: HomeComponent },
  { path: 'question', component: QuestionComponent },
  { path: 'question-view/:questionId', component: QuestionViewComponent },
  { path: 'ranking', component: RankingComponent },
  { path: 'topic', component: QuestionComponent },
  {
    path: 'uploadQuestion',
    component: UploadQuestionComponent,
    canActivate: [AuthServiceService],
  },
  {
    path: 'my',
    component: MyComponent,
    canActivate: [AuthServiceService],
  },
  {
    path: 'my-view/:questionId',
    component: MyViewComponent,
    canActivate: [AuthServiceService],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
