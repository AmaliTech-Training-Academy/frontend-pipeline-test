import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import React, { JSX, PropsWithChildren } from "react";
import { costsApi } from "@/lib/services/client/cost-api";
import { persistedReducer } from "@/lib/store";
import { baseApi } from "@/lib/base-api";

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      baseApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = ReturnType<typeof configureStore>;

export function setupTestStore(preloadedState?: Partial<RootState>) {
  const rootReducer = combineReducers({
    [baseApi.reducerPath]: baseApi.reducer,
  });
  return configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: false, // to disable checks for testing
      }).concat(costsApi.middleware),
    preloadedState,
  });
}

// for manual usage
export function TestWrapper({
  children,
  store,
}: PropsWithChildren<{ store?: AppStore }>) {
  const testStore = store || setupTestStore();
  return <Provider store={testStore}>{children}</Provider>;
}

// render with store support
export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState,
    store = setupTestStore(preloadedState),
    ...renderOptions
  }: {
    preloadedState?: Partial<RootState>;
    store?: AppStore;
  } = {}
) {
  function Wrapper({ children }: PropsWithChildren): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }

  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
}

// for testing RTK Query hooks directly
/* eslint-disable @typescript-eslint/no-explicit-any */
export function setupApiStore(api: any, extraReducers = {}) {
  return configureStore({
    reducer: {
      [api.reducerPath]: api.reducer,
      ...extraReducers,
    },
    middleware: gDM => gDM().concat(api.middleware),
  });
}
