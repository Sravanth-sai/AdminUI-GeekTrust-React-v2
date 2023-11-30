import { useState, useContext } from "react";
import UserContext from "../../store/users-context";

import classes from "./UserRecords.module.css";
import RecordItem from "./RecordItem";
import UserDeleteModal from "../UserDeleteModal";

function Records(props) {
  const userCtx = useContext(UserContext);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userState, setUserState] = useState({});

  const recordDeleteHandler = (id, userName) => {
    setShowDeleteModal(true);
    setUserState({ id, userName });
    // userCtx.removeUser(id);
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
    //   setSelectedRecords(records);
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

  return (
    <>
      <div className={classes["table-container"]}>
        <table className={classes.records}>
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  name="Select-All"
                  onChange={selectChangeHandler}
                  checked={userCtx.allUsersSelected}
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
            {props.currentRecords.length > 0 &&
              props.currentRecords.map((record) => {
                return (
                  <RecordItem
                    key={record.id}
                    record={record}
                    deleteHandler={recordDeleteHandler}
                    selectChangeHandler={selectChangeHandler}
                    allSelected={userCtx.allUsersSelected}
                    isChecked={record.isChecked}
                  />
                );
              })}

            {props.currentRecords.length === 0 && (
              <tr className={classes.noRecords}>
                <td align="center" colSpan={5}>
                  {/* {props.isLoading && "Loading..."} */}
                  {props.isError
                    ? "Unable to fetch users at the moment, try again later!"
                    : "No records found!"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

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

export default Records;
