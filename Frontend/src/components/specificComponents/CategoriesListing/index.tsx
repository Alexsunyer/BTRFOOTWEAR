import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./categoriesListing.sass";
import { getDataApiJSON } from "../../../utils/globals/petitions";
import { Category } from "./types";

interface CategoriesListingProps {
  itemClass: string;
}

const CategoriesListing: React.FC<CategoriesListingProps> = ({ itemClass }) => {
  const { categories } = useCategoriesListingLogic();
  const renderThis: JSX.Element[] = [];

  if (categories) {
    for (let item of categories) {
      renderThis.push(
        <IndividualCategory
          itemClass={itemClass}
          id={item.id}
          name={item.name}
          key={item.id}
        />
      );
    }
  }

  return <div className={`categories-listing ` + itemClass}>{renderThis}</div>;
};

export const useCategoriesListingLogic = () => {
  const [categories, setCategories] = useState<null | Category[]>(null);

  const getData = useCallback(async () => {
    const data = await getDataApiJSON("/api/category/getAllCategories", {});
    setCategories(data);
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  return { categories };
};

interface IndividualCategoryProps {
  id: number;
  name: string;
  itemClass: string;
}

const IndividualCategory: React.FC<IndividualCategoryProps> = ({
  id,
  name,
  itemClass,
}) => {
  return (
    <Link className={`individual-${itemClass}`} to={"/category/" + id}>
      <p>{name}</p>
    </Link>
  );
};

export default CategoriesListing;
