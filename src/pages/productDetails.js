import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../styles/productdetails.scss";
import Slider from "react-slick";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import { Button } from "react-bootstrap";
import { IoMdArrowRoundBack } from "react-icons/io";
import { addToCart } from "../redux/slice/cartSlice";

export default function ProductDetails() {
  const dispatch = useDispatch();
  const imgdata = useSelector((state) => state.Types.ProductTypes.imgdata);
  const cart = useSelector((state) => state.cart.value);
  const params = useParams();
  const [proPage, SetProPage] = useState(null);
  useEffect(() => {
    fetchProductsDetails();
  }, [params.name]);
  const settings = {
    dots: false,
    infinite: false,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };
  const fetchProductsDetails = async () => {
    const { data } = await axios.get(
      `https://mock.redq.io/api/products/${params.name}?language=en&searchJoin=and&with=categories%3Bshop%3Btype%3Bvariations%3Bvariations.attribute.values%3Bvariation_options%3Btags`
    );
    SetProPage(data);
  };
  return (
    <div className="prodetails_maincontainer">
      <div className="pdetails_container">
        <Link to={"/" + imgdata}>
          <button className="back_btn">
            <IoMdArrowRoundBack className="back_arrow" />
            Back
          </button>
        </Link>
        <div className="productdetails_container">
          <div className="image_div">
            {proPage?.sale_price && (
              <p className="product_page_discount">
                {Math.ceil(
                  ((proPage.price - proPage.sale_price) / proPage.price) * 100
                )}
                %
              </p>
            )}
            {proPage && proPage?.gallery?.length > 0 ? (
              <Slider {...settings}>
                {proPage?.gallery?.map((e, i) => {
                  return (
                    <img className="slider_img" id="top" src={e.original} />
                  );
                })}
              </Slider>
            ) : (
              <img
                className="single_img"
                src={proPage && proPage.image.original}
              />
            )}
          </div>
          <div className="desciption_div">
            <p className="product_description">{proPage?.description}</p>
            <p className="productdetails_price">
              Price: {Math.ceil(proPage?.price)} $
            </p>
            <button
              onClick={() => dispatch(addToCart(proPage))}
              className="propage_addbtn"
            >
              Add to cart
            </button>
          </div>
        </div>
        <motion.div className="related_products">
          {proPage?.related_products?.map((e, i) => {
            const productquantity = cart?.CartProducts?.find(
              (item) => item.id == e.id
            );
            let product_Qty = 0;
            if (productquantity) product_Qty = productquantity.productQty;
            return (
              <div className="related_products_card" key={i}>
                {e.sale_price && (
                  <p className="discount_price">
                    {Math.ceil(((e.price - e.sale_price) / e.price) * 100)}%
                  </p>
                )}
                <Link to={"/productpage/" + e.slug}>
                  <img
                    className="related_products_img"
                    src={e.image.original}
                  />
                </Link>
                <p className="relatedpro_name">{e.name}</p>
                <p>${e.price}</p>
                <button
                  onClick={() => dispatch(addToCart(e))}
                  className="relatedpro_addbtn"
                >
                  {product_Qty > 0 ? product_Qty : "add"}
                </button>
              </div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
