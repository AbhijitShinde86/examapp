import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable, of } from "rxjs";
import { Test } from '../models/test.model.js'

@Injectable({providedIn:'root'})
export class TestService {
    private items: Test[] = [];  // Empty array to simulate empty JSON file

    constructor(private http : HttpClient){}         
         
    getList(){
        return of(this.items); 
    }    

    addItem(item: Test): Observable<Test> {
        this.items.push(item);
        return of(item);  // Simulate a response from an API
    }
}
