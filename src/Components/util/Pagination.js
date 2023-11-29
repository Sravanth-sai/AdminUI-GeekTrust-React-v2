import classes from "./Pagination.module.css";

function Pagination(props) {
  const pageNumbers = [];

  for (let i = 1; i <= props.totalPageNumbers; i++) {
    pageNumbers.push(i);
  }

  let content;

  if (props.totalPageNumbers <= 5) {
    content = pageNumbers.map((item, idx) => {
      return (
        <div
          className={`${classes.paginationItems} ${
            props.currentPage === item ? `${classes.activePage}` : ""
          }`}
          onClick={() => {
            if (item !== props.currentPage) {
              props.pageChange(item);
            }
          }}
          key={idx}
        >
          {item}
        </div>
      );
    });
  } else {
    const left = props.currentPage !== 1;
    const right = !(props.currentPage === props.totalPageNumbers);
    const currentPage = props.currentPage;
    for (let i = 0; i < 3; i++) {}

    content = (
      <>
        {left && (
          <div
            className={`${classes.paginationItems}`}
            onClick={() => props.pageChange(currentPage - 1)}
            key={currentPage - 1}
          >
            {currentPage - 1}
          </div>
        )}
        <div
          className={`${classes.paginationItems} ${classes.activePage}`}
          onClick={() => props.pageChange(currentPage)}
          key={currentPage}
        >
          {currentPage}
        </div>
        {right && (
          <div
            className={`${classes.paginationItems}`}
            onClick={() => props.pageChange(currentPage + 1)}
            key={currentPage + 1}
          >
            {currentPage + 1}
          </div>
        )}
      </>
    );

    // content = pageNumbers.map((item, idx) => {
    //   return (
    //     <>
    //       <li
    //         className={`${classes.paginationItems} ${
    //           props.currentPage === item ? `${classes.activePage}` : ""
    //         }`}
    //         onClick={() => props.pageChange(props.currentPage - 1)}
    //         key={idx}
    //       >
    //         {item}
    //       </li>
    //       <li
    //         className={`${classes.paginationItems} ${
    //           props.currentPage === item ? `${classes.activePage}` : ""
    //         }`}
    //         onClick={() => props.pageChange(item)}
    //         key={idx}
    //       >
    //         {item}
    //       </li>
    //       <li
    //         className={`${classes.paginationItems} ${
    //           props.currentPage === item ? `${classes.activePage}` : ""
    //         }`}
    //         onClick={() => props.pageChange(props.currentPage + 1)}
    //         key={idx}
    //       >
    //         {item}
    //       </li>
    //     </>
    //   );
    // });
  }

  return (
    <section className={classes.pageNav}>
      <button
        className="first-page"
        onClick={() => {
          props.onPrevPage({ toFirst: true });
        }}
        disabled={props.currentPage === 1 || props.totalPageNumbers === 0}
      >
        &lt;&lt;
      </button>
      <button
        className="previous-page"
        onClick={props.onPrevPage}
        disabled={props.currentPage === 1 || props.totalPageNumbers === 0}
      >
        &lt;
      </button>
      {/* <div className={classes["pages-container"]}>{content}</div> */}
      {content}

      <button
        className="next-page"
        onClick={props.onNextPage}
        disabled={
          props.currentPage === props.totalPageNumbers ||
          props.totalPageNumbers === 0
        }
      >
        &gt;
      </button>
      <button
        className="last-page"
        onClick={() => {
          props.onNextPage({ toLast: true });
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
