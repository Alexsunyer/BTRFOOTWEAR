import { useCallback, useEffect, useState } from "react";
import { getDataApiJSON } from "../globals/petitions";
import { Product } from "../reducers/shoppingCart";

export const useGetAllProducts = ({}) => {
  const [products, setProducts] = useState<null | Product[]>(null);

  const getData = useCallback(async () => {
    const data = await getDataApiJSON("/api/product/getAllProducts", {});
    setProducts(data);
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  return { products };
};
