import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Question } from '../models/question.model.js'

@Injectable({providedIn:'root'})
export class QuestionService {
    private questionFileUrl = 'assets/data/questions.json';

    constructor(private http : HttpClient){}         
         
    getList(){
        return this.http.get<any[]>(this.questionFileUrl);
    }    
}
