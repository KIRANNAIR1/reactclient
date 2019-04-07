import {
  ALLOW_REGISTERATION,
  DISABLE_BALANCE_ON_ADD,
  DISABLE_BALANCE_ON_EDIT
} from '../actions/types';

export const setDisableBalanceOnAdd = () => {
  // get settings from localstorage
  const settings = JSON.parse(localStorage.getItem('settings'));

  // Toggle
  settings.disableBalanceOnAdd = !settings.disableBalanceOnAdd;

  // set back to localstorage
  localStorage.setItem('settings', JSON.stringify(settings));

  return {
    type: DISABLE_BALANCE_ON_ADD,
    payload: settings.disableBalanceOnAdd
  };
};

export const setDisableBalanceOnEdit = () => {
  // get settings from localstorage
  const settings = JSON.parse(localStorage.getItem('settings'));

  // Toggle
  settings.disableBalanceOnEdit = !settings.disableBalanceOnEdit;

  // set back to localstorage
  localStorage.setItem('settings', JSON.stringify(settings));
  return {
    type: DISABLE_BALANCE_ON_EDIT,
    payload: settings.disableBalanceOnEdit
  };
};

export const setAllowRegisteration = () => {
  // get settings from localstorage
  const settings = JSON.parse(localStorage.getItem('settings'));

  // Toggle
  settings.allowRegisteration = !settings.allowRegisteration;

  // set back to localstorage
  localStorage.setItem('settings', JSON.stringify(settings));
  return {
    type: ALLOW_REGISTERATION,
    payload: settings.allowRegisteration
  };
};
