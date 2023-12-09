import { useState, useContext, useEffect } from "react";
import UserContext from "../../store/User/user-context";
import classes from "./Table.module.css";
import TableItem from "./TableItem";
import UserDeleteModal from "../User/UserDeleteModal";
import UserEditProvider from "../../store/UserEdit/UserEditProvider";

function Table(props) {
  const userCtx = useContext(UserContext);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userState, setUserState] = useState({});
  const [isAllSelected, setIsAllSelected] = useState(userCtx.allUsersSelected);

  useEffect(() => {
    setIsAllSelected(
      props.currentRecords.length > 0 &&
        props.currentRecords.every((user) => user.isChecked)
    );
  }, [props.currentRecords]);

  const recordDeleteHandler = (id, userName) => {
    setShowDeleteModal(true);
    setUserState({ id, userName });
  };

  const confirmedRecordDeleteHandler = () => {
    userCtx.removeUser(userState.id);
    setShowDeleteModal(false);
  };

  // Handles selction of all users and calls the update func using context
  const selectAllUsers = (isChecked) => {
    const records = props.currentRecords.map((record) => {
      return { ...record, isChecked: isChecked };
    });
    const users = { selectedUsers: records, allSelected: isChecked };
    userCtx.updateSelectedUsers(users);
  };

  // Handles selction of single user

  const selectUser = (eventName, isChecked) => {
    // To check the shortcut checkbox when all fetched users are selected by maintaining it's state
    let allSelected = true;
    const records = props.currentRecords.map((record) => {
      let newRecord = record;
      if (record.id === eventName) {
        newRecord = { ...newRecord, isChecked };
      }
      allSelected = allSelected && newRecord.isChecked;
      return newRecord;
    });
    const users = { selectedUsers: records, allSelected };
    userCtx.updateSelectedUsers(users);
  };

  const selectChangeHandler = (event) => {
    const { name: eventName, checked: isChecked } = event.target;
    if (eventName === "Select-All") {
      selectAllUsers(isChecked);
    } else {
      selectUser(eventName, isChecked);
    }
  };

  let content = "No records found.";

  if (props.isError) {
    content = "Unable to fetch users at the moment, try again later!";
  } else if (props.isLoading) {
    content = "Loading...";
  }

  return (
    <>
      <table className={classes.records}>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                name="Select-All"
                onChange={selectChangeHandler}
                checked={isAllSelected}
                className={classes.recordCheckbox}
                disabled={props.currentRecords.length === 0}
              />
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          <UserEditProvider>
            {props.currentRecords.length > 0 &&
              props.currentRecords.map((record) => {
                return (
                  <TableItem
                    key={record.id}
                    record={record}
                    deleteHandler={recordDeleteHandler}
                    selectChangeHandler={selectChangeHandler}
                    allSelected={userCtx.allUsersSelected}
                    isChecked={record.isChecked}
                  />
                );
              })}
          </UserEditProvider>

          {props.currentRecords.length === 0 && (
            <tr className={classes.noRecords}>
              <td align="center" colSpan={5}>
                <p className={classes.status}>{content}</p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {showDeleteModal && (
        <UserDeleteModal
          onClose={() => setShowDeleteModal(false)}
          user={userState.userName}
          deleteHandler={confirmedRecordDeleteHandler}
        />
      )}
    </>
  );
}

export default Table;
