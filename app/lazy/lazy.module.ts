import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";

import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { ModalDialogParams } from "nativescript-angular/directives/dialogs";

import { LazyComponent } from "./components/lazy.component";

export function modalParamsFactory() {
    return new ModalDialogParams({}, null);
}

@NgModule({
  imports: [
    NativeScriptModule,
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
    { provide: ModalDialogParams, useFactory: modalParamsFactory }
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class LazyModule { }
