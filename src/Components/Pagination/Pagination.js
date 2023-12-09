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
  const { currentPage, totalPageNumbers } = props;
  const userCtx = useContext(UserContext);
  const onFirstPageHandler = () => {
    if (currentPage <= 1) {
      return;
    }
    userCtx.changePage(1);
  };

  const onPrevPageHandler = () => {
    if (currentPage <= 1) {
      return;
    }
    userCtx.changePage(currentPage - 1);
  };

  const onLastPageHandler = () => {
    if (currentPage === totalPageNumbers) {
      return;
    }
    userCtx.changePage(totalPageNumbers);
  };

  const onNextPageHandler = () => {
    if (currentPage === totalPageNumbers) {
      return;
    }
    userCtx.changePage(currentPage + 1);
  };

  const pageChangeHandler = (page) => {
    userCtx.changePage(page);
  };

  return (
    <section className={classes.pageNav}>
      <button
        aria-label="Go to first page"
        className={`${classes.paginationItems + " first-page"}`}
        onClick={onFirstPageHandler}
        disabled={currentPage === 1 || totalPageNumbers === 0}
      >
        <FaAngleDoubleLeft />
      </button>

      <button
        aria-label="Go to previous page"
        className={`previous-page ${classes.paginationItems}`}
        onClick={onPrevPageHandler}
        disabled={currentPage === 1 || totalPageNumbers === 0}
      >
        <FaAngleLeft />
      </button>
      <Pages
        totalPageNumbers={totalPageNumbers}
        currentPage={currentPage}
        onPageChange={pageChangeHandler}
      />

      <button
        aria-label="Go to next page"
        className={`next-page ${classes.paginationItems}`}
        onClick={onNextPageHandler}
        disabled={currentPage === totalPageNumbers || totalPageNumbers === 0}
      >
        <FaAngleRight />
      </button>
      <button
        aria-label="Go to last page"
        className={`last-page ${classes.paginationItems}`}
        onClick={onLastPageHandler}
        disabled={currentPage === totalPageNumbers || totalPageNumbers === 0}
      >
        <FaAngleDoubleRight />
      </button>
    </section>
  );
}

export default Pagination;
