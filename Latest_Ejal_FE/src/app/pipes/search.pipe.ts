import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchText'
})
export class SearchPipe implements PipeTransform {
    transform(value: any, args?: any):any {
        if(!value) return null;
        if(!args) return value;

        // args = args.toLowerCase();
        console.log(args,'args');
        
        return value.filter((item: any)=>{
            return JSON.stringify(item.id).includes(args);
        })
    }
    // transform(items: any[], searchText: string): any[] {
    //     if (!items) return [];
    //     if (!searchText) return items;
    
    //     searchText = searchText.toLowerCase();
    //     return items.filter(item => {
    //       return item.id.toLowerCase().includes(searchText);
    //     });
    //   }
  
}
