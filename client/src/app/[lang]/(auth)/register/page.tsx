"use client"
import React from "react";
import classes from "../../../../styles/styles.module.css";
import CustomForm from "@/components/CustomForm";
import { useAppSelector } from "@/redux/store";
import Spinner from "@/components/Spinner/Spinner";


// user registration page
const Register = ({ params }: { params: { lang: string } }) => {

  const loading = useAppSelector((state) => state.auth.loading);
  
  return (
    <div className={`${classes.register_image} ${classes.auth_page}`}>
      <CustomForm formType={"register"} params={params}/>
      {loading && <Spinner />}
    </div>
  );
};

export default Register;
