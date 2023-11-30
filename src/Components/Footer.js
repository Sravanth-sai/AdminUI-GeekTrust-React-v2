import { useContext } from "react";
import UserContext from "../store/users-context";
import Pagination from "./Pagination/Pagination";
import Button from "./UI/Button";

import classes from "./Footer.module.css";

function Footer(props) {
  const userCtx = useContext(UserContext);

  const deleteMultipleUsersHandler = () => {
    userCtx.removeSelectedUsers(props.currentPageUsers);
  };

  return (
    <div className={classes.footer}>
      <Button
        className={classes["button-del"]}
        isDisabled={props.currentPageUsers.length === 0}
        onClickHandler={deleteMultipleUsersHandler}
      >
        Delete Selected
      </Button>
      <Pagination
        totalPageNumbers={props.totalPageNumbers}
        currentPage={props.currentPage}
      />
    </div>
  );
}

export default Footer;
