import { Component } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
  selector: 'app-root',
  template: `
    <app-login></app-login>
  `
})
export class AppComponent {}
