import { Component, OnInit } from '@angular/core';
import { ChartService } from '../chart.service';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  labelsEnc :string[]=[];
  valueEnc :number[]=[];
  labelsSec :string[]=[];
  valueSec :number[]=[];
  labelsDateDebut :string[]=[];
  valueDateDebut :number[]=[];
  labelsDateFin :string[]=[];
  valueDateFin :number[]=[];
  BarChart : any;
  PieChart : any;







//**************************bar2 */
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
 //public barChartLabels =  this.labelsDateDebut;
 public barChartLabels =  ['Janvier','Février','Mars','Avril', 'Mai','Juin','Juillet','Aout','Septembre','Octobre','Novembre','Décembre'];


  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    {data: this.valueDateDebut, label: 'Date Début'},
    //{data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
    {data: this.valueDateFin, label: 'Date Fin'}
  ];
  //****************************************************** */

  constructor(private chartservice : ChartService) { }

  async ngOnInit() {

    //bar with2 date debut
    const x = await this.getDateDebutData()
    const y = await this.getNamesDateDebut()
    const z = await console.log(this.labelsDateDebut)
    var arrl : any[] = this.labelsDateDebut
    var arrv : any[] = this.valueDateDebut


    for(let i =1 ; i<=12;i++){

          if(! arrl.some(e => e === i)){
              arrv.splice(i-1,0, 0)

              arrl.splice(i-1,0, i);


                                     }
                             }

            //  console.log(this.labelsDateDebut)
              //console.log(this.valueDateDebut)

 //bar with2 date fin
    const r = await this.getDateFinData()
    const s = await this.getNamesDateFin()
    const t = await console.log(this.labelsDateFin)
    var arrlf : any[] = this.labelsDateFin
    var arrvf : any[] = this.valueDateFin


    for(let i =1; i<=12;i++){

          if(! arrlf.some(e => e === i)){
              arrvf.splice(i-1,0, 0)

              arrlf.splice(i-1,0, i);



                                     }
                             }
           //   console.log(this.labelsDateFin)
            //  console.log(this.valueDateFin)
 //bar chart 1

    const d = await this.getSecData()
    const e =await this.getNamesSec()

    const c = await console.log(this.labelsSec)
    this.BarChart = await new Chart('barChart',{
      type:'bar',
  data :{
   // labels:["Red","Blue","Yellow","Green","purple","Orange"],
    labels:this.labelsSec,
    datasets:[{
      //label: '# of votes',
      //data:[9,7,3,5,2,10],
      data:this.valueSec,
      backgroundColor:[
        'rgba(255,99,132,0.2)',
        'rgba(54,162,235,0.2)',
        'rgba(255,206,86,0.2)',
        'rgba(75,192,192,0.2)',
        'rgba(135,102,255,0.2)',
        'rgba(255,159,64,0.2)',
      ],
      borderColor:[
        'rgba(255,99,132,0.2)',
        'rgba(54,162,235,0.2)',
        'rgba(255,206,86,0.2)',
        'rgba(75,192,192,0.2)',
        'rgba(135,102,255,0.2)',
        'rgba(255,159,64,0.2)',
      ],
      borderWidth :1
    }]
  },options:{
    title:{
      text:"",
      display:true
    },
    scales:{
      yAxes:[{
        ticks:{
          beginAtZero : true
        }
      }]
    }
  }
    });

    //********************pie chart */*
    const a = await this.getEncData()
    const b =await this.getNamesEnc()

    //const f = await console.log(this.labelsSec)
    this.PieChart = await new Chart('pieChart',{
      type:'pie',
  data :{
   // labels:["Red","Blue","Yellow","Green","purple","Orange"],
   labels:this.labelsEnc,
    datasets:[{
      //label: '# of votes',
      //data:[9,7,3,5,2,10],
      data:this.valueEnc,
     // backgroundColor:"rgba(255,99,132,0.4)",
     backgroundColor:
      [
       'rgba(255,99,132,0.2)',
        'rgba(54,162,235,0.2)',
        'rgba(255,206,86,0.2)',
        'rgba(75,192,192,0.2)',
        'rgba(135,102,255,0.2)',
        'rgba(255,159,64,0.2)',],
      borderColor:
      [
        'rgba(255,99,132,0.2)',
        'rgba(54,162,235,0.2)',
        'rgba(255,206,86,0.2)',
        'rgba(75,192,192,0.2)',
        'rgba(135,102,255,0.2)',
        'rgba(255,159,64,0.2)', ],
        hoverBackgroundColor: "rgba(255,99,132,0.2)",
        hoverBorderColor: "rgba(255,99,132,1)",
      borderWidth :1
    }]
  },
  options:{
    title:{
      text:"",
      display:true
    },
    responsive: false,
    //display: true
  }
    });



  }



 async getEncData(){
var count = 0
var obj : {}
 var array : any[] = []
var a : String

const data :any = await (this.chartservice.getEncadreur())
for (let  name of data) {
  count = 0
    a= name;
     for (let item of data ){
       if(item == a){
           count++  }

     }
     obj = {
      name : a,
      number : count
    }
array.push(obj)
}
//console.log(array)
let medios = array.reduce((c, n) =>
  c.find(el => el.name == n.name) ? c : [...c, n], []);
  //console.log(medios)
return medios

  }




 async getNamesEnc(){
   // tslint:disable-next-line: prefer-const
   const data = await this.getEncData()
  // console.log(data)

  for (let  item in data){

        this.labelsEnc.push(data[item].name)
        this.valueEnc.push(data[item].number)

    }
    //console.log(this.labelsEnc)
    //console.log(this.valueEnc)
  return true

  }

  ////////////////////////////////////////////////////////////////////
  async getSecData(){
    var count = 0
    var obj : {}
     var array : any[] = []
    var a : String

    const data :any = await (this.chartservice.getEncadreurSec())
    for (let  name of data) {
      count = 0
        a= name;
         for (let item of data ){
           if(item == a){
               count++  }

         }
         obj = {
          name : a,
          number : count
        }
    array.push(obj)
    }
    //console.log(array)
    let medios = array.reduce((c, n) =>
      c.find(el => el.name == n.name) ? c : [...c, n], []);
      //console.log(medios)
    return medios

      }




     async getNamesSec(){
       var data = await this.getSecData()
      // console.log(data)
      for (let  item in data){
          //  console.log()
            this.labelsSec.push(data[item].name)
            this.valueSec.push(data[item].number)

        }
        //console.log(this.labelsSec)
        //console.log(this.valueSec)
      return true

      }


      /////////////////////////////////////////////////////////////////////
       ////////////////////////////////////////////////////////////////////
  async getDateDebutData(){
    var count = 0
    var obj : {}
     var array : any[] = []
    var a : String

    const data :any = await (this.chartservice.getDateDebut())
    for (let  name of data) {
      count = 0
        a= name;
         for (let item of data ){
           if(item == a){
               count++  }

         }
         obj = {
          name : a,
          number : count
        }
    array.push(obj)
    }
    //console.log(array)
    let medios = array.reduce((c, n) =>
      c.find(el => el.name == n.name) ? c : [...c, n], []);
      //console.log(medios)
    return medios

      }
    async getNamesDateDebut(){
       var data = await this.getDateDebutData()
      // console.log(data)
      for (let  item in data){
          //  console.log()
            this.labelsDateDebut.push(data[item].name)
            this.valueDateDebut.push(data[item].number)

        }
       // console.log(this.labelsDateDebut)
        //console.log(this.valueDateDebut)
      return true

      }

       ////////////////////////////////////////////////////////////////////
  async getDateFinData(){
    var count = 0
    var obj : {}
     var array : any[] = []
    var a : String

    const data :any = await (this.chartservice.getDateFin())
    for (let  name of data) {
      count = 0
        a= name;
         for (let item of data ){
           if(item == a){
               count++  }

         }
         obj = {
          name : a,
          number : count
        }
    array.push(obj)
    }
    //console.log(array)
    let medios = array.reduce((c, n) =>
      c.find(el => el.name == n.name) ? c : [...c, n], []);
      //console.log(medios)
    return medios

      }
    async getNamesDateFin(){
       var data = await this.getDateFinData()
      // console.log(data)
      for (let  item in data){
          //  console.log()
            this.labelsDateFin.push(data[item].name)
            this.valueDateFin.push(data[item].number)

        }

      return true

      }
















}
