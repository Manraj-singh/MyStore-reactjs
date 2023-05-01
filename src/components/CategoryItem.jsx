import { Link } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../responsive";
import { IMAGES_BASE_URL } from "../constants/urls";

//? -------STYLED COMPONENTS--------

const Container = styled.div`
  flex: 1;
  margin: 3px;
  height: 70vh;
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  ${mobile({ height: "20vh" })}
`;

const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  color: white;
  margin-bottom: 20px;
`;

const Button = styled.button`
  border: none;
  padding: 10px;
  background-color: white;
  color: gray;
  cursor: pointer;
  font-weight: 600;
`;

//category card which contains category image ,name and see products button
const CategoryItem = ({ item }) => {
  return (
    <Container>
      <Link
        to={{
          pathname: `/category/${item.categoryName}`,
          state: { id: item.id, title: item.categoryName },
        }}
      >
        <Image src={`${IMAGES_BASE_URL}${item.categoryImages}`} />
        <Info>
          <Title>{item.categoryName}</Title>
          <Button>SEE PRODUCTS</Button>
        </Info>
      </Link>
    </Container>
  );
};

export default CategoryItem;
