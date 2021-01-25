import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'searchFilter' })
export class SearchFilterPipe implements PipeTransform {
  /**
   * Transform
   *
   * @param {any[]} items
   * @param {string} searchText
   * @returns {any[]}
   */
  transform(items: any[], searchText: string,searchField: any): any[] {
    if (!items) {
      return [];
    }
    if (!searchText || searchText == "") {
      return items;
    }
    return items.filter(it => {
      if(searchField == 'launch_year'){
        return it[searchField].includes(searchText);
      }else{
        return it.toLocaleLowerCase().includes(searchText.toLocaleLowerCase());
      }
    });
  }
}