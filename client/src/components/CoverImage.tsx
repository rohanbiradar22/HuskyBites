import { Card, CardMedia } from "@mui/material";
import Image from "next/image";

const CoverImage: React.FC<{ src: string; alt: string }> = ({ src, alt }) => {
  return (
    <>
      <Card>
        <CardMedia
          component="img"
          alt={alt}
          height="400"
          image={src}
          style={{ objectFit: "cover", width : '100%' }}
        />
      </Card>
      {/* <Image
        src={src}
        alt={alt}
        layout="responsive"
        width={1200}
        height={1000}
        // objectFit="cover"
        // layout="fill"
      /> */}
    </>
  );
};

export default CoverImage;
