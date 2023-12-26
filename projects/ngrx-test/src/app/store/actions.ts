import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Tax } from "../shared/models/list";

export const ListActions = createActionGroup({
    source: 'List',
    events: {
        'Fire Effect': emptyProps(),
        'Set List': props<{ list: Tax[]; }>(),
        'Remove Item': props<{ id: number; }>(),
        'Update Item': props<{ item: Tax; }>(),
        'Add Item': props<{ item: Tax; }>(),
    },
});

export const LoadingActions = createActionGroup({
    source: 'Loading',
    events: {
        'Loading': props<{ status: boolean; }>(),
    },
});