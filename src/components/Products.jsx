import { useEffect, useState } from "react";
import styled from "styled-components";
import Product from "./Product";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;
//WE GET FILTER AND SORTIING OPTIONS IN THIS COMPONENT
//WE USE REDUX STATE TO SORT AND FILTER PRODUCTS
const Products = ({ title, allProducts, filters, sort }) => {
  const [filteredProducts, setFilteredProducts] = useState([...allProducts]);

  //*FOR SORTING BASED ON GIVEN CONDITION
  useEffect(() => {
    switch (sort) {
      case "newest":
        setFilteredProducts(
          [...allProducts].sort((a, b) => {
            a = a.date;
            b = b.date;
            return a.localeCompare(b);
          })
        );
        break;

      case "asc":
        setFilteredProducts(
          [...allProducts].sort(
            (a, b) => a.variants[0].price - b.variants[0].price
          )
        );
        break;
      case "desc":
        setFilteredProducts(
          [...allProducts].sort(
            (a, b) => b.variants[0].price - a.variants[0].price
          )
        );
        break;
      case "a-z":
        setFilteredProducts(
          [...allProducts].sort((a, b) => {
            a = a.productName;
            b = b.productName;
            return a.localeCompare(b);
          })
        );
        break;
      case "z-a":
        setFilteredProducts(
          [...allProducts].sort((a, b) => {
            a = a.productName;
            b = b.productName;
            return b.localeCompare(a);
          })
        );
        break;
      default:
        break;
    }
  }, [sort, allProducts]);

  //*FOR FILTERING , IT RETURNS ALL PRODUCTS WHICH FULLFILLS ALL FILTER CONDITION
  useEffect(() => {
    const filtered = allProducts.filter((product) =>
      filters.every((filter) => product[filter])
    );

    setFilteredProducts(filtered);
  }, [filters, allProducts]);

  return (
    <Container>
      {filteredProducts?.length === 0
        ? "No Products found"
        : filteredProducts?.map((item) => (
            <Product item={item} key={item.id} />
          ))}
    </Container>
  );
};

export default Products;
