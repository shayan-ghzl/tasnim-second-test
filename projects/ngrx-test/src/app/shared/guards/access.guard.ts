import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { ListActions, LoadingActions } from '../../store/actions';
import { ApplicationState } from '../../store/featuers';
import { ApiService } from '../services/api.service';
import { AuthStatus, StorageService } from '../services/storage.service';

export const accessGuard: CanActivateFn = (route, state) => {
  const storageService = inject(StorageService);
  const apiService = inject(ApiService);
  const router = inject(Router);
  const store = inject(Store<ApplicationState>);

  if (storageService.authenticationStatus === AuthStatus.pending) {
    const tokenFromLocalStorage = storageService.getMainToken();
    if (tokenFromLocalStorage) {
      storageService.token = tokenFromLocalStorage;
      return apiService.getList({
        filter: '',
        order: '',
        distinct_fields: '',
        page: 1,
        take: 100
      }).pipe(
        map(response => {
          store.dispatch(LoadingActions.loading({ status: false }));
          if (response) {
            storageService.authenticationStatus = AuthStatus.passes;
            store.dispatch(ListActions.setList({ list: response.results }));
            return true;
          }
          storageService.removeMainToken();
          storageService.token = null;
          storageService.authenticationStatus = AuthStatus.reject;
          router.navigateByUrl('/login');
          return false;
        })
      );

    } else {
      store.dispatch(LoadingActions.loading({ status: false }));
      storageService.authenticationStatus = AuthStatus.reject;
      router.navigateByUrl('/login');
      return false;
    }
  } else if (storageService.authenticationStatus === AuthStatus.passes) {
    return true;
  } else {
    // auth set to reject
    router.navigateByUrl('/login');
    return false;
  }
  
};
