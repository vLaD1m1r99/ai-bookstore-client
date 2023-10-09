import { createActionGroup, props } from '@ngrx/store';
import { UserInterface } from 'src/app/shared/types/user.interface';

export const userActions = createActionGroup({
  source: 'user',
  events: {
    'Set user': props<{ user: UserInterface }>(),
    'Update user': props<{ user: Partial<UserInterface> }>(),
    'Clear user': props<{ access_token: string }>(),
  },
});
