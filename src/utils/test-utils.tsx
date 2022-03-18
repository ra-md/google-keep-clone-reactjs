import { render } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { combineReducers } from "redux";
import { store } from "~/store/store";
import noteSlice from "~/store/noteSlice";
import labelSlice from "~/store/labelSlice";

function Wrapper({ children }) {
  return <Provider store={store}>{children}</Provider>;
}

const customRender = (ui: React.ReactElement, options = {}) =>
  render(ui, {
    wrapper: Wrapper,
    store: configureStore({
      reducer: combineReducers({ note: noteSlice, label: labelSlice }),
    }),
    ...options,
  });

export * from "@testing-library/react";
export { default as userEvent } from "@testing-library/user-event";
export { customRender as render };
