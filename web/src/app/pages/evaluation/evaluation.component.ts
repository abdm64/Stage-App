import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/students.service';
import { NgForm} from '@angular/forms';
import {  ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.scss']
})
export class EvaluationComponent implements OnInit {
  id : number = parseInt(this.router.snapshot.queryParamMap.get('id'))
  name: string = this.router.snapshot.queryParamMap.get('name')
  prenome: string = this.router.snapshot.queryParamMap.get('name')
  random : string = window.location.hash.substr(1);
  randomHash = {
    id : this.id.toString(),
    random : this.random
  }


  constructor( public studentService : StudentService, private router: ActivatedRoute, private route : Router) {


   }


 async  ngOnInit() {

    const compare = await  this.getUrl()
    if (!compare) {
      this.route.navigate(['/thank'])
    }
  





  }

  evaluat(eva : NgForm){
    const evaluation = eva.value
    evaluation.matricule = this.id


    this.studentService.sendEvaluation(evaluation, this.name,this.id)

  }

getName(){

       this.studentService.getSudentById(this.id)
         .subscribe((data) => {
           const fullName = data['doc']

            this.name = fullName.nom
            this.prenome = fullName.prenom

         });



  }

  async getUrl() : Promise<boolean>{
    const data = await this.studentService.getUrl(this.id)
    const randomHash = data.doc;
    
    this.name = randomHash.lastName
    this.prenome = randomHash.firstName





    return (randomHash.id === this.randomHash.id && randomHash.random === this.randomHash.random)

  }




}
