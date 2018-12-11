import {  ValidatorFn, FormGroup } from '@angular/forms';
import { Project } from '../models/project';


 export function createValidatorText(cntName: string, min: number, max: number,pattern?: RegExp): Array<ValidatorFn>  {
    return [
      f => !f.value ? { "val": `${cntName} is required` } : null,
      f => f.value && f.value.length > max ? { "val": `${cntName} is max ${max} chars` } : null,
      f => f.value && f.value.length < min ? { "val": `${cntName} is min ${min} chars` } : null,
      f=>f.value&&!pattern&&/[^a-zA-Z0-9_]/.test(f.value)?{"val":`${cntName} is contain sign chars`}:null ,
      f => pattern && f.value && !f.value.match(pattern) ? { "val": `${cntName} is not match pattern` } : null,
    ];
  }

  export function createValidatorNumber(cntName: string, min: number, max: number): Array<ValidatorFn>  {
    return [
      f => !f.value ? { "val": `${cntName} is required` } : null,
      f => f.value && Number( f.value) > max ? { "val": `${cntName} is max ${max} ` } : null,
      f => f.value && Number( f.value)< min ? { "val": `${cntName} is min ${min} ` } : null,
    ];
  }

  export function createValidatorDateBegin(cntName: string): Array<ValidatorFn>  {
    return [
      f => !f.value ? { "val": `${cntName} is required` } : null,
      f => f.value && new Date( f.value)<new Date()? { "val": `${cntName} is less than today ` } : null,
    ];
  }

 export function validateDateEnd(group: FormGroup) {
    var pw = group.controls['dateBegin'];
    var pw2 = group.controls['dateEnd'];
    if(pw&&pw2)
     pw.value > pw2.value?pw2.setErrors({'incorrect': "date end before/equal to date begin"}):pw2.clearValidators();
    return null;
  }

  export function validateSumHourForDepartment(group: FormGroup,project:Project) {
  
      let sum=0;
       project.hoursForDepartment.forEach(element => {
        sum+=element.sumHours; 
        return  sum >group.controls["numHourForProject"].value?group.controls["numHourForProject"].setErrors({'incorrect': "sum hours of department grade than hours of projects"})  :null;
      });
    }

    export function validatePassword(group: FormGroup) {
      var pw = group.controls['password'];
      var pw2 = group.controls['confirmPassword'];
      if(pw&&pw2)
       pw.value !=pw2.value?pw2.setErrors({'incorrect': "passwords not confirm"}):pw2.clearValidators();
      return null;
    }


  export  enum DepartmentEnum {
    MANAGER=1,
    TEAMLEADER=2,
    QA=3,
    UI=4,
    UX=5,
    DEVELOPMENT=6
}

  

