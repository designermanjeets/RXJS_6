import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { RxjsService } from './rxjs.service';

import { Observable, Subject, ReplaySubject, from, of, range, timer, interval } from 'rxjs';
import { map, filter, switchMap, combineLatest, tap, exhaustMap, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  profileForm: FormGroup;
  savedFormVal: any;

  constructor(
    private fb: FormBuilder,
    private _ss: RxjsService
  ) {

  }

  ngOnInit(): void {

    this.profileForm = this.fb.group({
      firstName : [''],
      lastName  : [''],
    });

    this.profileForm.valueChanges.subscribe(newVal => {
      if (newVal) {
        this._ss.changeFormData(true);
      }
    });

    const result = this._ss.currentFormData.pipe(mergeMap((newVal) => of(newVal)));

    result.subscribe(newVal => {
       if (newVal) {
         console.log(newVal);
        } else {
          this.onCancel();
        }
    });

  }

  onCancel() {
    this.profileForm.reset({
      firstName : this.savedFormVal && this.savedFormVal.firstName,
      lastName  : this.savedFormVal && this.savedFormVal.lastName
    });
  }

  ngOnDestroy(): void {

  }


  onSubmit() {
    // TODO: Use EventEmitter with form value
    // console.warn(this.profileForm.value);
    this.savedFormVal = this.profileForm.value;
    this._ss.changeFormData(false);
  }

}
