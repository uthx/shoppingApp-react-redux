import React, { useState } from "react";
import styled from "styled-components";
import Badge from "@material-ui/core/Badge";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { categoryNames } from "../../redux/mockData";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import {
  filterCategoryAction,
  showAllProductsAction,
  searchAction,
} from "../../redux/ducks/catalouge";
const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}))(Badge);

const NavBar = ({ setSelectedBrand, setCategory }) => {
  const dispatch = useDispatch();
  const { productsInCart } = useSelector((state) => state.reducer);
  //state
  const [searchProduct, setSearchProduct] = useState("");

  //handler functions
  const handleClick = (category) => {
    console.log(category);

    if (category === "all") {
      dispatch(showAllProductsAction(category));
    } else {
      dispatch(filterCategoryAction(category));
    }

    setSelectedBrand({});

    setCategory(category);
  };

  const searchHandler = (e) => {
    setSearchProduct(e.target.value);
  };
  const searchSubmit = (e) => {
    dispatch(searchAction(searchProduct));
    setSearchProduct("");
    console.log("dispatched");
  };
  //helper functions
  let capitalize = (words) => {
    let separateWord = words.toLowerCase().split(" ");
    for (var i = 0; i < separateWord.length; i++) {
      separateWord[i] =
        separateWord[i].charAt(0).toUpperCase() + separateWord[i].substring(1);
    }
    return separateWord.join(" ");
  };

  return (
    <Container>
      <div className="navLinks">
        <Logo>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSohwEZCjdhBNxMxcVobbyNdbcKDfBCJd7flQ&usqp=CAU"
            alt="Logo"
          />
        </Logo>
        <Categories>
          {categoryNames.map((category) => {
            return (
              <div key={uuidv4()}>
                <p onClick={() => handleClick(category)} key={uuidv4()}>
                  {capitalize(category)}
                </p>
              </div>
            );
          })}
        </Categories>
        <SearchBar>
          <div>
            <button onClick={searchSubmit}>Search</button>
            <input
              type="text"
              id="search1"
              placeholder="Search Products"
              value={searchProduct}
              onChange={searchHandler}
            />
          </div>
        </SearchBar>
      </div>

      <div className="cart">
        <Link to="/cart" style={{ textDecoration: "none" }}>
          <IconButton aria-label="cart">
            <StyledBadge badgeContent={productsInCart.length} color="secondary">
              <ShoppingCartIcon style={{ width: "30px", height: "30px" }} />
            </StyledBadge>
          </IconButton>
        </Link>
      </div>
    </Container>
  );
};

export default NavBar;
const Container = styled.div`
  display: flex;
  padding: 5px;
  border: 1px solid red;
  .cart {
    padding: 7px;
    border-radius: 5px;
    cursor: pointer;
    margin-right: 15px;
  }
  justify-content: space-between;
  .navLinks {
    display: flex;
  }
`;

const Categories = styled.div`
  display: flex;
  padding: 10px;
  margin: auto 0;
  p {
    font-size: 1rem;
    padding: 5px;
    margin: 0 5px;
    cursor: pointer;
    font-weight: 600;
    &:hover {
      color: #777676;
    }
  }
`;

const Logo = styled.div`
  img {
    height: 3rem;
    width: 3rem;
  }
  padding: 10px;
`;
const SearchBar = styled.div`
  padding: 10px;
  margin: auto 10px;
  padding: 10px;
  label {
    font-size: 1rem;
    font-weight: 600;
  }
  input {
    padding: 5px;
    border: 1px solid black;
    font-size: 1rem;
  }
  button {
    padding: 5px;
    font-size: 1rem;
    color: black;
    background-color: #f1eded;
    cursor: pointer;
    border: 1px solid black;
    border-radius: 5px;
    margin: 0 5px;
    &:hover {
      color: black;
      background-color: lightgray;
      font-weight: 500;
    }
  }
`;
