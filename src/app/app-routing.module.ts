import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookSearchComponent } from './components/book-search/book-search.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { UserNameComponent } from './components/user-name/user-name.component';

const routes: Routes = [
  {
    path: 'sign-in',
    component: UserNameComponent,
  },
  {
    path: 'books-search',
    component: BookSearchComponent,
  },
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
