import { useState, useContext, useEffect } from "react";
import Pagination from "./util/Pagination";

import UserContext from "../store/users-context";

import classes from "./Users.module.css";
import Records from "./util/Records";
import SearchBar from "./UI/SearchBar";
import Button from "./UI/Button";

function Users() {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const userCtx = useContext(UserContext);

  useEffect(() => {
    setIsLoading(true);

    const fetchUsers = async () => {
      //   const response = await fetch(
      //     "https://jsonplaceholder.typicode.com/users"
      //   );

      const response = await fetch(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      );

      if (!response.ok) {
        setIsError(true);
        setIsLoading(false);
        return;
      }

      const data = await response.json();
      userCtx.addUsersFirstTime(data);
      setIsLoading(false);
    };
    fetchUsers();
  }, []);

  const currentPage = userCtx.currentPage;

  const usersPerPage = 10;
  const startIndex = (currentPage - 1) * usersPerPage;
  const lastIndex = startIndex + usersPerPage;

  const totalPageNumbers = userCtx.totalPageNumbers;
  const currentPageUsers = userCtx.fetchedUsers.slice(startIndex, lastIndex);

  const prevPageHandler = ({ toFirst }) => {
    if (currentPage > 1) {
      if (toFirst) {
        userCtx.changePage(1);
      } else {
        userCtx.changePage(currentPage - 1);
      }
    }
  };

  const nextPageHandler = ({ toLast }) => {
    if (currentPage < totalPageNumbers) {
      if (toLast) {
        userCtx.changePage(totalPageNumbers);
      } else {
        userCtx.changePage(currentPage + 1);
      }
    }
  };

  const pageChangeHandler = (page) => {
    userCtx.changePage(page);
  };

  const deleteMultipleUsersHandler = () => {
    userCtx.removeSelectedUsers(currentPageUsers);
  };

  // let content = <p>Loading...</p>;
  //
  // if (isLoading) {
  //   content = <p>Loading...</p>;
  // } else if (isError) {
  //   content = "Unable to fetch users at the moment, try again later!";
  // }

  return (
    <main className={classes.mainContainer}>
      {isLoading && <p>Loading...</p>}
      {/* {isError && content} */}
      {!isLoading && (
        <div className={classes.detailsContainer}>
          <SearchBar />

          <Records
            currentRecords={currentPageUsers}
            isError={isError}
            // isLoading={isLoading}
            // content={content}
          />

          <div className={classes.footer}>
            <Button
              className={classes["button-del"]}
              isDisabled={currentPageUsers.length === 0}
              onClickHandler={deleteMultipleUsersHandler}
            >
              Delete Selected
            </Button>
            <Pagination
              onPrevPage={prevPageHandler}
              totalPageNumbers={totalPageNumbers}
              pageChange={pageChangeHandler}
              currentPage={currentPage}
              onNextPage={nextPageHandler}
            />
          </div>
        </div>
      )}
    </main>
  );
}

export default Users;
