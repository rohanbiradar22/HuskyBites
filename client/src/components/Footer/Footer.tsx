/* eslint-disable @next/next/no-img-element */
"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import "./Footer.css";
import logo from "./logo.jpg";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import TranslateIcon from "@mui/icons-material/Translate";
import CopyrightIcon from "@mui/icons-material/Copyright";
import Image from "next/image";
import Link from "next/link";
import ContactUsPage from "@/app/contact-us/page";
import AboutUsPage from "@/app/about-us/page";

export default function Footer() {

  return (
    <footer className="footer">
      <Box
        sx={{
          flexGrow: 1,
          backgroundColor: "whitesmoke",
          color: "black",
        }}
      >
        <div className="footer-content">
          <div className="left-content">
            {/* <div className="Logo"> */}
            <Image
              src={logo}
              priority={true}
              width={150}
              height={150}
              alt="husky"
              className="image"
            />
            {/* </div> */}
            <div className="footer-name">
              <p>
                <span className="first-name">Husky</span>
                <span className="last-name" style={{ color: "black" }}>
                  Bites
                </span>
              </p>
              <div className="copyright">
                <p>
                  Copyright <CopyrightIcon sx={{ fontSize: "large"}}/> 2023 - 2016
                  HuskyBites
                </p>
                {/* <p>Shree</p> */}
              </div>
            </div>
          </div>

          <div className="center-content">
            <span>

              <a href="https://www.facebook.com" target="_blank" className="icon">
              <FacebookIcon className="icon" /></a> |
              <a href="https://www.instagram.com" target="_blank" className="icon">
              <InstagramIcon className="icon" /> </a> |
              <a href="https://www.twitter.com" target="_blank" className="icon">
              <TwitterIcon className="icon" /> </a>
            </span>
          </div>

          <div className="right-content" style={{ color: "black" }}>
            <p>
              <Link href="/contact-us" className="contact">Contact Us</Link></p>
            <p><Link href="/about-us" className="contact">About Us</Link></p>
            <p>
              <TranslateIcon /> English
            </p>
          </div>
        </div>
      </Box>
    </footer>
  );
}
