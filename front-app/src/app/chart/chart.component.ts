import { Component, OnInit } from '@angular/core';
import { ChartService } from '../chart.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  baseUrlLocal = "http://localhost";
  baseUrlProd = "http://172.16.60.34"
   labels :[]=[]
   value :[]=[]


  public pieChartLabels = this.labels
  public pieChartData = this.value
  public pieChartType = 'pie';





  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
  ];

  constructor(private chartservice : ChartService) { }

  ngOnInit() {
this.getEncData()
this.getNames()
  }

 async getEncData(){
var count = 0
var obj : {}
 var array : any[] = []
var a : String
const data =  await (this.chartservice.getEncadreur())
for (let  name of data as any) {
  count = 0
    a= name;
     for (let item of data ){
       if(item == a){
           count++

       }

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

 async getNames(){



    var data = await this.getEncData()
   console.log(data)

    for (let  item in data){
      //  console.log()
        this.labels.push(data[item].name)
        this.value.push(data[item].number)

    }
    console.log(this.labels)
    console.log(this.value)

  }




}
