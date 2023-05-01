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
import { Pagination } from "semantic-ui-react";

//? -------STYLED COMPONENTS--------
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

const Pages = styled.div`
  position: fixed;
  bottom: 1vh;
  margin: 3px auto;
  z-index: 100;
  width: 100vw;
  display: flex;
  justify-content: center;
`;
const Option = styled.option``;

//THESE ARE OPTIONS WHICH WE GIVE TO DROPDOWN COMPONENT
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
  const location = useLocation();
  const { id: categoryId, title } = location.state;
  const dispatch = useDispatch();
  const {
    products: allProducts,
    isLoading,
    pageDetails: { totalItems, itemsPerPage },
  } = useSelector((state) => state.product);

  //STATES
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState([]);
  const [sort, setSort] = useState("newest");
  const [pageLimit, setPageLimit] = useState(12);
  const [totalPages, setTotalPages] = useState(
    Math.ceil(totalItems / itemsPerPage)
  );

  //when component loads we get data as per limit
  useEffect(() => {
    getProductsByCategory(dispatch, categoryId, currentPage, pageLimit);
  }, [categoryId, dispatch, currentPage, pageLimit]);

  // Handle the click event when a page number is clicked
  const handlePageChange = (event, data) => {
    setCurrentPage(data.activePage);
  };
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
        // we pass the filter options and sort options to products
        <Products
          title={title}
          allProducts={allProducts}
          filters={filters}
          sort={sort}
        />
      )}
      <Pages>
        <Pagination
          activePage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          firstItem={null}
          lastItem={null}
          siblingRange={0}
          boundaryRange={0}
        />
        <span>&nbsp;</span>
        <Select onChange={(e) => setPageLimit(e.target.value)}>
          <Option value={12}> 12/page</Option>
          <Option value={24}> 24/page</Option>
          <Option value={36}> 36/page</Option>
        </Select>
      </Pages>
    </Container>
  );
};

export default ProductList;
