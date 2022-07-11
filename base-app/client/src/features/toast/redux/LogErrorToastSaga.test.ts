import { PayloadAction } from "@reduxjs/toolkit";
import { SagaIterator } from "redux-saga";
import { call, put, takeEvery } from "redux-saga/effects";

import { ToastOptions } from "../types";
import { showToast } from "./toastSlice";
import { expectSaga } from "redux-saga-test-plan";
import {logErrorToasts, sendToAnalytics} from "./LogErrorToastSaga";

const errorToastOptions: ToastOptions = {
  title: "It's time to panic!!!",
  status: "error",
};

const errorToastAction = {
  type: "test",
  payload: errorToastOptions,
};

const infoToastOptions: ToastOptions = {
    title: "It gives information",
    status: "info",
}

const infoToastAction = {
    type: "test",
    payload: infoToastOptions,
};

test("saga calls analytics when it receives error toast", () => {
  return expectSaga(logErrorToasts, errorToastAction)
      .call(sendToAnalytics, "It's time to panic!!!")
      .run();
})

test("saga does not call analytics when it receives info toast", () => {
    return expectSaga(logErrorToasts, infoToastAction)
        .not.call(sendToAnalytics, "It's not time to panic")
        .run();
})



