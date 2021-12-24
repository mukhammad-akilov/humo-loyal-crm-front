import { ApiUrl } from "../../config";
import httpService from "../../httpService/httpService";
import { CHANGE_PRECHECK_INFO, LOADING_PAYMENTS_FIELDS, LOADING_PRECHECK_BLOCK, SET_PAYMENTS_FIELDS } from "./actionTypes";
import { handleSnackbar } from "./snackbarActions";
// crypto-js
import sha256 from "crypto-js/sha256";


export const loadingPaymentsFields = (bool) => {
  return {
    type: LOADING_PAYMENTS_FIELDS,
    payload: bool,
  };
};

const setPaymentsFields = (data) => {
  return {
    type: SET_PAYMENTS_FIELDS,
    payload: data,
  };
};

export const changePreCheckInfo = (data) => {
  return {
    type: CHANGE_PRECHECK_INFO,
    payload: data,
  };
};

export const loadingPreCheckBlock = (bool) => {
  return {
    type: LOADING_PRECHECK_BLOCK,
    payload: bool,
  };
};

export const getPaymentsFields = () => {
  return async function (dispatch) {
    try {
      dispatch(loadingPaymentsFields(true));
      const apiConfig = {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      };

      const responseJson = await httpService(apiConfig, `${ApiUrl}get_fields/precheck`);
      dispatch(setPaymentsFields(responseJson));
      dispatch(loadingPaymentsFields(false));
    } catch (e) {
      console.log(e);
      dispatch(setPaymentsFields([]));
      dispatch(loadingPaymentsFields(false));
      dispatch(
        handleSnackbar({
          open: true,
          message: e.apiResponse.reason,
          type: "error",
          position: {
            vertical: "top",
            horizontal: "center",
          },
        })
      );
    }
  };
};

export const paymentPreCheck = (fieldsArr) => {
  return async function (dispatch) {
    try {
      dispatch(loadingPreCheckBlock(true));
      const apiConfig = {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      };
      let argRequest = "?";
      for (let prop in fieldsArr) {
        argRequest += `${prop}=${fieldsArr[prop]}&`;
      }

      const responseJson = await httpService(apiConfig, `${ApiUrl}pre_check${argRequest}`);
      dispatch(changePreCheckInfo(responseJson));
      dispatch(loadingPreCheckBlock(false));
    } catch (e) {
      console.log(e);
      dispatch(changePreCheckInfo(null));
      dispatch(loadingPreCheckBlock(false));
      dispatch(
        handleSnackbar({
          open: true,
          message: e.apiResponse.reason,
          type: "error",
          position: {
            vertical: "top",
            horizontal: "center",
          },
        })
      );
    }
  };
};


export const makePayment = (customerIdentifier, amount, bonusAmount) => {
  amount = (parseFloat(amount).toFixed(2))
  bonusAmount = bonusAmount ? (parseFloat(bonusAmount).toFixed(2)) : (0).toFixed(2);
  console.log(amount, bonusAmount)
  return async function (dispatch) {
    try {
      dispatch(loadingPaymentsFields(true));
      
      const jsonData = {
        customer_identifier: customerIdentifier,
        amount: +amount,
        pay_bonus_amount: +bonusAmount,
        hash_sum: sha256(`${customerIdentifier}${amount}${bonusAmount}`).toString()
      }
      
      const apiConfig = {
        method: "POST",
        body: JSON.stringify(jsonData),
        headers: {
          Accept: "application/json",
        },
      };



      const responseJson = await httpService(apiConfig, `${ApiUrl}create_payment`);
      dispatch(loadingPaymentsFields(false));
      console.log(responseJson)
      dispatch(
        handleSnackbar({
          open: true,
          message: responseJson,
          type: "error",
          position: {
            vertical: "top",
            horizontal: "center",
          },
        })
      );
    } catch (e) {
      console.log(e);
      dispatch(loadingPaymentsFields(false));
      dispatch(
        handleSnackbar({
          open: true,
          message: e.apiResponse.reason,
          type: "error",
          position: {
            vertical: "top",
            horizontal: "center",
          },
        })
      );
    }
  };
};
