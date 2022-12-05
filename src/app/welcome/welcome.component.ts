import { Component, OnInit } from '@angular/core';
import { LoginGuardService } from '../services/login-guard.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  public loginForm!: FormGroup;

  constructor(private authenticationService: LoginGuardService) { }

  ngOnInit(){
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }
  public onSubmit() {
    this.authenticationService.login(
      this.loginForm.get('username')!.value,
      this.loginForm!.get('password')!.value
    );
  }
}
