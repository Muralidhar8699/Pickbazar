import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Offcanvas from "react-bootstrap/Offcanvas";
import Navbar from "./Navbar";
import Searchbar from "./Searchbar";
import Categories from "./Categories";
import "../styles/products.scss";
import {
  addToCart,
  deleteProduct,
  removefromCart,
} from "../redux/slice/cartSlice";
import { FaMinus, FaPlus } from "react-icons/fa";
import { TiDeleteOutline } from "react-icons/ti";
import Loading from "./loading";

export default function Products({ name, ...props }) {
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  const handleClose = () => setShow(false);
  const [products, setProducts] = useState(null);
  const params = useParams();
  const dispatch = useDispatch();
  const filteredProducts = useSelector(
    (state) => state.Types.ProductTypes.filter
  );
  const cart = useSelector((state) => state.cart.value);
  let pass = params.slug;
  useEffect(() => {
    fetchProducts();
  }, [pass, filteredProducts, cart]);
  const fetchProducts = async () => {
    let url = `https://mock.redq.io/api/products?searchJoin=and&with=type%3Bauthor&limit=${30}&language=en&search=type.slug:${pass}%3Bstatus:publish`;
    if (filteredProducts) {
      url = `https://mock.redq.io/api/products?searchJoin=and&with=type%3Bauthor&limit=30&language=en&search=type.slug:${pass}%3Bcategories.slug:${filteredProducts}%3Bstatus:publish`;
    }
    const { data } = await axios.get(url);
    setProducts(data);
  };

  return (
    <div className="Products_container">
      {<Navbar />}
      {<Searchbar />}

      <div className="Products_div">
        <Categories pass={pass} />
        <div className="product_container">
          <div className="mini_cart" onClick={handleShow}>
            <p className="cart_qty">
              {cart.CartProducts.length} item
              {cart.CartProducts.length > 1 && "s"}
            </p>
            <p className="cart_totalprice">${Math.floor(cart.totalPrice)}</p>
          </div>

          {products?.data?.map((e, i) => {
            const cartproduct = cart.CartProducts?.find(
              (item) => item.id == e.id
            );
            let cartQty = 0;
            if (cartproduct) cartQty = cartproduct.producQty;
            return (
              <div className="product_card" key={i}>
                {e?.sale_price && (
                  <p className="discount_percent">
                    {Math.ceil(((e.price - e.sale_price) / e.price) * 100)}%
                  </p>
                )}
                <Link to={"/productpage/" + e.slug}>

                 {isLoading ? <Loading/> :<img className="product_img" src={e.image.original} />}
                </Link>
                <div className="product_detailsdiv">
                  <span className="product_price">$ {Math.ceil(e.price)}</span>
                  <span className="product_name">{e.name}</span>
                </div>
                <div className={cartQty > 0 ? "added" : "buttons_div"}>
                  {cartQty > 0 && (
                    <button
                      onClick={() => dispatch(removefromCart(e))}
                      className={cartQty > 0 ? "minusbtn_added" : " minus_btn"}
                    >
                      <FaMinus />
                    </button>
                  )}
                  <button
                    className=" add_btn"
                    onClick={() => dispatch(addToCart(e))}
                  >
                    {cartQty > 0 ? cartQty : "add"}
                  </button>
                  {cartQty > 0 && (
                    <button
                      className=" plus_btn"
                      onClick={() => dispatch(addToCart(e))}
                    >
                      <FaPlus />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Offcanvas
        style={{ width: "30rem" }}
        show={show}
        onHide={handleClose}
        {...props}
        placement="end"
      >
        <Offcanvas.Header className="offcanvas_main">
          <Offcanvas.Title>
            <div className="cart_main_div">
              <p>
                {cart.CartProducts.length}item
                {cart.CartProducts.length > 1 && "s"}
              </p>
              <TiDeleteOutline
                className="cartClose_btn"
                onClick={handleClose}
              />
            </div>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {cart.CartProducts.length == 0 ? (
            <div>
              <img src="https://media0.giphy.com/media/Aik2hwXn0dUTrVkbIP/giphy.gif?cid=6c09b952e56npoywp1uij98xf6rwq3d8dh31a7sezl2n7itm&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=s" />
              <p>No products</p>
            </div>
          ) : (
            <div className="cart_products_div">
              {cart.CartProducts &&
                cart?.CartProducts?.map((e, i) => {
                  const cartproductQty = products?.data?.find(
                    (item) => item.id == e.id
                  );
                  let product_qty = 0;
                  if (cartproductQty) product_qty = e.producQty;
                  return (
                    <div className="single_cart_product" key={i}>
                      <div className="cart_btns_div">
                        <button
                          className="cart_minusBtn"
                          onClick={() => dispatch(removefromCart(e))}
                        >
                          <FaMinus />
                        </button>
                        <p className="qty">{product_qty}</p>
                        <button
                          className="cart_plusBtn"
                          onClick={() => dispatch(addToCart(e))}
                        >
                          <FaPlus />
                        </button>
                      </div>
                      <img className="cart_img" src={e.image.original} />
                      <div>
                        <p className="cart_product_name">{e.name}</p>
                        <p className="cart_product_price">
                          ${e.producQty * Math.ceil(e.price)}
                        </p>
                      </div>
                      <p
                        className="deleteProduct_btn"
                        onClick={() => dispatch(deleteProduct(e))}
                      >
                        <TiDeleteOutline />
                      </p>
                    </div>
                  );
                })}
            </div>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}
