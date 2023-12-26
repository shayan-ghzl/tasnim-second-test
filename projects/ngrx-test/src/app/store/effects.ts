import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import { ApiService } from '../shared/services/api.service';
import { ListActions } from './actions';

@Injectable()
export class ListEffect {
    
    startUser$ = createEffect(() => {
        return this.action$.pipe(
            ofType(ListActions.fireEffect),
            switchMap(() => this.apiService.getList({
                filter: '',
                order: '',
                distinct_fields: '',
                page: 1,
                take: 100
            }).pipe(
                map(response => {
                    if (response) {
                        return ListActions.setList({ list: response.results });
                    }
                    return ListActions.setList({ list: [] });
                }),
            ))
        );
    });

    constructor(
        private apiService: ApiService,
        private action$: Actions,
    ) { }

}