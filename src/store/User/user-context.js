import React from "react";

const UserContext = React.createContext({
  currentPage: 1,
  users: [],
  totalUserCount: 0,
  fetchedUsers: [],
  fetchedUserCount: 0,
  totalPageNumbers: 0,
  allUsersSelected: false,
  selectedUserCount: 0,
  changePage: (page) => {},
  addUsersFirstTime: (users) => {},
  fetchUsers: (searchKey) => {},
  updateSelectedUsers: (users) => {},
  unSelectAllFetchedUsers: () => {},
  editUser: (id, newUser) => {},
  removeUser: (id) => {},
  removeSelectedUsers: (userIds) => {},
});

export default UserContext;
