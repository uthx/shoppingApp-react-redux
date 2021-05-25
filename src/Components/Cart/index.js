import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { removeFromCart } from "../../redux/ducks/catalouge";
const Cart = () => {
  const { productsInCart } = useSelector((state) => state.reducer);
  const dispatch = useDispatch();
  const cartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {};

  return (
    <MainContainer>
      <div class="cartTitle">
        <p>Cart:</p>
      </div>

      {productsInCart.length ? (
        <div className="productsInCart">
          {productsInCart.map((product) => {
            return (
              <Container>
                <ProductDetails>
                  <div className="brandName">
                    <p>{product.brand}:</p>
                  </div>
                  <div className="productTitle">
                    <p>{product.title}</p>
                  </div>
                </ProductDetails>
                <ProductImage>
                  <img src={product.image} alt={product.title} />
                </ProductImage>
                <ProductPrice>
                  <p className="productPrice">Price: ${product.price}</p>
                </ProductPrice>
                <ProductAction>
                  <div>
                    <button
                      className="buyNow"
                      onClick={() => cartHandler(product.id)}
                    >
                      Remove From Cart
                    </button>
                  </div>
                </ProductAction>
              </Container>
            );
          })}
          <div className="checkoutDiv">
            <Link to="/checkout" style={{ textDecoration: "none" }}>
              <button onClick={checkoutHandler}>Checkout</button>
            </Link>
          </div>
          <div className="postCheckout">
            <p>We Have More Stuff for You!</p>
            <Link to="/">
              <p>Visit Home</p>
            </Link>
          </div>
        </div>
      ) : (
        <div className="notFound">
          <p>Nothing Added in cart. Please select Products first.</p>
          <Link to="/home">
            <p>Visit Products Page</p>
          </Link>
        </div>
      )}
    </MainContainer>
  );
};

export default Cart;
const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 20px;
  .cartTitle p {
    font-size: 1.5rem;
    text-align: center;
    border-bottom: 2px solid black;
  }
  .notFound p {
    font-size: 1.5rem;
    text-align: center;
  }
  .productsInCart {
    text-align: center;
  }
  .checkoutDiv {
    padding: 10px;
    & button {
      cursor: pointer;
    }
  }
  .checkoutDiv button {
    font-size: 1rem;
    padding: 5px;
    color: white;
    background: #fe8c00; /* fallback for old browsers */
    background: -webkit-linear-gradient(
      to right,
      #f83600,
      #fe8c00
    ); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(
      to right,
      #f83600,
      #fe8c00
    ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }
  .postCheckout {
    padding: 10px;
    text-align: center;
    p {
      font-size: 1rem;
      padding: 10px;
      font-weight: 600;
    }
  }
`;

const Container = styled.div`
  border: 1px solid black;
  display: flex;
  padding: 10px;
  flex-direction: column;
  width: 20%;
  max-width: 20rem;
  margin: 0 auto;
  p {
    font-size: 0.8rem;
    line-height: 1.4;
    font-weight: 500;
    color: #292828;
  }
`;

const ProductDetails = styled.div`
  border: 1px solid black;
  border-radius: 5px;
  display: flex;
  padding: 2px;

  .brandName p {
    font-size: 0.9rem;
  }
  & > div {
    padding: 3px;
  }
`;

const ProductImage = styled.div`
  border: 1px solid black;
  border-radius: 5px;
  padding: 5px;
  text-align: center;
  /* img {
    height: 95%;
    width: 95%;
  } */
  img {
    height: 10rem;
    width: 10rem;
  }
`;
const ProductPrice = styled.div`
  border: 1px solid black;
  text-align: center;
  padding: 5px;
  & .productPrice {
    font-size: 1rem;
  }
`;

const ProductAction = styled.div`
  border: 1px solid white;
  display: flex;
  padding: 8px;
  justify-content: space-around;
  button {
    padding: 5px;
    font-size: 1rem;
    border-radius: 5px;
    cursor: pointer;
  }
  .buyNow,
  .addToCart {
    &:hover {
    }
    color: white;
    background: #fc354c; /* fallback for old browsers */
    background: #24c6dc; /* fallback for old browsers */
    background: -webkit-linear-gradient(
      to right,
      #514a9d,
      #24c6dc
    ); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(
      to right,
      #514a9d,
      #24c6dc
    ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }
  .removeFromCart {
    color: white;
    background: #fe8c00; /* fallback for old browsers */
    background: -webkit-linear-gradient(
      to right,
      #f83600,
      #fe8c00
    ); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(
      to right,
      #f83600,
      #fe8c00
    ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }
`;
