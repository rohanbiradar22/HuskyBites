import Logo from "./Logo.png";
import Image from "next/image";

// about us page
const AboutUsPage = () => {
  return (
    <>
      <h3>About Us</h3>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh", // This sets the height of the container to the full viewport height
        }}
      >
        <Image
          src={Logo}
          width={1000}
          height={600}
          alt="husky"
          style={{ borderRadius: "1rem" }}
        />
      </div>
      <h6>
        HuskyBites is a meal delivery site that allows customers to place orders
        from neighboring restaurants, which are then delivered by delivery
        executives. First and foremost, restaurants, delivery executives, and
        users will form accounts using their phone number and email address.
        Profile information for delivery executives and users includes their
        name, phone number, and profile picture. The restaurant account may add,
        modify, and categorize food products. Users may explore the dining
        options and place orders. They can also add eateries to their favorites
        list. Once an order is placed, delivery executives may inspect it,
        accept it for pickup, and deliver it to the consumer. Based on the
        service obtained, the consumer can rank the restaurant and delivery
        executive.
      </h6>
    </>
  );
};

export default AboutUsPage;
