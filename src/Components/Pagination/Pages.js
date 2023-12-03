import classes from "./Pages.module.css";

function Pages(props) {
  console.log("PAGES (NUMBERS) Rendered");

  const { currentPage, totalPageNumbers } = props;

  let pageNumbers = [];

  for (let i = 1; i <= totalPageNumbers; i++) {
    pageNumbers.push(i);
  }

  let content;
  // To handle if no. of pages is high

  if (totalPageNumbers <= 5) {
    content = pageNumbers.map((item, idx) => {
      return (
        <button
          className={`${classes.paginationItems} ${classes.page} ${
            currentPage === item ? `${classes.activePage}` : ""
          }`}
          onClick={() => {
            if (item !== currentPage) {
              props.onPageChange(item);
            }
          }}
          key={idx}
        >
          {item}
        </button>
      );
    });
  } else {
    const left = currentPage !== 1;
    const right = !(currentPage === totalPageNumbers);
    for (let i = 0; i < 3; i++) {}

    content = (
      <>
        {left && (
          <button
            className={`${classes.paginationItems} ${classes.page}`}
            onClick={() => props.onPageChange(currentPage - 1)}
            key={currentPage - 1}
          >
            {currentPage - 1}
          </button>
        )}
        <button
          className={`${classes.paginationItems} ${classes.page} ${classes.activePage}`}
          // onClick={() => props.onPageChange(currentPage)}
          key={currentPage}
        >
          {currentPage}
        </button>
        {right && (
          <button
            className={`${classes.paginationItems} ${classes.page}`}
            onClick={() => props.onPageChange(currentPage + 1)}
            key={currentPage + 1}
          >
            {currentPage + 1}
          </button>
        )}
      </>
    );
  }

  return <>{content}</>;
}

export default Pages;
