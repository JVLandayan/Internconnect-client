import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { createAccount } from 'src/app/shared/services/createAcc.service';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.scss']
})
export class OnboardingComponent implements OnInit {

  email:string;
  resetKey:string;
  onboardForm:FormGroup;

  constructor(private account: createAccount,private router:Router,  private route: ActivatedRoute) { }
  
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.email = params['email'];
      this.resetKey = params['resetkey'];
      console.log(this.email);
      console.log(this.resetKey);
      this.initalizeForm();
  });
  }
  initalizeForm() {
      this.onboardForm = new FormGroup({
        "email":new FormControl(this.email.toLowerCase()),
        "resetkey":new FormControl(this.resetKey),
        "password":new FormControl(""),
        "confirmpassword":new FormControl("")
      });
  }
  onSubmit() {
    // console.log(f.value);
    //   this.account.resetPassword(f.value).subscribe(newUser=> {
    //     console.log(newUser);
    //   })
    const password = this.onboardForm.get('password').value;
    const confirmpassword = this.onboardForm.get('confirmpassword').value;

 
  
    if(password === confirmpassword){
      
        this.account.resetPassword(this.onboardForm.value).subscribe(resettedU=> {
         this.router.navigate(['/login']);
          
        })
    }
    
  }

}
