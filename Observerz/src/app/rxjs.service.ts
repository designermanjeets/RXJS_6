import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class RxjsService {

  constructor() { }

  private formdata = new BehaviorSubject(null);
  currentFormData = this.formdata.asObservable();
  changeFormData(data: any) {
    this.formdata.next(data);
  }

}
