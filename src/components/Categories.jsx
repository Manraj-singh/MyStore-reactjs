import styled from "styled-components";
import { mobile } from "../responsive";
import CategoryItem from "./CategoryItem";
import { useEffect } from "react";
import { getAllcategories } from "../api";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
const Container = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
  ${mobile({ padding: "0px", flexDirection: "column" })}
`;

const Categories = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories);
  useEffect(() => {
    getAllcategories(dispatch);
  }, [dispatch]);

  const { isLoading } = useSelector((state) => state.category);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <h2>Categories:</h2>
      <br />
      <Container>
        {categories?.map((item) => (
          <CategoryItem item={item} key={item.id} />
        ))}
      </Container>
    </>
  );
};

export default Categories;
