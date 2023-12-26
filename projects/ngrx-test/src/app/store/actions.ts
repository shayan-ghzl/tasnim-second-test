import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { ITax } from "../shared/models/list";

export const ListActions = createActionGroup({
    source: 'List',
    events: {
        'Fire Effect': emptyProps(),
        'Set List': props<{ list: ITax[]; }>(),
        'Remove Item': props<{ id: number; }>(),
        'Update Item': props<{ item: ITax; }>(),
        'Add Item': props<{ item: ITax; }>(),
    },
});

export const LoadingActions = createActionGroup({
    source: 'Loading',
    events: {
        'Loading': props<{ status: boolean; }>(),
    },
});