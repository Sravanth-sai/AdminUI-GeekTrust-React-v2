import { useContext } from "react";
import UserContext from "../../store/User/user-context";
import Pagination from "../Pagination/Pagination";
import classes from "./Footer.module.css";

function Footer(props) {
  console.log("FOOTER Rendered");

  const { currentPageUsers, totalPageNumbers, currentPage } = props;

  const userCtx = useContext(UserContext);
  const deleteMultipleUsersHandler = () => {
    userCtx.removeSelectedUsers(userCtx.users);
  };

  let content = "";
  const usersSelected = userCtx.selectedUserCount;

  content = usersSelected > 0 ? usersSelected : "No";

  return (
    <div className={classes.footer}>
      <div className={classes.actions}>
        <span className={classes.actionsText}>
          <span className={`${usersSelected !== 0 ? `${classes.count}` : ""}`}>
            {content}
          </span>
          {` user(s) selected`}
        </span>
        <button
          className={classes["button-del"]}
          disabled={currentPageUsers.length === 0 || usersSelected === 0}
          onClick={deleteMultipleUsersHandler}
        >
          Delete Selected
        </button>
      </div>

      <Pagination
        totalPageNumbers={totalPageNumbers}
        currentPage={currentPage}
      />
    </div>
  );
}

export default Footer;
