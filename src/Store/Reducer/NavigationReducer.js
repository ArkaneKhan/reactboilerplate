import { AppContainer } from '../../AppNavigator';
import { REHYDRATE, PERSIST } from 'redux-persist';

const initialState = AppContainer.router.getStateForAction(AppContainer.router.getActionForPathAndParams('Language'));

export const navReducer = (state = initialState, action) => {
  switch (action.type) {
    case REHYDRATE:
      break
    case PERSIST:
      break
  }
  const nextState = AppContainer.router.getStateForAction(action, state);
  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
};
