import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { AuthService } from './core/services/auth.service';
import { take } from '../../node_modules/rxjs/operators';
import { ErrorService } from './core/services/error.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
  `
})
export class AppComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private errorService: ErrorService,
    private snackBar: MatSnackBar
    
  ){}

  ngOnInit() {
    this.authService.autoLogin()
    .pipe(take(1))
    .subscribe(
      null,
      error => {
        const message = this.errorService.getErrorMessage(error);
        this.snackBar.open(
          'Unexpected error: ${message}',
          'Done',
          {duration: 5000, verticalPosition:'top'}
        );
      }
    );
  }
}
