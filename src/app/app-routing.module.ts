import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GetquoteComponent } from './components/getquote/getquote.component';
import { ReviewquoteComponent } from './components/reviewquote/reviewquote.component';
import { SuccessComponent } from './components/success/success.component';

const routes: Routes = [{ path: 'quote', component: GetquoteComponent }, 
{ path: '', component: GetquoteComponent }, 
{ path: 'quote/:id', component: GetquoteComponent }, 
{ path: 'review', component: ReviewquoteComponent },
{ path: 'success', component: SuccessComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
