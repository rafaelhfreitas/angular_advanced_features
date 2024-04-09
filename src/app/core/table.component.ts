import { Component, ElementRef, ViewChild } from "@angular/core";
import { Product } from "../model/product.model";
import { Model } from "../model/repository.model";
import { ActivatedRoute } from "@angular/router";
// import { HighlightTrigger } from "./table.animations";
// import { setPropertiesFromClasses, stateClassMap } from "./animationUtils";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";


@Component({
    selector: "paTable",
    templateUrl: "table.component.html",
    // animations: [HighlightTrigger]
})
export class TableComponent {

    category: string | null = null;
    dataSource: MatTableDataSource<Product>;

    constructor(private model: Model, activedRoute: ActivatedRoute) {
        activedRoute.params.subscribe(params => {
            this.category = params["category"] || null;
        });

        this.dataSource = new MatTableDataSource<Product>();
        this.model.getProductsObservable().subscribe(newData => {
            this.dataSource.data = newData;
        })
    }

    getProduct(key: number): Product | undefined {
        return this.model.getProduct(key);
    }


    // getProducts(): Product[] {
    //     return this.model.getProducts();
    //     // .filter(p => this.category == null || p.category == this.category)
    // }

    getProducts(): MatTableDataSource<Product> {
        return this.dataSource;
    }

    // get categories(): (string)[] {
    //     return (this.model.getProducts()
    //         .map(p => p.category)
    //         .filter((c, index, array) => c != undefined
    //             && array.indexOf(c) == index)) as string[];

    // }

    deleteProduct(key?: number) {
        if (key != undefined) {
            this.model.deleteProduct(key);
        }
    }

    colsAndRows: string[] = ['id', 'name', 'category', 'price', 'details', 'buttons'];

    // highlightCategory: string = "";


    // getRowState(category: string | undefined, elem: HTMLTableRowElement): string {
    //     let state = this.highlightCategory == "" ? "" :
    //         this.highlightCategory == category ? "selected" : "notselected"
    //     if (state != "") {
    //         setPropertiesFromClasses(state, elem);
    //     }
    //     return state;
    // }

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

}