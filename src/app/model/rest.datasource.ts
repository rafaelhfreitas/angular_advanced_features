import { Injectable, Inject, InjectionToken } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, delay, Observable } from "rxjs";
import { Product } from "./product.model";

export const REST_URL = new InjectionToken("rest_url");

@Injectable()
export class RestDataSource {

    constructor(private http: HttpClient,
        @Inject(REST_URL) private url: string) { }

    getData(): Observable<Product[]> {
        // return this.http.get<Product[]>(this.url);
        // return this.sendRequest<Product[]>("GET", this.url)
        // return this.http.jsonp<Product[]>(this.url, "callback");
         return this.sendRequest<Product[]>("GET", this.url);
        // return this.sendRequest<Product[]>("GET", this.url).pipe(delay(2000));
    }

    saveProduct(product: Product): Observable<Product> {
        // return this.http.post<Product>(this.url, product);
        return this.sendRequest<Product>("POST", this.url, product);
    }

    updateProduct(product: Product): Observable<Product> {
        // return this.http.put<Product>(`${this.url}/${product.id}`, product);
        return this.sendRequest<Product>("PUT", `${this.url}/${product.id}`, product);
    }

    deleteProduct(id: number): Observable<Product> {
        // return this.http.delete<Product>(`${this.url}/${id}`);
        return this.sendRequest<Product>("DELETE", `${this.url}/${id}` );
    }


    private sendRequest<T>(verb: string, url: string, body?: Product) : Observable<T> {

        let myHeaders = new HttpHeaders();
        myHeaders = myHeaders.set("Access-key", "<secret>");
        myHeaders = myHeaders.set("Applications-Names", ["angularAdvanced", "proAngular"]);

        return this.http.request<T>(verb, url, {
            body: body,
            headers: myHeaders
            // headers: new HttpHeaders({
            //     "Access-key" : "<secret>",
            //     "Application-name": "angularAdvanced"
            // })
        }).pipe(catchError(( error: Response) => {
            throw(`Network Error: ${error.statusText} (${error.status})`)
        }))
        ;
    }


}