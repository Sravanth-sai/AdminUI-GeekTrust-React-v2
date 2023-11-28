import { useRef, useContext } from "react";

import UserContext from "../../store/users-context";

import classes from "./SearchBar.module.css";

function SearchBar(props) {
  const userCtx = useContext(UserContext);

  const searchRef = useRef(null);

  const searchHandler = (event) => {
    event.preventDefault();
    const searchInput = searchRef.current.value;

    userCtx.fetchUsers(searchInput);

    // searchRef.current.value = "";
  };

  return (
    <form onSubmit={searchHandler} className={classes.form}>
      <input
        placeholder="Search by name, email or role"
        ref={searchRef}
        onChange={searchHandler}
        className={classes.actions}
      />
    </form>
  );
}

export default SearchBar;
