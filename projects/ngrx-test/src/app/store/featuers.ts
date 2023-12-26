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
        on(ListActions.removeItem, (state, prop) => {
            if (state) {
                return state.filter(p => p.id != prop.id);
            }
            return state;
        }),
        on(ListActions.updateItem, (state, prop) => {
            if (state) {
                return state.map(p => {
                    if (p.id === prop.item.id) {
                        return prop.item;
                    } else {
                        return p;
                    }
                });
            }
            return state;
        }),
        on(ListActions.addItem, (state, prop) => {
            if (state) {
                let isAdd = true;
                const updatedList = state.map(p => {
                    if (p.id == prop.item.id) {
                        isAdd = false;
                        return prop.item;
                    } else {
                        return p;
                    }
                });
                if (isAdd) {
                    updatedList.push(prop.item);
                }
                return updatedList;
            }
            return state;
        }),
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
