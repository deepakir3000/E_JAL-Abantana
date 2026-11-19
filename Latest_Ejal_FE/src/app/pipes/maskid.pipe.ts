import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'maskId'
})
export class MaskIdPipe implements PipeTransform {
  transform(value: number): string {
    if (!value) {
      return value.toString();
    }
    const idStr = value.toString();
    const stars = '****' + '*'.repeat(idStr.length - 1);
    return stars + idStr.slice(-1);
    // const stars = '****' + '*'.repeat(Math.max(1, idStr.length - 1));
    // return stars + idStr.slice(-1);
  }
}
