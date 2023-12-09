import { useState, useContext, useEffect, useMemo } from "react";
import UserContext from "../../store/User/user-context";
import Table from "../Table/Table";
import Footer from "../Footer/Footer";
import classes from "./Card.module.css";

function Card() {
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
          throw new Error("Unable to fetch data");
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

  const currentPage = useMemo(() => {
    console.log("USE MEMO ", userCtx.currentPage);
    return userCtx.currentPage;
  }, [userCtx.currentPage]);

  const usersPerPage = 10;
  const startIndex = (currentPage - 1) * usersPerPage;
  const lastIndex = currentPage * usersPerPage;

  const totalPageNumbers = userCtx.totalPageNumbers;

  // const totalPageNumbers = useMemo(() => {
  //   return userCtx.totalPageNumbers;
  // }, [userCtx.totalPageNumbers]);

  const fetchedUsers = userCtx.fetchedUsers;

  // const fetchedUsers = useMemo(() => {
  //   return userCtx.fetchedUsers;
  // }, [userCtx.fetchedUsers]);

  const currentPageUsers = fetchedUsers.slice(startIndex, lastIndex);

  return (
    <main className={classes.container}>
      <Table
        currentRecords={currentPageUsers}
        isError={hasError}
        isLoading={isLoading}
      />
      {!isLoading && !hasError && currentPageUsers.length > 0 && (
        <Footer
          currentPageUsers={currentPageUsers}
          totalPageNumbers={totalPageNumbers}
          currentPage={currentPage}
        />
      )}
    </main>
  );
}

export default Card;
