import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CallbackPage } from './callback.page';

const routes: Routes = [
  {
    path: '',
    component: CallbackPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CallbackPageRouterModule {}
