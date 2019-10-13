import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(students: Array<any> , ...term: any): any {

    //check search if undefined
    if (term === undefined) return null ;
    //reuren the updated students

    return students.filter(function(student){

      return null
    })

  }

}
