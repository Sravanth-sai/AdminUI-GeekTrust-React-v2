import { useReducer } from "react";

import UserContext from "./users-context";

const initialState = {
  currentPage: 1,
  users: [], // For resetting fetched users to original State
  // userPerPage: 10, // To change users per page on the fly
  totalUserCount: 0,
  fetchedUsers: [],
  fetchedUserCount: 0,
  totalPageNumbers: 0,

  allUsersSelected: false,
  // selectedUsersCount: [],
};

const userReducer = (state, action) => {
  // Handles page change

  if (action.type === "CHANGE_PAGE") {
    return {
      ...state,
      fetchedUsers: state.users,
      currentPage: action.page,
      allUsersSelected: false,
    };
  }

  if (action.type === "FETCH_USERS_FIRST_TIME") {
    const updatedUsers = action.users.map((user) => {
      return { ...user, isChecked: false };
    });

    return {
      ...state,
      users: updatedUsers,
      totalUserCount: action.users.length,
      fetchedUsers: updatedUsers,
      fetchedUserCount: action.users.length,
      totalPageNumbers: Math.ceil(action.users.length / 10),
    };
  }

  // Handles Updation of Users

  if (action.type === "UPDATE_USER") {
    // To update total users list
    let updatedTotalUsers = state.users;
    // To update only fetched users (searched users)
    let updatedFetchedUsers = state.fetchedUsers;
    let i = 0;
    let j = 0;
    for (; i < state.totalUserCount; i++) {
      if (updatedTotalUsers[i].id === action.id) {
        break;
      }
    }
    updatedTotalUsers[i] = {
      id: action.id,
      ...action.updatedUser,
    };

    for (; j < state.fetchedUserCount; j++) {
      if (updatedFetchedUsers[j].id === action.id) {
        break;
      }
    }
    updatedFetchedUsers[j] = {
      id: action.id,
      ...action.updatedUser,
    };

    return {
      ...state,
      users: updatedTotalUsers,
      fetchedUsers: updatedFetchedUsers,
      allUsersSelected: false,
    };
  }

  // Handles Fetch Users by 'keyword'

  if (action.type === "FETCH_USERS") {
    if (action.key.trim() === "") {
      return {
        ...state,
        fetchedUsers: state.users,
        fetchedUserCount: state.totalUserCount,
        totalPageNumbers: Math.ceil(state.users.length / 10),
      };
    }

    const fetchedUsers = state.users.filter((user) => {
      return (
        user.name.toString().toLowerCase().includes(action.key) ||
        user.email.toString().toLowerCase().includes(action.key) ||
        user.role.toString().toLowerCase().includes(action.key)
      );
    });

    return {
      ...state,
      currentPage: 1,
      fetchedUsers,
      fetchedUserCount: fetchedUsers.length,
      totalPageNumbers: Math.ceil(fetchedUsers.length / 10),
      allUsersSelected: false,
    };
  }

  // Handles storing of selected users

  if (action.type === "UPDATE_SELECTED_USERS_LIST") {
    let users = state.fetchedUsers;

    // Creats a Map of users
    const usersMap = new Map(action.users.map((user) => [user.id, user]));

    const updatedFetchedUsers = users.map((user) =>
      usersMap.has(user.id) ? usersMap.get(user.id) : user
    );

    return {
      ...state,
      fetchedUsers: updatedFetchedUsers,
      allUsersSelected: action.allUsersSelected,
    };
  }

  // Handles deletion of User

  if (action.type === "REMOVE_USER") {
    let updatedTotalUsers = state.users;
    let updatedFetchedUsers = state.fetchedUsers;
    let currentPage = state.currentPage;

    updatedTotalUsers = state.users.filter((user) => {
      return user.id !== action.id;
    });

    updatedFetchedUsers = state.fetchedUsers.filter((user) => {
      return user.id !== action.id;
    });

    // if the last user of the last page was deleted, current page should be changed by -1

    if (Math.ceil(updatedFetchedUsers.length / 10) < state.totalPageNumbers) {
      currentPage -= 1;
    }

    const startIdx = (currentPage - 1) * 10;

    const allSelected = updatedFetchedUsers
      .slice(startIdx, startIdx + 10)
      .every((user) => user.isChecked);

    return {
      currentPage: currentPage,
      users: updatedTotalUsers,
      totalUserCount: updatedTotalUsers.length,
      fetchedUsers: updatedFetchedUsers,
      fetchedUserCount: updatedFetchedUsers.length,
      totalPageNumbers: Math.ceil(updatedFetchedUsers.length / 10),
      allUsersSelected: allSelected,
    };
  }

  // Handles deletion of Multiple selected users

  if (action.type === "REMOVE_SELECTED_USERS") {
    let updatedTotalUsers = state.users;

    let updatedFetchedUsers = state.fetchedUsers;
    let currentPage = state.currentPage;

    // To check if atleast one user is selected for deletion
    let isSelectedAny = false;

    const usersMap = new Map(
      action.users.map((user) => {
        isSelectedAny = isSelectedAny || user.isChecked;
        return [user.id, user];
      })
    );

    if (!isSelectedAny) {
      return { ...state };
    }

    updatedFetchedUsers = updatedFetchedUsers.filter(
      (user) => !usersMap.get(user.id)?.isChecked
    );

    updatedTotalUsers = updatedTotalUsers.filter(
      (user) => !usersMap.get(user.id)?.isChecked
    );

    if (
      Math.ceil(updatedTotalUsers.length / 10) < state.totalPageNumbers &&
      currentPage !== 1
    ) {
      currentPage -= 1;
    }

    return {
      currentPage: currentPage,
      users: updatedTotalUsers,
      fetchedUsers: updatedFetchedUsers,
      totalUserCount: updatedTotalUsers.length,
      fetchedUserCount: updatedFetchedUsers.length,
      totalPageNumbers: Math.ceil(updatedFetchedUsers.length / 10),
      allUsersSelected: false,
    };
  }
};

