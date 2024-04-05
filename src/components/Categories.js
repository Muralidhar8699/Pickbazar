import axios from "axios";
import React, { useEffect, useState } from "react";
import "../styles/categories.scss";
import { useDispatch, useSelector } from "react-redux";
import { filterproducts } from "../redux/slice/productSlice";
import { motion } from "framer-motion";

export default function Categories({ pass }) {
  const dispatch = useDispatch();
  const [categories, setCategories] = useState(null);
  const filteredProducts = useSelector(
    (state) => state.Types.ProductTypes.filter
  );

  useEffect(() => {
    fetchCategories();
  }, [pass, filteredProducts]);
  const fetchCategories = async () => {
    const { data } = await axios.get(
      `https://mock.redq.io/api/categories?searchJoin=and&limit=1000&language=en&parent=null&search=type.slug:${pass}`
    );
    setCategories(data);
  };

  return (
    <motion.div
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      transition={{ delay: 1.5 }}
      className="categories_container"
    >
      {categories?.data?.map((e, i) => {
        return (
          <div key={i} className="categories_div">
            <motion.div
              whileHover={{ scale: 1.15, originX: 0 }}
              transition={{ type: "spring", stiffness: 300, duration: 0.5 }}
              onClick={() => dispatch(filterproducts(e.slug))}
              className="categories_name"
            >
              {e.name}
            </motion.div>
          </div>
        );
      })}
    </motion.div>
  );
}
