import { useCallback, useEffect, useState } from "react";
import { getDataApiJSON } from "../globals/petitions";
import { ShoppingCart } from "../../components/baseComponents/Header/HeaderRight/shoppingCartHeader/types";

interface GetShoppingCartByIdProps {
  id: number;
}

export const useGetShoppingCartById = ({ id }: GetShoppingCartByIdProps) => {
  const [shoppingCart, setShoppingCart] = useState<ShoppingCart | null>(null);

  const getData = useCallback(async () => {
    const data = await getDataApiJSON(
      "/api/shoppingCart/getShoppingCartInstance",
      { id }
    );
    setShoppingCart(data);
  }, [id]);

  useEffect(() => {
    getData();
  }, [getData]);

  return { shoppingCart };
};
