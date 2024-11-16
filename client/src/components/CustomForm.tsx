"use client";
import React, { useState, FormEvent, FormEventHandler } from "react";
import {
  getOtpService,
  loginService,
  registerRestaurantService,
  registerService,
  updatePasswordService,
} from "@/services/auth-service";
import { useRouter } from "next/navigation";
import LoginForm from "./AuthenticationForms/LoginForm";
import RegisterForm from "./AuthenticationForms/RegisterForm";
import GenerateOtpForm from "./AuthenticationForms/GenerateOtpForm";
import UpdatePasswordForm from "./AuthenticationForms/UpdatePasswordForm";
import { CustomFormProps } from "@/models/auth";
import { Role } from "@/enums/constants";
import RestaurantRegiserForm from "./AuthenticationForms/RestaurantRegisterForm";

const CustomForm: React.FC<CustomFormProps> = ({ formType, params }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [restaurantName, setRestaurantName] = useState("");
  const [addressLine, setAddressLine] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [country, setCountry] = useState("");

  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");

  const [hidePasswordUpdationForm, setHidePasswordUpdationForm] = useState(true);

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const router = useRouter();

  const formHandler: FormEventHandler<HTMLFormElement> = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formType === "login") {
      loginService({ email, password }).then((dispatchedResult: any) => {
        if (!dispatchedResult.error) {
          
          if (dispatchedResult.payload.user.role === Role.USER) {
            router.push("/restaurants");
          }else if(dispatchedResult.payload.user.role === Role.RESTAURANT){
            router.push(`/restaurant-home/${dispatchedResult.payload.user._id}`);
          }else if(dispatchedResult.payload.user.role === Role.ADMIN){
            router.push("/admin-home");
          }
        }
      });
    } else if (formType === "register") {
      registerService({
        firstName,
        lastName,
        email,
        password,
        phone,
        role: Role.USER,
      }).then((dispatchedResult: any) => {
        if (!dispatchedResult.error) {
          router.push("/login");
        }
      });
    } else if (formType === "register-restaurant") {
      registerRestaurantService({
        name: restaurantName,
        firstName,
        lastName,
        address: {
          addressLine,
          city,
          state,
          zipCode: Number(zipCode),
          country,
        },
        email,
        password,
        phone,
        role: Role.RESTAURANT,
      }).then((dispatchedResult: any) => {
        if (!dispatchedResult.error) {
          router.push("/login");
          registerService({
            firstName,
            lastName,
            email,
            password,
            phone,
            role: Role.RESTAURANT,
          })
        }
      });

    } else if (formType === "forgot-password" && hidePasswordUpdationForm) {
      getOtpService(email).then((dispatchedResult: any) => {
        if (!dispatchedResult.error) {
          setHidePasswordUpdationForm(false);
        }
      });
    } else if (formType === "forgot-password" && !hidePasswordUpdationForm) {
      updatePasswordService({ email, otp, password }).then((dispatchedResult: any) => {
        if (!dispatchedResult.error) {
          router.push("/login");
        }
      });
    }
  };

  return (
    <>
      {formType === "register" && (
        <RegisterForm
          formHandler={formHandler}
          firstName={firstName}
          setFirstName={setFirstName}
          lastName={lastName}
          setLastName={setLastName}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          phone={phone}
          setPhone={setPhone}
          showPassword={showPassword}
          handleClickShowPassword={handleClickShowPassword}
          params={params}
        />
      )}

      {formType === "register-restaurant" && (
        <RestaurantRegiserForm
          formHandler={formHandler}
          restaurantName={restaurantName}
          firstName={firstName}
          setFirstName={setFirstName}
          lastName={lastName}
          setLastName={setLastName}
          setRestaurantName={setRestaurantName}
          addressLine={addressLine}
          setAddressLine={setAddressLine}
          city={city}
          setCity={setCity}
          state={state}
          setState={setState}
          zipCode={zipCode}
          setZipCode={setZipCode}
          country={country}
          setCountry={setCountry}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          phone={phone}
          setPhone={setPhone}
          showPassword={showPassword}
          handleClickShowPassword={handleClickShowPassword}
          params={params}
        />
      )}

      {formType === "login" && (
        <LoginForm
          formHandler={formHandler}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          showPassword={showPassword}
          handleClickShowPassword={handleClickShowPassword}
          params={params}
        />
      )}

      {formType === "forgot-password" && hidePasswordUpdationForm && (
        <GenerateOtpForm formHandler={formHandler} email={email} setEmail={setEmail} params={params}/>
      )}

      {formType === "forgot-password" && !hidePasswordUpdationForm && (
        <UpdatePasswordForm
          formHandler={formHandler}
          email={email}
          setEmail={setEmail}
          otp={otp}
          setOtp={setOtp}
          password={password}
          setPassword={setPassword}
          showPassword={showPassword}
          handleClickShowPassword={handleClickShowPassword}
          params={params}
        />
      )}
    </>
  );
};

export default CustomForm;
