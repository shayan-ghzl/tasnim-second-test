import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { Subscription, finalize, tap } from 'rxjs';
import { ApiService } from '../shared/services/api.service';
import { AuthStatus, StorageService } from '../shared/services/storage.service';
import { ListActions } from '../store/actions';
import { ApplicationState } from '../store/featuers';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    PasswordModule,
    InputTextModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export default class LoginComponent {
  btnLoading = false;

  formGroup = new FormGroup({
    email: new FormControl({ value: '', disabled: false }, { validators: [Validators.required, Validators.maxLength(24)], nonNullable: true }),
    password: new FormControl({ value: '', disabled: false }, { validators: [Validators.required, Validators.maxLength(24)], nonNullable: true }),
  });

  subscription = new Subscription();

  constructor(
    private apiService: ApiService,
    private storageService: StorageService,
    private store: Store<ApplicationState>,
    private router: Router,
  ) { }

  @HostListener('document:keyup.enter')
  submit() {
    if (this.formGroup.invalid) {
      return;
    }
    this.btnLoading = true;

    this.subscription.add(
      this.apiService.login(this.formGroup.value as { email: string; password: string; }).pipe(
        tap((response) => {
          if (response) {
            this.storageService.token = response.access_token;
            this.storageService.authenticationStatus = AuthStatus.passes;
            this.storageService.setMainToken(response.access_token);
            this.store.dispatch(ListActions.fireEffect());
            this.router.navigateByUrl('/list');
          }
          // TODO: raise a toast
        }),
        finalize(() => {
          this.btnLoading = false;
        })
      ).subscribe()
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
