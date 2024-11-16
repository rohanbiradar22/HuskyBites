'use client'
import React,{useEffect} from "react";
import "./PageNotFound.css";
import Link from "next/link";
import Image from "next/image";
import LogoImage from "../../../public/images/logo.jpg";
import { Button } from "@mui/material";
import { useAppSelector } from "@/redux/store";

const buttonStyle = {
  backgroundColor: "black",
  color: "white",
  "&:hover": {
    backgroundColor: "red",
  },
};

const PageNotFound = () => {

  const token = useAppSelector(state => state.auth.token);

  useEffect(() => {

  });

  return (
    <div className="main-div">
      <div>
        <Image src={LogoImage} width={300} height={300} alt="husky" className="image" />
      </div>
      <div className="text-div">
        <h3>Oops! Page not Found</h3>
        <Link href={ token ? "/restaurants" : "/login" }>
          <Button style={buttonStyle}>Go to Home</Button>
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
