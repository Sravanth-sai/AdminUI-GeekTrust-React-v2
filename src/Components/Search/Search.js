import { useRef, useContext, useCallback, useMemo } from "react";

import UserContext from "../../store/User/user-context";

import classes from "./Search.module.css";

function Search(props) {
  const userCtx = useContext(UserContext);
  const searchRef = useRef(null);

  const searchHandler = (event) => {
    event.preventDefault();

    const timer = setTimeout(() => {
      userCtx.fetchUsers(searchRef.current.value);
    }, 500);
    return () => {
      clearTimeout(timer);
    };
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

export default Search;
