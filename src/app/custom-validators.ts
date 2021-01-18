import { AbstractControl } from "@angular/forms";

export class CustomValidators {
    static addition(target:string, ...sources:any) {

        return (form: AbstractControl) => {
            const sum = parseInt(form.value[target]);
            var actualSum = 0;

            for(let i = 0; i < sources.length; i++){
                actualSum += parseInt(form.value[sources[i]]);
            }

            if (actualSum == sum) {
                return null;
            }
            return { wrong_answer: true };
        }

    }


}
