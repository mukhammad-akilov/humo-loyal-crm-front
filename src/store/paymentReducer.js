import {
  CHANGE_PRECHECK_INFO,
  LOADING_PAYMENTS_FIELDS,
  LOADING_PRECHECK_BLOCK,
  SET_PAYMENTS_FIELDS,
} from "./actions/actionTypes";

const initialData = {
  fields: [],
  loading: false,
  preCheckInfo: null,
  preCheckLoading: false,
};

export const paymentReducer = (state = initialData, action) => {
  switch (action.type) {
    case SET_PAYMENTS_FIELDS:
      return { ...state, fields: action.payload };
    case LOADING_PAYMENTS_FIELDS:
      return { ...state, loading: action.payload };
    case LOADING_PRECHECK_BLOCK:
      return { ...state, preCheckLoading: action.payload };
    case CHANGE_PRECHECK_INFO:
      return { ...state, preCheckInfo: action.payload };
    default:
      return state;
  }
};
