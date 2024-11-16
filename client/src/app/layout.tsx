import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ReduxProvider } from "@/redux/provider";
import "bootstrap/dist/css/bootstrap.min.css";
import ToastifyContainer from "@/components/ToastifyContainer";
import Layout from "@/components/Layout/Layout";
import classes from "../styles/styles.module.css";
import { defaultLocale } from "../middleware";

export const metadata: Metadata = {
  manifest: "/manifest.json",
  title: "Husky Bites App",
  description: "A food delivery application",
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};

// global file which reders first
export default function RootLayout({ children, params }: { children: React.ReactNode; params: { lang: string } }) {
  return (
    <html lang={params.lang ?? defaultLocale}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;600;700&display=swap"
        />
      </head>
      <body>
        <ReduxProvider>
          <Layout>
            <div className={classes.main_content}>{children}</div>
          </Layout>
        </ReduxProvider>
        <ToastifyContainer />
      </body>
    </html>
  );
}
