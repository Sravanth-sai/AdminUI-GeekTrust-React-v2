import { useContext } from "react";
import UserContext from "../../store/User/user-context";
import Pages from "./Pages";
import classes from "./Pagination.module.css";
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaAngleLeft,
  FaAngleRight,
} from "react-icons/fa";

function Pagination(props) {
  console.log("PAGINATION Rendered");

  const userCtx = useContext(UserContext);

  const onFirstPageHandler = () => {
    if (props.currentPage <= 1) {
      return;
    }
    userCtx.changePage(1);
  };

  const onPrevPageHandler = () => {
    if (props.currentPage <= 1) {
      return;
    }
    userCtx.changePage(props.currentPage - 1);
  };

  const onLastPageHandler = () => {
    if (props.currentPage === props.totalPageNumbers) {
      return;
    }
    userCtx.changePage(props.totalPageNumbers);
  };

  const onNextPageHandler = () => {
    if (props.currentPage === props.totalPageNumbers) {
      return;
    }
    userCtx.changePage(props.currentPage + 1);
  };

  const pageChangeHandler = (page) => {
    userCtx.changePage(page);
  };

  return (
    <section className={classes.pageNav}>
      <button
        className={`${classes.paginationItems + " first-page"}`}
        onClick={onFirstPageHandler}
        disabled={props.currentPage === 1 || props.totalPageNumbers === 0}
      >
        <FaAngleDoubleLeft />
      </button>

      <button
        className={`previous-page ${classes.paginationItems}`}
        onClick={onPrevPageHandler}
        disabled={props.currentPage === 1 || props.totalPageNumbers === 0}
      >
        <FaAngleLeft />
      </button>
      {/* <div className={classes["pages-container"]}>{content}</div> */}
      <Pages
        totalPageNumbers={props.totalPageNumbers}
        currentPage={props.currentPage}
        onPageChange={pageChangeHandler}
      />

      <button
        className={`next-page ${classes.paginationItems}`}
        onClick={onNextPageHandler}
        disabled={
          props.currentPage === props.totalPageNumbers ||
          props.totalPageNumbers === 0
        }
      >
        <FaAngleRight />
      </button>
      <button
        className={`last-page ${classes.paginationItems}`}
        onClick={onLastPageHandler}
        disabled={
          props.currentPage === props.totalPageNumbers ||
          props.totalPageNumbers === 0
        }
      >
        <FaAngleDoubleRight />
      </button>
    </section>
  );
}

export default Pagination;
