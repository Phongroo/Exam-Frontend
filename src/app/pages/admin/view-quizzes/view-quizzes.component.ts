import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit{
  quizzes:any;
    
  constructor(private quizservice:QuizService){}
  ngOnInit(): void {
    this.quizservice.quizzes().subscribe(
      (data:any)=>{
        this.quizzes=data;
        console.log(this.quizzes);
      },(error)=>{
        console.log(error);
        Swal.fire('Error !','Error in loading data !','error');
        
      }
    )
  }
  deleteQuiz(qId:any){
    Swal.fire({
      icon:'info',
      title:'Are you sure?',
      confirmButtonText:'Delete',
      showCancelButton:true,
    }).then((result)=>{
      if(result.isConfirmed){
        this.quizservice.deleteQuiz(qId).subscribe(
          (data)=>{
            this.quizzes=this.quizzes.filter((quiz:any)=>quiz.qId!=qId);
            Swal.fire('Success!!','Quiz delete','success');
          },(error)=>{
            Swal.fire('Error!!','Quiz delete fail','error');
          }
        );
      }
    })
  }


}
