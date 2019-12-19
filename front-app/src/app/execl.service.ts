import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { HttpClient, HttpHeaders } from '@angular/common/http';


const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable()
export class ExcelService {

  baseUrlLocalp = "http://localhost:3000/api/";
  baseUrlLocal = "http://172.16.60.36:3000/api/"
  constructor(private http:HttpClient) { }
  setHeader(){

    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    headers = headers.set('authorization', 'Bearer ' + localStorage.getItem("token"));
    return headers
  }

  exportEx(gte:String , lte:String){

     this.http.get(this.baseUrlLocal+'students/data/date/'+gte+'/'+lte,  { headers: this.setHeader() })
     .subscribe(
       (data: any)  => {



       this.exportAsExcelFile(data.students,'stagetest')





        },

        error  => {

        console.log("error", error);

        }
    );




  }







  public exportAsExcelFile(json: any[], excelFileName: string): void {
   // console.log(json)

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
   // console.log('worksheet',worksheet);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    //const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }

}
