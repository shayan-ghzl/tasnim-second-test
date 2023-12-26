import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { ITax } from "../shared/models/list";

export const ListActions = createActionGroup({
    source: 'List',
    events: {
        'Fire Effect': emptyProps(),
        'Set List': props<{ list: ITax[]; }>(),
    },
});

export const LoadingActions = createActionGroup({
    source: 'Loading',
    events: {
        'Loading': props<{ status: boolean; }>(),
    },
});