import { Component } from "@angular/core";
import { NgForm, FormControl, Validators } from "@angular/forms";
import { Product } from "../model/product.model";
import { Model } from "../model/repository.model"
import { Message } from "../messages/message.model"
import { MessageService } from "../messages/message.service";
import { MODES, SharedState, StateUpdate } from "./sharedState.service";


@Component({
    selector: "paForm",
    templateUrl: "form.component.html",
    styleUrls: ["form.component.css"]
})
export class FormComponent {

    product: Product = new Product();
    editing: boolean = false;
    nameField: FormControl = new FormControl("Initial Value", {updateOn: "change"});

    constructor(private model: Model, 
        private state: SharedState,
        private messageService: MessageService) {
        this.state.changes.subscribe((upd) => this.handleStateChange(upd))
        this.messageService.reportMessage(new Message("Creating New Product"));
    }

    ngOnInit(){
        this.nameField.valueChanges.subscribe(newValue => {
            this.messageService.reportMessage(new Message(newValue || "(Empty)"));
            if(typeof(newValue) == "string" && newValue.length %2 == 0) {
                this.nameField.markAsPristine();
            }
        });
    }

    handleStateChange(newState: StateUpdate) {

        this.editing = newState.mode == MODES.EDIT;

        if (this.editing && newState.id) {
            
            Object.assign(this.product, this.model.getProduct(newState.id)
                ?? new Product());

            this.messageService.reportMessage(
                new Message(`Editing ${this.product.name}`));

            this.nameField.setValue(this.product.name);
                
        } else {
            this.product = new Product();
            this.messageService.reportMessage(new Message("Creating New Product"));
            this.nameField.setValue("");
        }
    }

    // submitForm(form: NgForm) {
    //     if (form.valid) {
    //         this.model.saveProduct(this.product);
    //         this.product = new Product();
    //         form.resetForm();
    //     }
    // }

}