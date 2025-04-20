import React, { useContext, useEffect, useRef } from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";

import { useParams, usePathname } from "next/navigation";

//Carousel slider for product
import Slider from "react-slick";

//Carousel slider data
import SliderData from "./SliderData";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Carousel.css";

//fetch product


import { ProductContext } from "@/app/context/Ecommercecontext";

const ProductCarousel = () => {
  const [state, setState] = React.useState<any>({ nav1: null, nav2: null });
  const slider1 = useRef(null);
  const slider2 = useRef(null);
  const { products } = useContext(ProductContext);
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));
  const getProductImage = product ? product.photo : "/images/products/s1.jpg";

  const pathName = usePathname();


  useEffect(() => {
    setState({
      nav1: slider1.current,
      nav2: slider2.current,
    });
  }, []);

  const { nav1, nav2 } = state;
  const settings = {
    focusOnSelect: true,
    infinite: true,
    slidesToShow: 5,
    arrows: false,
    swipeToSlide: true,
    slidesToScroll: 1,
    centerMode: true,
    className: "centerThumb",
    speed: 500,
  };

  return (
    <Box>
      <Slider asNavFor={nav2} ref={(slider: any) => (slider1.current = slider)}>
        <Box>
          <Avatar
            src={getProductImage}
            style={{ borderRadius: "9px", width: "100%", height: "500px" }}
          />
        </Box>
        {SliderData.map((step) => (
          <Box key={step.id}>
            <Avatar
              src={step.imgPath}
              style={{ borderRadius: "5px", width: "100%", height: "500px" }}
            />
          </Box>
        ))}
      </Slider>
      <Slider
        asNavFor={nav1}
        ref={(slider: any) => (slider2.current = slider)}
        {...settings}
        className="slide-dots"
      >
        <Box sx={{ p: 1, cursor: "pointer" }}>
          <Avatar
            src={getProductImage}
            style={{ borderRadius: "5px", width: "72px", height: "72px" }}
          />
        </Box>
        {SliderData.map((step) => (
          <Box key={step.id} sx={{ p: 1, cursor: "pointer" }}>
            <Avatar
              src={step.imgPath}
              style={{ borderRadius: "5px", width: "72px", height: "72px" }}
            />
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default ProductCarousel;
