import { Component, OnInit } from '@angular/core';
import { ProgramService } from 'src/app/shared/services/program.service';
import { programModel } from 'src/app/shared/models/programs.model';
import { FormControl, FormGroup, NgForm } from '@angular/forms';



@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.scss']
})
export class ProgramsComponent implements OnInit {
  Program:programModel[] = [];
  CreateProgramIndicator: boolean = false;
  UpdateProgramIndicator: boolean = false;

  CreateTrackIndicator: boolean = false;
  UpdateTrackIndicator: boolean = false;
  
  createForm:FormGroup;
  updateProgramF:FormGroup;
  


  constructor(private program:ProgramService ) { }

  ngOnInit(): void {

    this.program.getProgram().subscribe(eachP=> {
      this.Program = eachP;
      
    });
   
    this.formInitalize();
  }

  toCreateProgram() { 
    this.CreateProgramIndicator = true;
  
  } 

  toCancelOne() { 
    this.CreateProgramIndicator = false;
  } 

  toUpdateProgram(eachP:programModel) { 
    this.updateProgramF = new FormGroup({
      'id':new FormControl(eachP.id),
      'name':new FormControl(eachP.name),
      'isoCodeProgramNumber': new FormControl(eachP.isoCodeProgramNumber),
      
    });
    this.UpdateProgramIndicator = true;


  } 
  submitUpdP() {
    
    this.program.putProgram(this.updateProgramF.value).subscribe(updated=>{
      console.log(updated);
      this.UpdateProgramIndicator = false;
      this.ngOnInit();
    })
  }

  toCancelTwo() {
    this.UpdateProgramIndicator = false;
  }
  
  toCreateTrack() {
    this.CreateTrackIndicator = true;
  }

  toCancelThree() {
    this.CreateTrackIndicator = false;
  }

  toUpdateTrack() {
    this.UpdateTrackIndicator = true;
  }

  toCancelFour() {
    this.UpdateTrackIndicator = false;
  }
  formInitalize() {
    this.createForm = new FormGroup({
      'name': new FormControl('')
    });
  }
  onSubmitCreate(f:NgForm) {
    this.program.POSTProgram(f.value).subscribe(createdP=> {
      this.ngOnInit();
      this.CreateProgramIndicator = false;
    })
   
  }

  toDelete(programId:number) {
    this.program.deleteProgram(programId).subscribe(delP=> {
      
      console.log(delP);
      this.ngOnInit();
    })
   
  
  }
 
  createTrack(f:NgForm) {
    this.program.POSTtracks(f.value).subscribe(newTrack=> {
      this.ngOnInit();
      this.CreateTrackIndicator = false;
    })
  }
 

}
