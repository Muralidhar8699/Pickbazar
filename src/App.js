import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./styles/App.scss";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductTypes } from "./redux/slice/productSlice";
import Products from "./components/Products";
import Categories from "./components/Categories";
import Searchbar from "./components/Searchbar";
import ProductDetails from "./pages/productDetails";
import Home from "./components/Home";

function App() {
  const dispatch = useDispatch();
  const filteredProducts = useSelector(
    (state) => state.Types.ProductTypes.filter
  );
  const refresher = useSelector(
    (state) => state.Types.ProductTypes.productSlug
  );

  useEffect(() => {
    dispatch(fetchProductTypes());
  }, [filteredProducts, refresher]);
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <div>
          <Home />
        </div>
      ),
    },
    {
      path: "/productpage/:name",
      element: <ProductDetails />,
    },
    {
      path: "/:slug",
      element: <Products />,
    },
  ]);
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
