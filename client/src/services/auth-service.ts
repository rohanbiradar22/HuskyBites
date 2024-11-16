import { loginData, registerData, registerRestaurantData, updatePasswordPayLoadType } from "@/models/auth";
import { loginAction, registerAction, registerRestaurantAction, generateOtpAction, updatePasswordAction } from "@/redux/actions/auth-actions";
import store from "@/redux/store"

// auth services for dispatching  actions
export const loginService = (loginData : loginData) => {
    const dispatchedResult = store.dispatch(loginAction(loginData));
    return dispatchedResult;
}

export const registerService = async (registerData: registerData) => {
    const dispatchedResult = await store.dispatch(registerAction(registerData));
    return dispatchedResult;
}

export const registerRestaurantService = async (registerRestaurantData: registerRestaurantData) => {
    const dispatchedResult = await store.dispatch(registerRestaurantAction(registerRestaurantData));
    return dispatchedResult;
}

export const getOtpService = async (email: string) => {
    const dispatchedResult = await store.dispatch(generateOtpAction(email));
    return dispatchedResult;
}

export const updatePasswordService = async ( updatePasswordData : updatePasswordPayLoadType) => {
    const dispatchedResult = await store.dispatch(updatePasswordAction(updatePasswordData));
    return dispatchedResult;
}
 