import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";

import "../styles/Navbar.scss";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { IoLocationOutline } from "react-icons/io5";
import { backgroundimg, filterproducts } from "../redux/slice/productSlice";
import LoginModal from "./loginmodal";

export default function Navbar() {
  const [modalShow, setModalShow] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleCategoriesSelect = (arg) => {
    dispatch(filterproducts(null));
    navigate("/" + arg);
  };
  const Types = useSelector((state) => state.Types.ProductTypes.value);
  const cart = useSelector((state) => state.cart.value);

  return (
    <div className="navbar_container">
      <Link className="Link_tag" to={"/"}>
        <img
          id="home"
          className="nav_logo"
          src="https://pickbazar-react-rest.vercel.app/_next/image?url=https%3A%2F%2Fpickbazarlaravel.s3.ap-southeast-1.amazonaws.com%2F2295%2FLogo-new.png&w=3840&q=75"
        />
      </Link>
      <Dropdown className="dropdown_div">
        <Dropdown.Toggle className="dropdown_toggle" variant="success">
          Select
        </Dropdown.Toggle>
        <Dropdown.Menu className="dropdown_menu">
          {Types?.map?.((e, i) => {
            return (
              <div key={i} onClick={() => handleCategoriesSelect(e.slug)}>
                <span className="Link_tag">
                  <p
                    href="#home"
                    className="dropdown_item"
                    onClick={() => dispatch(backgroundimg(e.slug))}
                  >
                    {e.name}
                  </p>
                </span>
              </div>
            );
          })}
        </Dropdown.Menu>
      </Dropdown>
      <div className="search_div">
        <input placeholder="Search..." className="search_input" />
        <button className="search_btn">Search</button>
      </div>
      <p className="navbar_text">Shops</p>
      <p className="navbar_text">Offers</p>
      <p className="navbar_text">Contact</p>
      <IoLocationOutline />
      <button className="navbar_btn" onClick={() => setModalShow(true)}>
        Join
      </button>
      <button className="navbar_btn">Become Seller</button>
      <LoginModal show={modalShow} onHide={() => setModalShow(false)} />
    </div>
  );
}
