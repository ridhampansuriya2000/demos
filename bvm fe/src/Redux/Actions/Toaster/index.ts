import { TOASTER_START, TOASTER_STOP } from "./index.actionType";
import { IToasterStart, IToasterStop } from "./index.types";
import { SuccessActionCallback } from "../index.type";

export * from "./index.actionType";
export * from "./index.types";

export const toasterStart = ({type, toaster, message }: IToasterStart) => ({
  type: TOASTER_START,
  payload: { toaster, message,type },
  callback: ({ state, payload }: SuccessActionCallback) => {
      const copyState = structuredClone(state);
    return toaster
      ? {
          ...copyState,
          commonToaster: {
            ...state.commonToaster,
            type: type,
            toaster: toaster,
            message: message,
            },
        }
      : copyState;
  },
});

export const toasterStop = () => ({
  type: TOASTER_STOP,
  callback: ({ state }: SuccessActionCallback) => {
      const copyState = structuredClone(state);
    return {
        ...copyState,
        commonToaster: {
          type: '',
          toaster: false,
          message: '',
          },
      }
  },
});
