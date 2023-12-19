import "tailwindcss/tailwind.css";
import "./app.sass";
import { Suspense, useCallback, useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import HomePage from "./app/HomePage";

import Footer from "./components/baseComponents/Footer";
import { Header } from "./components/baseComponents/Header";
import CategoryPage from "./app/CategoryPage";
import ProductPage from "./app/ProductPage";
import { getDataApiJSON } from "./utils/globals/petitions";
import { changeCart, changeUser } from "./utils/reducers/reduxDispatch";
import OrderPage from "./app/OrderPage";
import { Toaster } from "react-hot-toast";

function App() {
  const [loaded, setLoaded] = useState(false);
  const firstLoading = useCallback(async () => {
    //CARGAR EL CARRITO Y EL USUARIO DEL LOCALSTORAGE Y METERLO EN REDUX
    const shoppingCartId = localStorage.getItem("shoppingCartId");
    const userId = localStorage.getItem("userId");

    if (userId) {
      const user = await getDataApiJSON("/api/user/getUserInstance", {
        id: userId,
      });
      // harias cambio de redux con la funcion del dispatcher
      await changeUser({ ...user });
    }

    if (shoppingCartId) {
      const shoppingCart = await getDataApiJSON(
        "/api/shoppingCart/getShoppingCartInstance",
        { id: shoppingCartId }
      );
      let price = 0;
      if (shoppingCart?.ShoppingCartProducts) {
        for (const product of shoppingCart.ShoppingCartProducts) {
          price += parseFloat(product.price);
        }
      }
      await changeCart({ ...shoppingCart, price });
    } else {
      const shoppingCart = await getDataApiJSON(
        "/api/shoppingCart/createShoppingCart",
        {}
      );
      if (shoppingCart) {
        localStorage.setItem("shoppingCartId", shoppingCart.id);
        await changeCart({
          ...shoppingCart,
          price: 0,
          ShoppingCartProducts: [],
        });
      }
    }

    setLoaded(true);
  }, []);

  useEffect(() => {
    firstLoading();
  }, [firstLoading]);

  return (
    <Suspense fallback={<LoadingDiv />}>{loaded && <AppLoaded />}</Suspense>
  );
}

const LoadingDiv: React.FC = () => {
  return (
    <div className="App bg-gradient-to-r from-bg-start via-bg-mid to-bg-end h-screen">
      {" "}
      <div>Loading</div>{" "}
    </div>
  );
};

const AppLoaded: React.FC = () => {
  return (
    <div className="h-screen w-screen">
      <Router>
        <Toaster />
        <Header />
        <Routes>
          <Route path="/order" Component={OrderPage} />
          <Route path="/" Component={HomePage} />
          <Route path="/category/:id" Component={CategoryPage} />
          <Route path="/product/:id" Component={ProductPage} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
