import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { takeWhile } from '../../../../../node_modules/rxjs/operators';

import {AuthService} from '../../../core/services/auth.service';
import { ErrorService } from '../../../core/services/error.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  configs = {
    isLogin: true,
    actionText: 'SignIn',
    buttonActionText: 'Create account',
    isLoading: false
  };

  private nameControl = new FormControl('', [Validators.required, Validators.minLength(5)]);
  private alive = true;

  constructor(
    private authService: AuthService,
    private erroService: ErrorService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  onSubmit() {
    console.log(this.loginForm.value);

    const operation: Observable<any> =
    (this.configs.isLogin)
      ? this.authService.signinUser(this.loginForm.value)
      : this.authService.signupUser(this.loginForm.value);

    operation
    .pipe(
      takeWhile(() => this.alive)
    )
    .subscribe(
      res => {
        console.log('redirecting...', res);
      },
      err => {
        console.log(err);
        this.snackBar.open(this.erroService.getErrorMessage(err), 'Done', {duration: 5000, verticalPosition: 'top'});
      },
      () => console.log('Observable completed!')
    );
  }

  changeAction(): void {
    this.configs.isLogin = !this.configs.isLogin;
    this.configs.actionText = !this.configs.isLogin ? 'SignUp' : 'SignIn';
    this.configs.buttonActionText = !this.configs.isLogin ? 'Already have account' : 'Create account';
    !this.configs.isLogin ? this.loginForm.addControl('name', this.nameControl) : this.loginForm.removeControl('name');
  }

  get email(): FormControl { return <FormControl>this.loginForm.get('email'); }
  get password(): FormControl { return <FormControl>this.loginForm.get('password'); }
  get name(): FormControl { return <FormControl>this.loginForm.get('name'); }

  ngOnDestroy(): void {
    this.alive = false;
  }
}
