import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { delay, filter } from 'rxjs/operators';
import { CustomValidators } from '../custom-validators';
@Component({
  selector: 'app-equation',
  templateUrl: './equation.component.html',
  styleUrls: ['./equation.component.css']
})
export class EquationComponent implements OnInit {

  secondsPerSolution = 0;

  mathForm = new FormGroup({
    a: new FormControl(this.randomNumber()),
    b: new FormControl(this.randomNumber()),
    answer: new FormControl('')
  }, [CustomValidators.addition('answer', 'a', 'b')]);

  constructor() { }

  get a() {
    return this.mathForm.value.a;
  }
  get b() {
    return this.mathForm.value.b;
  }

  reset() {
    // to update all -- not works on singular
    // this.mathForm.setValue({
    //   a: this.randomNumber(),
    //   b: this.randomNumber(),
    //   answer: ''
    // });
    // if we need to update singular or some multiple values
    this.mathForm.patchValue({
      a: this.randomNumber(),
      b: this.randomNumber(),
      answer: ''
    });
    // this.mathForm.controls.a.setValue(this.randomNumber());      
    // this.mathForm.controls.b.setValue(this.randomNumber());      
    // this.mathForm.controls.answer.setValue('');
  }

  ngOnInit(): void {

    const startTime = new Date();

    let numberSolved = 0;

    this.mathForm.statusChanges.pipe(
      filter(value => value == 'VALID'),
      delay(100)).subscribe(value => {
        numberSolved++;
        this.secondsPerSolution = (
          new Date().getTime() - startTime.getTime()
        ) / numberSolved / 1000;
        this.reset();

      })
  }

  randomNumber() {
    return Math.floor(Math.random() * 10);
  }

}
