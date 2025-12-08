import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VariableService {

  selectedId = signal<number | null>(null);
  constructor() { }
  editDynamic(data: any) {
    if (data != null) {
      this.selectedId.update(() => data);
    }
    else {
      this.selectedId.update(() => null);

    }
  }

}
