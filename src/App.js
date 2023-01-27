import React from "react";
//import { hide } from 'react-native-bootsplash';
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { RootNavigator } from "@/navigation";
import { persistor, store } from "@/store";
import Toast from "react-native-toast-message";

export function App() {
  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <RootNavigator />
        </PersistGate>
      </Provider>
      <Toast />
    </>
  );
}
