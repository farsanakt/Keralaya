import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; 
import userReducer from "./slices/userSlice";
import guideReducer from "./slices/guideSlice"


const persistConfig = {
  key: "root", 
  storage, 
     
};

const rootReducer = combineReducers({
  user: persistReducer(persistConfig, userReducer),

  guide:persistReducer(persistConfig,guideReducer)
 
});


const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    }),
});


export const persistor = persistStore(store);


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
