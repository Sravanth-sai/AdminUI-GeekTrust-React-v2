import { useState, useContext, useEffect } from "react";
import Pagination from "./util/Pagination";

import UserContext from "../store/users-context";

import classes from "./Users.module.css";
import Records from "./util/Records";
import SearchBar from "./UI/SearchBar";
import Button from "./UI/Button";
// import RecordsDup from "./util/RecordsDup";
// import TESTRecords from "./util/TEST_Records";

// const USERS = [
//   { id: 1, name: "name", email: "email", role: "role" },
//   { id: 2, name: "name", email: "email", role: "role" },
//   { id: 3, name: "name", email: "email", role: "role" },
//   { id: 4, name: "name", email: "email", role: "role" },
//   { id: 5, name: "name", email: "email", role: "role" },
//   { id: 6, name: "name", email: "email", role: "role" },
//   { id: 7, name: "name", email: "email", role: "role" },
//   { id: 8, name: "name", email: "email", role: "role" },
//   { id: 9, name: "name", email: "email", role: "role" },
//   { id: 10, name: "name", email: "email", role: "role" },
//   { id: 11, name: "name", email: "email", role: "role" },
//   { id: 12, name: "name", email: "email", role: "role" },
//   { id: 13, name: "name", email: "email", role: "role" },
//   { id: 14, name: "name", email: "email", role: "role" },
//   { id: 15, name: "name", email: "email", role: "role" },
//   { id: 16, name: "name", email: "email", role: "role" },
//   { id: 17, name: "name", email: "email", role: "role" },
//   { id: 18, name: "name", email: "email", role: "role" },
//   { id: 19, name: "name", email: "email", role: "role" },
//   { id: 20, name: "name", email: "email", role: "role" },
//   { id: 21, name: "name", email: "email", role: "role" },
//   { id: 22, name: "name", email: "email", role: "role" },
//   { id: 23, name: "name", email: "email", role: "role" },
//   { id: 24, name: "name", email: "email", role: "role" },
//   { id: 25, name: "name", email: "email", role: "role" },
//   { id: 26, name: "name", email: "email", role: "role" },
//   { id: 27, name: "name", email: "email", role: "role" },
//   { id: 28, name: "name", email: "email", role: "role" },
//   { id: 29, name: "name", email: "email", role: "role" },
//   { id: 30, name: "name", email: "email", role: "role" },
//   { id: 31, name: "name", email: "email", role: "role" },
//   { id: 32, name: "name", email: "email", role: "role" },
//   { id: 33, name: "name", email: "email", role: "role" },
//   { id: 34, name: "name", email: "email", role: "role" },
//   { id: 35, name: "name", email: "email", role: "role" },
//   { id: 36, name: "name", email: "email", role: "role" },
//   { id: 37, name: "name", email: "email", role: "role" },
//   { id: 38, name: "name", email: "email", role: "role" },
//   { id: 39, name: "name", email: "email", role: "role" },
//   { id: 40, name: "name", email: "email", role: "role" },
//   { id: 41, name: "name", email: "email", role: "role" },
//   { id: 42, name: "name", email: "email", role: "role" },
//   { id: 43, name: "name", email: "email", role: "role" },
//   { id: 44, name: "name", email: "email", role: "role" },
//   { id: 45, name: "name", email: "email", role: "role" },
//   { id: 46, name: "name", email: "email", role: "role" },
//   { id: 47, name: "name", email: "email", role: "role" },
//   { id: 48, name: "name", email: "email", role: "role" },
//   { id: 49, name: "name", email: "email", role: "role" },
//   { id: 50, name: "name", email: "email", role: "role" },
//   { id: 51, name: "name", email: "email", role: "role" },
//   { id: 52, name: "name", email: "email", role: "role" },
//   { id: 53, name: "name", email: "email", role: "role" },
//   { id: 54, name: "name", email: "email", role: "role" },
//   { id: 55, name: "name", email: "email", role: "role" },
//   { id: 56, name: "name", email: "email", role: "role" },
//   { id: 57, name: "name", email: "email", role: "role" },
//   { id: 58, name: "name", email: "email", role: "role" },
//   { id: 59, name: "name", email: "email", role: "role" },
//   { id: 60, name: "name", email: "email", role: "role" },
//   { id: 61, name: "name", email: "email", role: "role" },
//   { id: 62, name: "name", email: "email", role: "role" },
//   { id: 63, name: "name", email: "email", role: "role" },
//   { id: 64, name: "name", email: "email", role: "role" },
//   { id: 65, name: "name", email: "email", role: "role" },
//   { id: 66, name: "name", email: "email", role: "role" },
//   { id: 67, name: "name", email: "email", role: "role" },
//   { id: 68, name: "name", email: "email", role: "role" },
//   { id: 69, name: "name", email: "email", role: "role" },
//   { id: 70, name: "name", email: "email", role: "role" },
//   { id: 71, name: "name", email: "email", role: "role" },
//   { id: 72, name: "name", email: "email", role: "role" },
//   { id: 73, name: "name", email: "email", role: "role" },
//   { id: 74, name: "name", email: "email", role: "role" },
//   { id: 75, name: "name", email: "email", role: "role" },
//   { id: 76, name: "name", email: "email", role: "role" },
// ];

