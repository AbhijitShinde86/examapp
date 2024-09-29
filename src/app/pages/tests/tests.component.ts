import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TestService } from 'src/app/services/test.service';

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styles: [
  ]
})
export class TestsComponent implements OnInit {
  dataSub : Subscription

  dtData: any = [];

  constructor(private router:Router, private testService : TestService){

  }


  async ngOnInit(): Promise<void> {
    await this.getData();
  }

  async getData(){
    this.dataSub = await this.testService.getList().subscribe(
      resData => { console.log(resData); this.dtData = resData; } , 
      error => { console.log(error); }
    )
  }

  addNewTest(){
    this.router.navigate(['/new']);
  }

  ngDeatory(){
    if(this.dataSub){
      this.dataSub.unsubscribe();
    }
  }

}
