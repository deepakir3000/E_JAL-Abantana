import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {
  transform(value: any): string {
    if (!value) return ''; // Check if value is null or undefined

    const date = new Date(value);
    const day: number = date.getDate();
    const month: number = date.getMonth() + 1; // Months are zero-based
    const year: number = date.getFullYear();

    // Ensure leading zeros for day and month if necessary
    const formattedDay: string = day < 10 ? `0${day}` : `${day}`;
    const formattedMonth: string = month < 10 ? `0${month}` : `${month}`;

    return `${formattedDay}-${formattedMonth}-${year}`;
  }

}