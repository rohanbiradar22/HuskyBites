import MenuAppBar from "../Header/Header";
import Footer from "../Footer/Footer";
import classes from "../../styles/styles.module.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MenuAppBar />
      {/* <div className={classes.main_content}> */}
      {children}
      <Footer />
      {/* </div> */}
    </>
  );
}
