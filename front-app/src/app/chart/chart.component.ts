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
   ict_unit = [];
  efficiency = [];
   coloR = [];









  constructor(private chartservice : ChartService) { }

  ngOnInit() {

this.getDatas()

  }

async getDatas(){


    try {
      let enc = await this.chartservice.getEncadreur()
      let sec = await this.chartservice.getEncadreurSec()
      let type = await this.chartservice.getTypes()
     let dateFin = await this.chartservice.getDateFin()
     let dateDebut = await this.chartservice.getDateDebut()



      this.createPie(enc,"enc", "Nombre de stagiaires par département")
      this.createPie(sec,"sector","Nombre de stagiaires par secteur")
       this.createPie(type,"type","Nombre de stagiaires par type de stage")
      this.createBar(dateFin,dateDebut,'date',"Suivi des stagiaires par mois")


    } catch (err) {



      console.log(err)
    }


  }



  createBar(dateFin,dateDebut, name,title){

  let dataMonth = Object.keys(dateFin)
  let dateVlaueFin = Object.values(dateFin)

  let dateVlaueDebut = Object.values(dateDebut)

    this.PieChart = new Chart(name,{
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
          fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif"
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



 createPie(data1,nameChart,title){
  let dataNum = Object.values(data1)
  let dataLabl = Object.keys(data1)

  this.getRandomColor(dataNum)
  //const f = await console.log(this.labelsSec)
  this.PieChart =  new Chart(nameChart,{
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












}


















}
