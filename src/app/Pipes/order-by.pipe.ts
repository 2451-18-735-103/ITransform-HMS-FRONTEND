import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {
  transform(array: any[], field: string, reverse: boolean = false): any[] {
    if (!array || !field) {
      return array;
    }

    array.sort((a: any, b: any) => {
      const x = a[field];
      const y = b[field];
      return x < y ? -1 : x > y ? 1 : 0;
    });

    if (reverse) {
      array.reverse();
    }

    return array;
  }
}
