import {
    Component,
    ComponentFactory,
    NgModuleFactory,
    NgModuleFactoryLoader,
    ViewContainerRef,
} from "@angular/core";
import { ModalDialogService } from "nativescript-angular/directives/dialogs";

import { LazyComponent } from "./lazy/components/lazy.component";

@Component({
    selector: "ns-app",
    template: `<Button text="Lazily load in Modal" (tap)="openModal()"></Button>`,
})
export class AppComponent {
    constructor(
        private moduleLoader: NgModuleFactoryLoader,
        private vcRef: ViewContainerRef,
        private modalService: ModalDialogService,
    ) { }

    public openModal() {
        this.moduleLoader.load("./lazy/lazy.module#LazyModule")
            .then((module: NgModuleFactory<any>) => {
                const moduleRef = module.create(this.vcRef.parentInjector);

                this.modalService.showModal(LazyComponent, {
                    moduleRef,
                    viewContainerRef: this.vcRef,
                    context: { isModal: true }
                });
            });
    }
}
