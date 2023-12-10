import { getAuthToken } from "../api/anilist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import createDataContext from "./createDataContext";
import { router } from "expo-router";
import { ROUTES } from "../constants/Routes";
import {
  REDUCER_ACTION,
  SETTINGS_KEYS,
  SETTINGS_REDUCER_ACTION,
} from "../constants/constants";
import { AnyProps } from "../types/AnyProps";
import { getSettingsObject } from "../utils/utils";

const initial_state = {
  isDark: true,
};

interface SettingsState {
  isDark: boolean;
}

type ACTION_TYPE = "update_setting" | "reset";

interface SettingsAction {
  type: ACTION_TYPE;
  payload: AnyProps;
}

const settingsReducer = (state: SettingsState, action: SettingsAction) => {
  switch (action.type) {
    case SETTINGS_REDUCER_ACTION.UPDATE:
      return {
        ...state,
        [action.payload.key]: `${action.payload.value}`,
      };
    case SETTINGS_REDUCER_ACTION.SET:
      return action.payload;
    default:
      return state;
  }
};

const updateSettings = (dispatch: Function) => {
  return async (payload: { key: string; value: string }) => {
    try {
      dispatch({ type: SETTINGS_REDUCER_ACTION.UPDATE, payload });
      await AsyncStorage.setItem(payload.key, `${payload.value}`);
    } catch (err) {
      console.log(err);
    }
  };
};

const setSettings = (dispatch: Function) => {
  return async (payload: SettingsState) => {
    const prefs = Object.keys(payload);
    const values = await AsyncStorage.multiGet(prefs);
    let new_prefs = getSettingsObject(values);
    dispatch({ type: SETTINGS_REDUCER_ACTION.SET, new_prefs });
  };
};

const initializeSettings = (dispatch: Function) => {
  return async () => {
    try {
      const prefs = Object.keys(SETTINGS_KEYS).map(
        (item) => SETTINGS_KEYS[item]
      );
      const values = await AsyncStorage.multiGet(prefs);
      let new_prefs = getSettingsObject(values);
      dispatch({ type: SETTINGS_REDUCER_ACTION.SET, payload: new_prefs });
    } catch (err) {
      console.log(err);
    }
  };
};

export const { Provider, Context } = createDataContext(
  settingsReducer,
  { updateSettings, initializeSettings, setSettings },
  { ...initial_state }
);
