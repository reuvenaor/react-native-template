import {AnyAction} from 'redux';

// Define the initial state of the profile
interface ProfileState {
  name: string;
  id: string;
}

const initialState: ProfileState = {
  name: '',
  id: '',
};

// Define action types
const SET_PROFILE = 'SET_PROFILE';
const UPDATE_PROFILE = 'UPDATE_PROFILE';

// Define the profile reducer
const profileReducer = (
  state = initialState,
  action: AnyAction,
): ProfileState => {
  switch (action.type) {
    case SET_PROFILE:
      return {
        ...state,
        ...action.payload,
      };
    case UPDATE_PROFILE:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default profileReducer;
