import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import "./categoryPage.sass";
import { CategoryProductsListing } from "./CategoryProductsListing";
import CategoriesListing from "../../components/specificComponents/CategoriesListing";
import { CategoryInfo } from "./types";
import { getDataApiJSON } from "../../utils/globals/petitions";

interface CategoryPageProps {}

const CategoryPage: React.FC<CategoryPageProps> = () => {
  const { categoryInfo, paramsID } = useCategoryPageLogic();

  if (!categoryInfo) {
    return null;
  }

  return (
    <div className="category-page">
      <CategoriesListing itemClass="categoryLeft" />
      <div className="container-right">
        <CategoryTitle name={categoryInfo.name} id={categoryInfo.id} />
        <CategoryProductsListing id={paramsID} />
      </div>
    </div>
  );
};

const useCategoryPageLogic = () => {
  const { id } = useParams();
  const [categoryInfo, setCategoryInfo] = useState<CategoryInfo | null>(null);
  const paramsID = id ? parseInt(id) : 0;

  const getData = useCallback(async () => {
    const result = await getDataApiJSON("/api/category/getCategoryInstance", {
      id: paramsID,
    });
    setCategoryInfo(result);
  }, [paramsID]);

  useEffect(() => {
    getData();
  }, [getData]);

  return { categoryInfo, paramsID };
};

interface CategoryTitleProps {
  name: string;
  id: number;
}

const CategoryTitle: React.FC<CategoryTitleProps> = ({ name, id }) => {
  return (
    <div className="category-title">
      <h1>{name}</h1>
      <img src={`/img_categories_${id}.jpg`} alt={name} />
    </div>
  );
};

export default CategoryPage;
