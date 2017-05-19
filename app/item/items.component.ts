import {
    Component,
    ComponentFactory,
    NgModuleFactory,
    NgModuleFactoryLoader,
    OnInit,
    ViewContainerRef,
} from "@angular/core";

import { NSModuleFactoryLoader } from "nativescript-angular/router";
import { ModalDialogService } from "nativescript-angular/directives/dialogs";

import { Item } from "./item";
import { LazyComponent } from "../lazy/components/lazy.component";
import { ItemService } from "./item.service";


@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./items.component.html",
})
export class ItemsComponent implements OnInit {
    items: Item[];

    constructor(
        private itemService: ItemService,
        private moduleLoader: NgModuleFactoryLoader,
        private vcRef: ViewContainerRef,
        private modalService: ModalDialogService
    ) { }

    ngOnInit(): void {
        this.items = this.itemService.getItems();
    }

    public openModal() {
        this.moduleLoader.load('./lazy/lazy.module#LazyModule')
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