const UserProvider = (props) => {
  const [userState, dispatchUserAction] = useReducer(userReducer, initialState);

  //   useEffect(() => {
  //     const fetchUsers = async () => {
  //       //   const response = await fetch(
  //       //     "https://jsonplaceholder.typicode.com/users"
  //       //   );

  //       const response = await fetch(
  //         "https://jsonplaceholder.typicode.com/posts"
  //       );

  //       if (!response.ok) {
  //         return;
  //       }

  //       const data = await response.json();

  //       addUsersFirstTime(data);
  //       // setUsers(data);
  //     };
  //     fetchUsers();
  //   }, []);

  const changePage = (page) => {
    dispatchUserAction({
      type: "CHANGE_PAGE",
      page,
    });
  };

  const addUsersFirstTime = (userData) => {
    dispatchUserAction({
      type: "FETCH_USERS_FIRST_TIME",
      users: userData,
    });
  };

  const fetchUsers = (searchKey) => {
    dispatchUserAction({
      type: "FETCH_USERS",
      key: searchKey.toLowerCase(),
    });
  };

  const updateSelectedUsers = (users) => {
    dispatchUserAction({
      type: "UPDATE_SELECTED_USERS_LIST",
      users: users.selectedUsers,
      allUsersSelected: users.allSelected,
    });
  };

  const editUser = (id, updatedUser) => {
    dispatchUserAction({
      type: "UPDATE_USER",
      id,
      updatedUser,
    });
  };

  const removeUser = (id) => {
    dispatchUserAction({
      type: "REMOVE_USER",
      id,
    });
  };

  const removeSelectedUsers = (users) => {
    dispatchUserAction({
      type: "REMOVE_SELECTED_USERS",
      users,
    });
  };

  const userContext = {
    currentPage: userState.currentPage,
    users: userState.users,
    totalUserCount: userState.totalUserCount,
    fetchedUsers: userState.fetchedUsers,
    fetchedUserCount: userState.fetchedUserCount,
    totalPageNumbers: userState.totalPageNumbers,
    allUsersSelected: userState.allUsersSelected,
    // selectedUsers: userState.selectedUsers,
    changePage,
    addUsersFirstTime,
    fetchUsers,
    updateSelectedUsers,
    editUser: editUser,
    removeUser: removeUser,
    removeSelectedUsers,
  };

  return (
    <UserContext.Provider value={userContext}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
