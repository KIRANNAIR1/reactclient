import {
  ALLOW_REGISTERATION,
  DISABLE_BALANCE_ON_ADD,
  DISABLE_BALANCE_ON_EDIT
} from '../actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case DISABLE_BALANCE_ON_ADD:
      return {
        ...state,
        disableBalanceOnAdd: action.payload
      };

    case DISABLE_BALANCE_ON_EDIT:
      return {
        ...state,
        disableBalanceOnEdit: action.payload
      };

    case ALLOW_REGISTERATION:
      return {
        ...state,
        allowRegisteration: action.payload
      };
    default:
      return state;
  }
}
