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
        <li
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
        </li>
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
          <li
            className={`${classes.paginationItems}`}
            onClick={() => props.pageChange(currentPage - 1)}
            key={currentPage - 1}
          >
            {currentPage - 1}
          </li>
        )}
        <li
          className={`${classes.paginationItems} ${classes.activePage}`}
          onClick={() => props.pageChange(currentPage)}
          key={currentPage}
        >
          {currentPage}
        </li>
        {right && (
          <li
            className={`${classes.paginationItems}`}
            onClick={() => props.pageChange(currentPage + 1)}
            key={currentPage + 1}
          >
            {currentPage + 1}
          </li>
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
        onClick={() => {
          props.onPrevPage({ toFirst: true });
        }}
        disabled={props.currentPage === 1 || props.totalPageNumbers === 0}
      >
        &lt;&lt;
      </button>
      <button
        onClick={props.onPrevPage}
        disabled={props.currentPage === 1 || props.totalPageNumbers === 0}
      >
        {/* < */}
        {"<"}
      </button>
      <div className={classes["pages-container"]}>{content}</div>

      <button
        onClick={props.onNextPage}
        disabled={
          props.currentPage === props.totalPageNumbers ||
          props.totalPageNumbers === 0
        }
      >
        &gt;
      </button>
      <button
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
