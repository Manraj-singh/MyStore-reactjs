import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Products from "../components/Products";
import Loader from "../components/Loader";
import { mobile } from "../responsive";
import { useLocation } from "react-router";
import { useEffect, useState } from "react";
import { getProductsByCategory } from "../api";
import { useDispatch, useSelector } from "react-redux";
import DropdownMultiple from "../components/DropdownMultiple";

const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })}
`;
const Option = styled.option``;

const typeFilter = [
  { key: "readyProduct", text: "Ready Product", value: "readyProduct" },
  { key: "madeToOrder", text: "Made-To-Order", value: "madeToOrder" },
  { key: "whiteLabeling", text: "White-Labelling", value: "whiteLabeling" },
];
const attributeFilter = [
  { key: "ecoFriendly", text: "Eco-Friendly", value: "ecoFriendly" },
  { key: "prodoExclusive", text: "Prodo-Exclusive", value: "prodoExclusive" },
];

const ProductList = () => {
  const dispatch = useDispatch();
  const { products: allProducts, isLoading } = useSelector(
    (state) => state.product
  );
  const location = useLocation();
  const { id: categoryId, title } = location.state;
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState([]);
  const [sort, setSort] = useState("newest");

  useEffect(() => {
    getProductsByCategory(dispatch, categoryId, page);
  }, [categoryId, dispatch, page]);

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Title>{title}</Title>
      <FilterContainer>
        <Filter>
          <FilterText>
            Filter Products
            <small
              onClick={() => {
                setFilters([]);
              }}
            >
              (<u> reset</u>)
            </small>
            :
          </FilterText>
          <br />

          <DropdownMultiple
            options={typeFilter}
            filters={filters}
            setFilters={setFilters}
            name={"Type"}
          />
          <DropdownMultiple
            options={attributeFilter}
            name={"Attribute"}
            filters={filters}
            setFilters={setFilters}
          />
        </Filter>
        <Filter>
          <FilterText>Sort Products:</FilterText>
          <Select onChange={(e) => setSort(e.target.value)}>
            <Option value="newest">Newest</Option>
            <Option value="asc">Price (asc)</Option>
            <Option value="desc">Price (desc)</Option>
            <Option value="a-z">Alphabetically(a-z)</Option>
            <Option value="z-a">Alphabetically(z-a)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      {isLoading ? (
        <Loader />
      ) : (
        <Products
          title={title}
          allProducts={allProducts}
          filters={filters}
          sort={sort}
        />
      )}
    </Container>
  );
};

export default ProductList;
