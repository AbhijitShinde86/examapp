import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { NewTestComponent } from './pages/new-test/new-test.component';
import { TestsComponent } from './pages/tests/tests.component';

const routes: Routes = [
  { path: '', component: TestsComponent },
  { path: 'new', component: NewTestComponent },
];

@NgModule({
  imports: [
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
