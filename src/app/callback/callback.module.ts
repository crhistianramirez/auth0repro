import { NgModule } from '@angular/core';
import { CallbackPage } from './callback.page';
import { CallbackPageRouterModule } from './callback-routing.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [CallbackPage],
  imports: [CallbackPageRouterModule, CommonModule],
})
export class CallbackPageModule {}
