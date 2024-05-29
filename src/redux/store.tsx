import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import chatReducer from "./chatReducer/chatReducer";

const logger = createLogger();

export const chatStore = configureStore({
  reducer: {
    chatState: chatReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type RootState = ReturnType<typeof chatStore.getState>;
export type AppDispatch = typeof chatStore.dispatch;
