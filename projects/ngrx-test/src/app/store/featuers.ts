import { ActionReducerMap, createFeature, createReducer, on } from "@ngrx/store";
import { ITax } from "../shared/models/list";
import { ListActions, LoadingActions } from "./actions";


export interface ApplicationState {
    list: ITax[] | null;
    loading: boolean;
}

const listInitialState: ITax[] | null = null;

export const listFeature = createFeature({
    name: 'list',
    reducer: createReducer(
        listInitialState as ITax[] | null,
        on(ListActions.setList, (state, prop) => prop.list),
    ),
});

const LoadingInitialState = true;

export const LoadingFeature = createFeature({
    name: 'loading',
    reducer: createReducer(
        LoadingInitialState,
        on(LoadingActions.loading, (state, prop) => prop.status),
    ),
});

// Top Level Reducer
export const reducers: ActionReducerMap<ApplicationState> = {
    [listFeature.name]: listFeature.reducer,
    [LoadingFeature.name]: LoadingFeature.reducer
};
