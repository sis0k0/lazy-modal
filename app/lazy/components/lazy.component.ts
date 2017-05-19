import { Component } from "@angular/core";

import { ModalDialogParams } from "nativescript-angular/directives/dialogs";

@Component({
  moduleId: module.id,
  templateUrl: "./lazy.component.html",
})
export class LazyComponent {
  constructor(private params: ModalDialogParams) {
  }

  public close() {
    this.params.closeCallback();
  }
}
