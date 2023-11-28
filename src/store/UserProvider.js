import { useReducer } from "react";

import UserContext from "./users-context";

const initialState = {
  currentPage: 1,
  users: [], // For resetting fetched users to original State
  // userPerPage: 10,
  totalUserCount: 0,
  fetchedUsers: [],
  fetchedUserCount: 0,
  totalPageNumbers: 0,

  allUsersSelected: false,
  // selectedUsersCount: [],
};

const userReducer = (state, action) => {
  if (action.type === "CHANGE_PAGE") {
    return {
      ...state,
      fetchedUsers: state.users,
      currentPage: action.page,
      allUsersSelected: false,
    };
  }

  if (action.type === "FETCH_USERS_FIRST_TIME") {
    // console.log(action.users);
    const updatedUsers = action.users.map((user) => {
      return { ...user, isChecked: false };
    });

    // console.log("HERE ", updatedUsers);

    return {
      ...state,
      users: updatedUsers,
      totalUserCount: action.users.length,
      fetchedUsers: updatedUsers,
      fetchedUserCount: action.users.length,
      totalPageNumbers: Math.ceil(action.users.length / 10),
    };
  }

  // if (action.type === "UNSELECT_ALL_USERS") {
  //   return {
  //     ...state,
  //     selectedUsers: [],
  //   };
  // }

  if (action.type === "UPDATE_USER") {
    // console.log("UPDATE");
    let updatedTotalUsers = state.users;
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

  // Handles Fetch Users query

  if (action.type === "FETCH_USERS") {
    // console.log(action.key);

    console.log("HERE ", state.fetchedUsers);
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

    console.log("INSIDE SEARCH ", fetchedUsers);

    return {
      ...state,
      currentPage: 1,
      fetchedUsers,
      fetchedUserCount: fetchedUsers.length,
      totalPageNumbers: Math.ceil(fetchedUsers.length / 10),
      allUsersSelected: false,
    };
  }

  if (action.type === "UPDATE_SELECTED_USERS") {
    // const ids = action.users.map((user) => user.id);

    // const selectedUserIds = state.fetchedUsers.map((user) => {
    //   return user.id;
    // });

    // console.log(selectedUserIds);

    // console.log(ids);

    let users = state.fetchedUsers;

    console.log("IN Ctx ", action);
    console.log("IN FETCHED USERS ", users);

    const usersMap = new Map(action.users.map((e) => [e.id, e]));

    const updatedFetchedUsers = users.map((user) =>
      usersMap.has(user.id) ? usersMap.get(user.id) : user
    );

    // let a = [];
    // marr2.forEach((i) => a.push(i));

    // console.log("AAA ", a);

    // console.log("NEW ", marr2);

    return {
      ...state,
      fetchedUsers: updatedFetchedUsers,
      allUsersSelected: action.allUsersSelected,
    };

    // if (action.allSelected) {
    //   return {
    //     ...state,
    //     fetchedUsers: action.users,
    //     // selectedUsers: action.users,
    //   };
    // } else {
    //   let updatedFetchedUsers = state.fetchedUsers;
    //   // let updatedTotalUsers = state.users;

    //   updatedFetchedUsers = updatedFetchedUsers.map((user) => {
    //     console.log(user.id, action.users.id);
    //     if (user.id === action.users.id) {
    //       return action.user;
    //     }
    //     return user;
    //   });

    //   // updatedTotalUsers = updatedTotalUsers.map(user => {
    //   //   if (user.id === action.user.id) {
    //   //     return action.user;
    //   //   }
    //   //   return user;
    //   // });

    //   console.log("AFTER Ctx ", updatedFetchedUsers);

    //   return {
    //     ...state,
    //     // users: updatedTotalUsers,
    //     fetchedUsers: updatedFetchedUsers,
    //   };
    // }
  }

  if (action.type === "REMOVE_USER") {
    // console.log("REMOVE ", action.id);
    // console.log(state);
    let updatedTotalUsers = state.users;
    let updatedFetchedUsers = state.fetchedUsers;
    let currentPage = state.currentPage;

    updatedTotalUsers = state.users.filter((user) => {
      return user.id !== action.id;
    });

    updatedFetchedUsers = state.fetchedUsers.filter((user) => {
      return user.id !== action.id;
    });

    console.log("PROVIDER FETCHED => ", updatedFetchedUsers);

    // if the last user was deleted current page should be moved back
    if (Math.ceil(updatedFetchedUsers.length / 10) < state.totalPageNumbers) {
      currentPage -= 1;
    }

    const startIdx = (currentPage - 1) * 10;

    console.log("START ", startIdx);
    console.log(updatedFetchedUsers);
    console.log("CHECK ", updatedFetchedUsers.slice(startIdx, startIdx + 10));

    const allSelected = updatedFetchedUsers
      .slice(startIdx, startIdx + 10)
      .every((user) => user.isChecked);

    return {
      // ...state,
      currentPage: currentPage,
      users: updatedTotalUsers,
      totalUserCount: updatedTotalUsers.length,
      fetchedUsers: updatedFetchedUsers,
      fetchedUserCount: updatedFetchedUsers.length,
      totalPageNumbers: Math.ceil(updatedFetchedUsers.length / 10),
      allUsersSelected: allSelected,
    };
  }

  if (action.type === "REMOVE_SELECTED_USERS") {
    console.log("FOR deletion ", action.users);

    let updatedTotalUsers = state.users;

    let updatedFetchedUsers = state.fetchedUsers;
    let currentPage = state.currentPage;

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

    // updatedFetchedUsers = updatedFetchedUsers.filter(
    //   (user) => usersMap[user.id]?.isChecked || false
    //   // usersMap[user.id]?.isChecked || false
    //   // usersMap.has(user.id) ? usersMap.user.isChecked
    // );

    console.log("MAP ", usersMap);
    // console.log(usersMap.get(1));

    console.log("BEFORE DELETION ", updatedFetchedUsers);

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
  //       console.log(data);
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
      // key: searchKey,
      key: searchKey.toLowerCase(),
    });
  };

  const updateSelectedUsers = (users) => {
    dispatchUserAction({
      type: "UPDATE_SELECTED_USERS",
      users: users.selectedUsers,
      allUsersSelected: users.allSelected,
    });
  };

  const unSelectAllFetchedUsers = () => {
    // dispatchUserAction({
    //   type: "UNSELECT_ALL_USERS",
    // });
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
    // unSelectAllFetchedUsers: unSelectAllFetchedUsers,
    // removeSelectedUser: userState.removeSelectedUser,
  };

  return (
    <UserContext.Provider value={userContext}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
