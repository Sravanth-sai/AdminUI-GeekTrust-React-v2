import { useContext } from "react";
import UserContext from "../../store/User/user-context";
import Pagination from "../Pagination/Pagination";
import classes from "./Footer.module.css";

function Footer(props) {
  console.log("FOOTER Rendered");

  const userCtx = useContext(UserContext);

  const deleteMultipleUsersHandler = () => {
    // New line added
    // userCtx.removeSelectedUsers(props.currentPageUsers);
    userCtx.removeSelectedUsers(userCtx.users);
  };

  let content = "";
  const usersSelected = userCtx.selectedUserCount;

  content = usersSelected > 0 ? usersSelected : "No";

  console.log(
    "SELECTED USERS ",
    userCtx.selectedUsers,
    userCtx.selectedUsers === 0,
    props.currentPageUsers.length === 0
  );

  return (
    <div className={classes.footer}>
      <div className={classes.actions}>
        <span className={classes.items}>
          {console.log("COLOR ", usersSelected)}
          <span className={`${usersSelected !== 0 ? `${classes.count}` : ""}`}>
            {content}
          </span>{" "}
          {` user(s) selected`}
        </span>
        <button
          className={classes["button-del"]}
          disabled={props.currentPageUsers.length === 0 || usersSelected === 0}
          onClick={deleteMultipleUsersHandler}
        >
          Delete Selected
        </button>
      </div>

      <Pagination
        totalPageNumbers={props.totalPageNumbers}
        currentPage={props.currentPage}
      />
    </div>
  );
}

export default Footer;
