import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';
import { MatChipsModule } from '@angular/material/chips';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { UserLayoutComponent } from './layout/user-layout/user-layout.component';
import { GuestLayoutComponent } from './layout/guest-layout/guest-layout.component';
import { QuestionComponent } from './question/question.component';
import { QuestionViewComponent } from './question-view/question-view.component';
import { UploadQuestionComponent } from './upload-question/upload-question.component';
import { RankingComponent } from './ranking/ranking.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MyComponent } from './my/my.component';
import { MyViewComponent } from './my-view/my-view.component';
import { MarkdownDirective } from './markdown.directive';

import 'prismjs';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-python';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserLayoutComponent,
    GuestLayoutComponent,
    QuestionComponent,
    QuestionViewComponent,
    UploadQuestionComponent,
    RankingComponent,
    MyComponent,
    MyViewComponent,
    MarkdownDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatInputModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    MatTableModule,
    MatPaginatorModule,
    MatAutocompleteModule,
    MatSelectModule,
    HttpClientModule,
    MatChipsModule,
    DragDropModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
