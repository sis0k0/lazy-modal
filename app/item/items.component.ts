import { Component, OnInit, NgModuleFactoryLoader, ViewContainerRef, ModuleWithComponentFactories, ComponentFactory } from "@angular/core";

// nativescript
import { NSModuleFactoryLoader } from "nativescript-angular/router";
import { ModalDialogService } from "nativescript-angular/directives/dialogs";

// app
import { Item } from "./item";
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
        // Lazily load a module, gain access to a component from that new module
        // immediately open the new lazily loaded component in a modal
        (<NSModuleFactoryLoader>this.moduleLoader)
            .loadAndCompileComponents('./lazy/lazy.module#LazyModule')
            .then((mod: ModuleWithComponentFactories<any>) => {
                const moduleRef = mod.ngModuleFactory.create(this.vcRef.parentInjector);
                // find component factory to ref the correct componentType
                let lazyCmpFactory: ComponentFactory<any>;
                for (let cmp of mod.componentFactories) {
                    if (cmp.selector === "ns-lazy") { // find by Component's selector
                        lazyCmpFactory = cmp;
                        break;
                    }
                }

                this.modalService.showModal(lazyCmpFactory.componentType, {
                    moduleRef,
                    viewContainerRef: this.vcRef,
                    context: {
                        isModal: true
                    }
                });
            });
    }
}
