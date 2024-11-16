"use client";
import Title from "@/components/Title";
import Image from "next/image";
import LogoImage from "../../public/images/logo.jpg";
import { Typography } from "@mui/material";


// home page which renders on default route
export default function Home() {
  return (
    <>
      <div className="home-page-main-div">
      <Title title="Welcome to Husky Bites Application" variant="h2"></Title>
        <Image src={LogoImage} width={300} height={300} alt="husky" className="image" />
        <Typography title="Welcome to Husky Bites Application" variant="h4">Hungry? Let the Huskies Howl in Flavorful Delivery!</Typography>
      </div>
    </>
  );
}
