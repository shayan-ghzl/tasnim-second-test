import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ApplicationState, LoadingFeature } from './store/featuers';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ProgressSpinnerModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  loading$ = this.store.select(LoadingFeature.selectLoadingState);

  constructor(
    private store: Store<ApplicationState>,
  ) { }
}
