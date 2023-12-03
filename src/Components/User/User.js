import { useState, useContext, useEffect } from "react";
import UserContext from "../../store/User/user-context";
import Table from "../Table/Table";
import Footer from "../Footer/Footer";
import classes from "./User.module.css";

function User() {
  console.log("USERS Rendered");

  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const userCtx = useContext(UserContext);

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);

    const fetchUsers = async () => {
      try {
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
      } catch (e) {
        setHasError(true);
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const currentPage = userCtx.currentPage;

  const usersPerPage = 10;
  const startIndex = (currentPage - 1) * usersPerPage;
  const lastIndex = currentPage * usersPerPage;

  const totalPageNumbers = userCtx.totalPageNumbers;
  const currentPageUsers = userCtx.fetchedUsers.slice(startIndex, lastIndex);
  // }

  // let content = <p>Loading...</p>;
  //
  // if (isLoading) {
  //   content = <p>Loading...</p>;
  // } else if (isError) {
  //   content = "Unable to fetch users at the moment, try again later!";
  // }

  return (
    // <main className={classes.mainContainer}>
    <>
      <main className={classes.detailsContainer}>
        {/* {isLoading && <p>Loading...</p>} */}
        {/* {isLoading && console.log("LOAING")} */}

        <Table
          currentRecords={currentPageUsers}
          isError={hasError}
          isLoading={isLoading}
          // content={content}
        />

        {!isLoading && !hasError && (
          <Footer
            currentPageUsers={currentPageUsers}
            totalPageNumbers={totalPageNumbers}
            currentPage={currentPage}
          />
          // </>
        )}
      </main>
    </>
    // </main>
  );
}

export default User;
