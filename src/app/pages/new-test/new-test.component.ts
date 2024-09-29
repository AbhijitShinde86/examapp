import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GuidGenerator } from 'src/app/helper/guidGenerator';
import { Test } from 'src/app/models/test.model';
import { QuestionService } from 'src/app/services/question.service';
import { TestService } from 'src/app/services/test.service';

@Component({
  selector: 'app-new-test',
  templateUrl: './new-test.component.html',
  styles: [
  ]
})
export class NewTestComponent implements OnInit {
  dataSub : Subscription;
  saveSub : Subscription;

  questions: any = []; testData : Test = null; curIndex = 0; curQuestion = null;
  attemptedQuestions = []; attemptedQuestionCount = 0; correctAnsweredCount = 0;

  constructor(private questionService:QuestionService, private testService : TestService){

  }


  async ngOnInit(): Promise<void> {
    await this.getQuestionsData();
  }

  onSubmitClick(){
    if(this.curQuestion.answer){
      this.addAttemptedQuestion(this.curQuestion);
      this.testData = {
        id:GuidGenerator.newGuid(),
        questions: this.addAttemptedQuestion,
        attemptedQuestion: this.attemptedQuestionCount,
        correctAnswered: this.correctAnsweredCount,
        result: this.correctAnsweredCount >= 7 ? "Pass" : "Fail"
      };
      this.saveSub = this.testService.addItem(this.testData).subscribe(
        resData => console.log("Saved"),
        error => console.log(error)
      );
      this.curIndex +=1;
      // console.log(this.testData);

    }
    else{
      alert("Select one option")
    }
  }

  setQuestion(){
    this.curQuestion = this.questions[this.curIndex];
  }

  async getQuestionsData(){
    this.dataSub = await this.questionService.getList().subscribe(
      resData => { 
        this.questions = resData.map( item => item = { ...item, answer: null }); 
        if(this.questions.length > 0){
          this.setQuestion();
        }
      } , 
      error => { console.log(error); }
    )
  }

  getOptionName(value){
    return value ? "Yes" : "No";
  }

  onNextClick(){
    console.log(this.curQuestion);
    if(this.curQuestion.answer != null){
      this.curIndex +=1;
      this.addAttemptedQuestion(this.curQuestion);
      this.setQuestion();
    }
    else{
      alert("Select one option for Next or click on Skip")
    }
  }

  addAttemptedQuestion(question){
    this.attemptedQuestions.push(question);
    this.attemptedQuestionCount +=1;
    this.correctAnsweredCount += question.answer == question.correctanswer ? 1 : 0;
  }

  onSkipClick(){
    this.curIndex +=1;
    this.setQuestion();
  }

  ngDeatory(){
    if(this.dataSub){
      this.dataSub.unsubscribe();
    }
    if(this.saveSub){
      this.saveSub.unsubscribe();
    }    
  }

}