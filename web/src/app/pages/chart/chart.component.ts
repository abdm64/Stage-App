import { Component, OnInit } from '@angular/core';
import { ChartService } from '../../services/chart.service';
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
  pieDep : Chart;
  pieSec : Chart;
  pieType : Chart;
  bar : Chart;
  ict_unit = [];
  efficiency = [];
   coloR = [];
  enc : any
  sec : any
  type : any
  dateFin : any
  dateDebut : any

   currectYear = 'ALL'
   cols = 2







  constructor(private chartservice : ChartService) { }

  ngOnInit() {

    this.cols = (window.innerWidth <= 600) ? 1 : 2;

this.getDatas(0)

  }
  onResize(event) {
    this.cols = (event.target.innerWidth <= 600) ? 1 : 2;
  }
  getDataPerYear(year){


    if ( year == 'ALL') {
      this.getDatas(0)
    } else {

      this.getDatas(year)
    }

  }

  getYearsArray(){
    let stageYear = 2019
    let arrayYears  = ['ALL',stageYear]
    let currectYear = new Date().getFullYear()
    while (currectYear -stageYear > 0){
      stageYear++
      arrayYears.push(stageYear)

    }

return arrayYears

  }

async getDatas(year){


    try {
       this.enc = await this.chartservice.getEncadreur(year)
      this.sec = await this.chartservice.getEncadreurSec(year)
       this.type = await this.chartservice.getTypes(year)
     this.dateFin = await this.chartservice.getDateFin(year)
      this.dateDebut = await this.chartservice.getDateDebut(year)



      this.createPieDep(this.enc,"enc", "Nombre de stagiaires par département")
      this.createPieSec(this.sec,"sector","Nombre de stagiaires par secteur")
       this.createPieType(this.type,"type","Nombre de stagiaires par type de stage")
      this.createBar(this.dateFin,this.dateDebut,'date',"Suivi des stagiaires par mois")


    } catch (err) {



      console.log(err)
    }



  }



  createBar(dateFin,dateDebut, name,title){

  let dataMonth = Object.keys(dateFin)
  let dateVlaueFin = Object.values(dateFin)

  let dateVlaueDebut = Object.values(dateDebut)

   if(this.bar) this.bar.destroy();

   this.bar = new Chart(name,{
      type: 'bar',
      data: {
          datasets: [{
              label: 'Date de fin',
              data: dateVlaueFin,
              backgroundColor: '#86C7F3',
              borderColor: '#5EB4EF'


          }, {
              label: 'Date de debut',
              data: dateVlaueDebut,
              backgroundColor: '#FFA1B5',
              borderColor: '#FF829C',

              type: 'bar'
          }],
          labels: dataMonth
      },



      options:{
        title:{
          text:title,
          display:true,
          fontSize:20,
          fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",

        },
      responsive: true,

      }





    });

  }




 getRandomColor(data : any){
 var  dynamicColors = function() {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    return "rgb(" + r + "," + g + "," + b + ",0.3)";
 };
  for (var i in data) {
    this.ict_unit.push("ICT Unit " + data[i].ict_unit);
    this.efficiency.push(data[i].efficiency);
    this.coloR.push(dynamicColors());
  }


 }



 createPieDep(data1,nameChart,title){

  let dataNum = Object.values(data1)
  let dataLabl = Object.keys(data1)
  this.getRandomColor(dataNum)

  if (this.pieDep) this.pieDep.destroy()

this.pieDep =  new Chart(nameChart,{
    type:'pie',
data :{

 labels:dataLabl,

  datasets:[{

    data: dataNum,

   backgroundColor: this.coloR,
    borderColor: this.coloR,

      hoverBackgroundColor: this.coloR,

    borderWidth :1
  }]
},
options:{

  title:{
    text:title,
    display:true,
    fontSize:20,
    fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif"
  },
  responsive: true,

  legend: {
    display: false
},

}
  },

  );

//


}
//Sector
createPieSec(data1,nameChart,title){

  let dataNum = Object.values(data1)
  let dataLabl = Object.keys(data1)

  this.getRandomColor(dataNum)

 if (this.pieSec) this.pieSec.destroy()

this.pieSec =  new Chart(nameChart,{
    type:'pie',
data :{

 labels:dataLabl,
  datasets:[{

    data: dataNum ,

   backgroundColor: this.coloR,
    borderColor: this.coloR,

      hoverBackgroundColor: this.coloR,

    borderWidth :1
  }]
},
options:{
  title:{
    text:title,
    display:true,
    fontSize:20,
    fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif"
  },
  responsive: true,

}
  });

//


}
//Types
createPieType(data1,nameChart,title){

  let dataNum = Object.values(data1)
  let dataLabl = Object.keys(data1)

  this.getRandomColor(dataNum)

 if (this.pieType) this.pieType.destroy()

this.pieType =  new Chart(nameChart,{
    type:'pie',
data :{

 labels:dataLabl,
  datasets:[{

    data: dataNum ,

   backgroundColor: this.coloR,
    borderColor: this.coloR,

      hoverBackgroundColor: this.coloR,

    borderWidth :1
  }]
},
options:{
  title:{
    text:title,
    display:true,
    fontSize:20,
    fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif"
  },
  responsive: true,

}
  });

//


}


















}//class
