import { Component, OnInit } from "@angular/core";

// nativescript
import { RouterExtensions } from "nativescript-angular/router";
import { ModalDialogParams } from "nativescript-angular/directives/dialogs";

@Component({
  selector: "ns-lazy",
  moduleId: module.id,
  templateUrl: "./lazy.component.html",
})
export class LazyComponent implements OnInit {
  public isModal: boolean;

  constructor(
    private router: RouterExtensions,
    private params: ModalDialogParams
  ) {
    if (params.context.isModal) {
      this.isModal = true;
    }   
  }

  public close() {
    if (this.isModal) {
      this.params.closeCallback();
    } else {
      this.router.back();
    }
  }

  ngOnInit(): void {
  }
}
