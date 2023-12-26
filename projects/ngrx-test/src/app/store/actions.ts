import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Uom } from "../shared/models/list";

export const ListActions = createActionGroup({
    source: 'List',
    events: {
        'Fire Effect': emptyProps(),
        'Set List': props<{ list: Uom[]; }>(),
        'Remove Item': props<{ id: number; }>(),
        'Update Item': props<{ item: Uom; }>(),
        'Add Item': props<{ item: Uom; }>(),
    },
});

export const LoadingActions = createActionGroup({
    source: 'Loading',
    events: {
        'Loading': props<{ status: boolean; }>(),
    },
});