function Users() {
  //   const [users, setUsers] = useState([]);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [totalPageNumbers, setTotalPageNumbers] = useState(0);

  const [isLoading, setIsLoading] = useState(true);

  // const [deletedMultipleNow, setDeleteMultipleNow] = useState(false);

  const userCtx = useContext(UserContext);

  useEffect(() => {
    // setIsLoading(true);

    // console.log(userCtx.totalUserCount);
    const fetchUsers = async () => {
      //   const response = await fetch(
      //     "https://jsonplaceholder.typicode.com/users"
      //   );

      const response = await fetch(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      );

      if (!response.ok) {
        return;
      }

      const data = await response.json();

      // console.log("FETCH", isLoading);

      //   setUsers(data);
      userCtx.addUsersFirstTime(data);
      // userCtx.addUsersFirstTime(USERS);
      // console.log(data);
      setIsLoading(false);
    };
    // console.log(isLoading);

    fetchUsers();
  }, []);

  const currentPage = userCtx.currentPage;

  const usersPerPage = 10;
  const startIndex = (currentPage - 1) * usersPerPage;
  const lastIndex = startIndex + usersPerPage;

  //   const totalPageNumbers = Math.ceil(users.length / usersPerPage);

  // const totalPageNumbers = Math.ceil(userCtx.fetchedUserCount / usersPerPage));

  // useEffect(() => {
  //   setCurrentPage(1);
  // }, [userCtx]);

  const totalPageNumbers = userCtx.totalPageNumbers;

  //   const currentPageUsers = users.slice(startIndex, lastIndex);
  const currentPageUsers = userCtx.fetchedUsers.slice(startIndex, lastIndex);

  console.log("Current Page ", currentPage);
  // console.log(userCtx.currentPage);
  // console.log(userCtx.totalUserCount);
  // console.log(userCtx.totalPageNumbers);
  // console.log("Fetched => ", userCtx.fetchedUsers);
  console.log(startIndex);
  console.log(lastIndex);
  console.log("Current Page users ", currentPageUsers);

  console.log("Total Page Numbers ", totalPageNumbers);

  const prevPageHandler = ({ toFirst }) => {
    // event.preventDefault();

    if (currentPage > 1) {
      if (toFirst) {
        userCtx.changePage(1);
      } else {
        userCtx.changePage(currentPage - 1);
      }
    }
  };

  const nextPageHandler = ({ toLast }) => {
    // event.preventDefault();

    // if (!page.last) {

    // }

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
    console.log("DELETE FROM ", currentPageUsers);
    userCtx.removeSelectedUsers(currentPageUsers);
    // setDeleteMultipleNow(true);
    // setDeleteMultipleNow(false);
    // userCtx.selectedUsers.forEach((userId) => {
    //   userCtx.removeUser(userId);
    // });
  };

  return (
    <main className={classes.mainContainer}>
      {isLoading && <p>Loading...</p>}
      {/* {isLoading && console.log("LOADING...")} */}

      {/* {console.log(currentPageUsers)} */}
      {!isLoading && (
        <div className={classes.detailsContainer}>
          <SearchBar />

          <Records
            currentRecords={currentPageUsers}
            // deleteMultipleNow={deletedMultipleNow}
          />

          {/* <RecordsDup currentRecords={currentPageUsers} /> */}

          <div className={classes.footer}>
            <Button
              className={classes["button-del"]}
              // disabled={userCtx.}
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
