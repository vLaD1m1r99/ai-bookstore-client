import { createFeature, createReducer, on } from '@ngrx/store';
import { userActions } from './user.actions';
import { UserStateInterface } from '../../types/userState.interface';
import { UserInterface } from '../../types/user.interface';

const initialState: UserStateInterface = {
  user: null,
};

const userFeature = createFeature({
  name: 'user',
  reducer: createReducer(
    initialState,
    on(userActions.setUser, (state, { user }) => ({ ...state, user })),
    on(userActions.updateUser, (state, { user }) => ({
      ...state,
      user: { ...(state.user as UserInterface), ...user },
    })),
    on(userActions.clearUser, (state) => ({
      ...state,
      user: null,
    }))
  ),
});

export const {
  name: userFeatureKey,
  reducer: userReducer,
  selectUser,
} = userFeature;
