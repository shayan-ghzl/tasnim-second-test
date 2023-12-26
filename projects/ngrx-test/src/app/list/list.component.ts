import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TableModule } from 'primeng/table';
import { Subscription, tap } from 'rxjs';
import { ApiService } from '../shared/services/api.service';
import { ListActions } from '../store/actions';
import { ApplicationState, listFeature } from '../store/featuers';

export enum AddORUpdate {
  add = 1,
  update = 2
}

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    AsyncPipe,
    ProgressSpinnerModule,
    TableModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    ReactiveFormsModule
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class ListComponent implements OnDestroy {

  AddORUpdateState = 1;

  private _visible = false;
  public get visible(): boolean {
    return this._visible;
  }
  public set visible(v: boolean) {
    this.formGroup.reset();
    this._visible = v;
  }

  private _dialogSubmitButtonLoading = false;
  public get dialogSubmitButtonLoading(): boolean {
    return this._dialogSubmitButtonLoading;
  }
  public set dialogSubmitButtonLoading(v: boolean) {
    if (v) {
      this.formGroup.disable();
    } else {
      this.formGroup.enable();
    }
    this._dialogSubmitButtonLoading = v;
  }

  list$ = this.store.select(listFeature.selectListState);

  formGroup = new FormGroup({
    description: new FormControl({ value: '', disabled: false }, { validators: [Validators.required, Validators.maxLength(24)], nonNullable: true }),
  });

  subscription = new Subscription();

  constructor(
    private store: Store<ApplicationState>,
    private apiService: ApiService,
    private cdr: ChangeDetectorRef,
  ) { }

  updateItem(): void {
    this.subscription.add(
      this.apiService.patchListItem(35, {
        active: true,
        division_id: 5,
        uom: 'list',
        division_name: 'ok',
        uom_description: 'nothing 5005'
      }).pipe(
        tap(response => {
          if (response) {
            this.store.dispatch(ListActions.updateItem({ item: response }));
            this.visible = false;
          }
          this.dialogSubmitButtonLoading = false;
          this.cdr.markForCheck();
        })
      ).subscribe()
    );
  }

  addItem(): void {
    this.subscription.add(
      this.apiService.postListItem({
        active: true,
        division_id: 5,
        uom: 'hello world'
      }).pipe(
        tap(response => {
          if (response) {
            this.store.dispatch(ListActions.addItem({ item: response }));
            this.visible = false;
          }
          this.dialogSubmitButtonLoading = false;
          this.cdr.markForCheck();
        })
      ).subscribe()
    );
  }

  removeItem(id: number): void {
    this.subscription.add(
      this.apiService.deleteListItem(id).pipe(
        tap(response => {
          if (response) {
            this.store.dispatch(ListActions.removeItem({ id: response.id }));
          }
        })
      ).subscribe()
    );
  }

  @HostListener('document:keyup.enter')
  submit(status: AddORUpdate): void {
    if (this.formGroup.invalid || this.dialogSubmitButtonLoading) {
      return;
    }
    this.dialogSubmitButtonLoading = true;
    if (status === AddORUpdate.add) {
      this.addItem();
    } else if (status === AddORUpdate.update) {
      this.updateItem();
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
