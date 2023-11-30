import { useContext } from "react";
import UserContext from "../../store/users-context";
import Pages from "./Pages";
import classes from "./Pagination.module.css";

function Pagination(props) {
  const userCtx = useContext(UserContext);

  const onPrevPageHandler = ({ toFirst }) => {
    if (props.currentPage <= 1) {
      return;
    }
    if (toFirst) {
      userCtx.changePage(1);
    } else {
      userCtx.changePage(props.currentPage - 1);
    }
  };

  const onNextPageHandler = ({ toLast }) => {
    if (props.currentPage >= props.totalPageNumbers) {
      return;
    }
    if (toLast) {
      userCtx.changePage(props.totalPageNumbers);
    } else {
      userCtx.changePage(props.currentPage + 1);
    }
  };

  const pageChangeHandler = (page) => {
    userCtx.changePage(page);
  };

  return (
    <section className={classes.pageNav}>
      <button
        className={`${classes.paginationItems + " first-page"}`}
        onClick={() => {
          onPrevPageHandler({ toFirst: true });
        }}
        disabled={props.currentPage === 1 || props.totalPageNumbers === 0}
      >
        &lt;&lt;
      </button>
      <button
        className={`previous-page ${classes.paginationItems}`}
        onClick={() => onPrevPageHandler({ toFirst: false })}
        disabled={props.currentPage === 1 || props.totalPageNumbers === 0}
      >
        &lt;
      </button>
      {/* <div className={classes["pages-container"]}>{content}</div> */}
      <Pages
        totalPageNumbers={props.totalPageNumbers}
        currentPage={props.currentPage}
        onPageChange={pageChangeHandler}
      />

      <button
        className={`next-page ${classes.paginationItems}`}
        onClick={() => onNextPageHandler({ toLast: false })}
        disabled={
          props.currentPage === props.totalPageNumbers ||
          props.totalPageNumbers === 0
        }
      >
        &gt;
      </button>
      <button
        className={`last-page ${classes.paginationItems}`}
        onClick={() => {
          onNextPageHandler({ toLast: true });
        }}
        disabled={
          props.currentPage === props.totalPageNumbers ||
          props.totalPageNumbers === 0
        }
      >
        &gt;&gt;
      </button>
    </section>
  );
}

export default Pagination;
