// nativescript
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { ModalDialogParams } from 'nativescript-angular/directives/dialogs';

// angular
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { Routes } from '@angular/router';

// app
import { LazyComponent } from './components/lazy.component';

const defaultModalParams = new ModalDialogParams({}, null);

const routes: Routes = [
  {
    path: '',
    component: LazyComponent
  }
];

@NgModule({
  imports: [
    NativeScriptModule,
    NativeScriptRouterModule.forChild(routes),
  ],
  declarations: [
    LazyComponent
  ],
  entryComponents: [
    LazyComponent
  ],
  providers: [
    // allows same component to be routed to 
    // or lazily loaded via modal
    { provide: ModalDialogParams, useValue: defaultModalParams }
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class LazyModule { }