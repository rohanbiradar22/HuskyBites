"use client";

import { Provider } from "react-redux";
import store from "./store";

// redux provider for providing store to all components
export const ReduxProvider = ({ children } : { children : React.ReactNode}) => {
    return <Provider store={store}>{children}</Provider>
}
