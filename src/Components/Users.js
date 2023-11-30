import { useState, useContext, useEffect } from "react";
import UserContext from "../store/users-context";
import Records from "./UserRecords/UserRecords";
import SearchBar from "./SearchBar/SearchBar";
import Footer from "./Footer";
import classes from "./Users.module.css";

function Users() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const userCtx = useContext(UserContext);

  useEffect(() => {
    setIsLoading(true);

    const fetchUsers = async () => {
      const response = await fetch(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      );

      if (!response.ok) {
        setHasError(true);
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
            isError={hasError}
            // isLoading={isLoading}
            // content={content}
          />
          <Footer
            currentPageUsers={currentPageUsers}
            totalPageNumbers={totalPageNumbers}
            currentPage={currentPage}
          />
        </div>
      )}
    </main>
  );
}

export default Users;
