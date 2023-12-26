import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TableModule } from 'primeng/table';
import { ApplicationState, listFeature } from '../store/featuers';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CommonModule,
    ProgressSpinnerModule,
    TableModule
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class ListComponent {
  list$ = this.store.select(listFeature.selectListState);

  constructor(
    private store: Store<ApplicationState>,
  ) { }
}
