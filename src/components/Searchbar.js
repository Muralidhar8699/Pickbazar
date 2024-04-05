import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/searchBar.scss";
import { useSelector } from "react-redux";
import Slider from "react-slick";

export default function Searchbar() {
  const imgdata = useSelector((state) => state.Types.ProductTypes.imgdata);
  const types = useSelector((state) => state.Types.ProductTypes.value);
  const [obj, setObj] = useState("");
  const filterimg = () => {
    if (Array.isArray(types)) {
      let result = types?.find((e) => e.slug == imgdata);
      // console.log(result);
      setObj(result);
    } else {
      console.log("types is not defined");
    }
  };
  useEffect(() => {
    filterimg();
  }, [imgdata, obj, types]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <div className="search_container">
      {obj?.banners?.map((e, i) => {
        return (
          <div key={i}>
            <div
              key={i}
              className="searchbar_div"
              style={{ backgroundImage: `url(${e.image?.original})` }}
            >
              <div className="searchbar_titlediv">
                <h1 className="searchbar_title">{e.title}</h1>
              </div>
            </div>
            <div className="slider_container">
              <Slider {...settings}>
                {obj.promotional_sliders?.map((e, i) => {
                  return (
                    <img
                      key={i}
                      alt="logo"
                      className="search_slider_img"
                      src={e.original}
                    />
                  );
                })}
              </Slider>
            </div>
          </div>
        );
      })}
    </div>
  );
}
