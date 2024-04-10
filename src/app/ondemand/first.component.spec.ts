import { TestBed, ComponentFixture, waitForAsync } from "@angular/core/testing";
import { FirstComponent } from "../ondemand/first.component";
import { Product } from "../model/product.model";
import { Model } from "../model/repository.model";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { Component, ViewChild } from "@angular/core";


@Component({
    template: `<first [pa-model]="model"></first>`
})
class TestComponent {
    constructor(public model: Model) { }
    @ViewChild(FirstComponent)
    firstComponent!: FirstComponent;
}

describe("FirstComponent", () => {

    let fixture: ComponentFixture<TestComponent>;
    let component: FirstComponent;
    let debugElement: DebugElement;
    // let bindingElement: HTMLSpanElement;
    // let spanElement: HTMLSpanElement;
    let divElement: HTMLDivElement;

    let mockRepository = {
        getProducts: function () {
            return [
                new Product(1, "test1", "Soccer", 100),
                new Product(2, "test2", "Chess", 100),
                new Product(3, "test3", "Soccer", 100)
            ]
        }
    }


    beforeEach(waitForAsync(
        () => {
            TestBed.configureTestingModule({
                declarations: [FirstComponent, TestComponent],
                providers: [
                    { provide: Model, useValue: mockRepository }
                ]
            });
            TestBed.compileComponents().then(
                () => {
                    fixture = TestBed.createComponent(TestComponent);
                    fixture.detectChanges();
                    component = fixture.componentInstance.firstComponent;
                    debugElement = fixture.debugElement.query(By.directive(FirstComponent))
                });
        }));



    // it("is defined", () => {
    //     expect(component).toBeDefined()
    // });


    // it("filters categories", () => {
    //     component.category = "Chess";
    //     fixture.detectChanges();
    //     expect(component.getProducts().length).toBe(1);
    //     expect(spanElement.textContent).toContain("1");

    //     component.category = "Soccer";
    //     fixture.detectChanges();
    //     expect(component.getProducts().length).toBe(2);
    //     expect(spanElement.textContent).toContain("2");

    //     component.category = "Running";
    //     fixture.detectChanges();
    //     expect(component.getProducts().length).toBe(0);
    //     expect(spanElement.textContent).toContain("0");

    // })

    // it("handles mouse events", () => {
    //     expect(component.highlighted).toBeFalsy();
    //     expect(divElement.classList.contains("bg-success")).toBeFalsy();
    //     debugElement.triggerEventHandler("mouseenter", new Event("mouseenter"));
    //     fixture.detectChanges();
    //     expect(component.highlighted).toBeTruthy();
    //     expect(divElement.classList.contains("bg-success")).toBeTruthy();
    //     debugElement.triggerEventHandler("mouseleave", new Event("mouseleave"));
    //     fixture.detectChanges();
    //     expect(component.highlighted).toBeFalsy();
    //     expect(divElement.classList.contains("bg-success")).toBeFalsy();
    // });


    // it("implements output property", () => {
    //     let highlighted: boolean = false;
    //     component.change.subscribe(value => highlighted = value);
    //     debugElement.triggerEventHandler("mouseenter", new Event("mouseenter"));
    //     expect(highlighted).toBeTruthy();
    //     debugElement.triggerEventHandler("mouseleave", new Event("mouseleave"));
    //     expect(highlighted).toBeFalsy();
    // });


    it("receives the model through an input property", () => {
        component.category = "Chess";
        fixture.detectChanges();
        let products = mockRepository.getProducts()
            .filter(p => p.category == component.category);
        let componentProducts = component.getProducts();
        for (let i = 0; i < componentProducts.length; i++) {
            expect(componentProducts[i]).toEqual(products[i]);
        }
        expect(debugElement.query(By.css("span")).nativeElement.textContent)
            .toContain(products.length);
    });

});