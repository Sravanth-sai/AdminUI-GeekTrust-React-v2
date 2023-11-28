import { useState, useContext, useEffect } from "react";
import UserContext from "../../store/users-context";

import classes from "./Records.module.css";
import SearchBar from "../UI/SearchBar";
import RecordItem from "./RecordItem";
import DeleteModal from "../Modal/DeleteModal";

function Records(props) {
  const userCtx = useContext(UserContext);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userState, setUserState] = useState({});

  //   const [selectedRecords, setSelectedRecords] = useState([]);

  //   const [allRecordsSelected, setAllRecordsSelected] = useState(false);

  // const records = props.currentRecords;

  //   useEffect(() => {
  //     // const updatedRecords = records.map((record) => {
  //     //   return { ...record, isChecked: false };
  //     // });

  //     // setSelectedRecords(updatedRecords);
  //     setAllRecordsSelected(false);
  //   }, [props.currentPage]);

  // userCtx.updateSelectedUsers(selectedRecords);

  // selectedRecords.filter((record) => {
  //   return record.isChecked;
  // })
  // const a = selectedRecords.filter((record) => {
  //   return record.isChecked;
  // });

  // console.log(a);

  // userCtx.selectedUsers(selectedRecords.map((record) => {
  //   return record.isChecked ? record.id
  // })
  // );

  const recordDeleteHandler = (id, userName) => {
    setShowDeleteModal(true);
    setUserState({ id, userName });
    // userCtx.removeUser(id);
  };

  const confirmedRecordDeleteHandler = () => {
    console.log(userState);
    userCtx.removeUser(userState.id);
    setShowDeleteModal(false);
  };

  // const recordCheckedHandler = (id) => {
  //   const currentRecords = selectedRecords;
  //   currentRecords.push(id);
  //   setSelectedRecords(currentRecords);

  //   // console.log(selectedUsers);
  // };

  // const recordUnCheckedHandler = (id) => {
  //   const updatedRecords = selectedRecords.filter((recordId) => {
  //     return recordId !== id;
  //   });

  //   setSelectedRecords(updatedRecords);
  // };

  // const selectHandler = (event) => {
  //   if (event.target.checked) {
  //     userCtx.selectAllFetchedUsers();
  //   } else {
  //     userCtx.unSelectAllFetchedUsers();
  //   }

  //   // setAllRecordsSelected(event.target.checked);
  // };

  const selectChangeHandler = (event) => {
    const { name: eventName, checked: isChecked } = event.target;

    console.log(eventName, isChecked);

    // let allSelected = isChecked;

    if (eventName === "Select-All") {
      //   setAllRecordsSelected(isChecked);
      const records =
        props.currentRecords.map((record) => {
          return { ...record, isChecked: isChecked };
        }) || [];
      console.log(records);
      //   setSelectedRecords(records);
      const users = { selectedUsers: records, allSelected: isChecked };
      console.log("USERS ", users);
      userCtx.updateSelectedUsers(users);
    } else {
      let allSelected = true;
      const records =
        props.currentRecords?.map((record) => {
          let newRecord = record;
          if (record.id === eventName) {
            newRecord = { ...newRecord, isChecked };
          }
          allSelected = allSelected && newRecord.isChecked;
          return newRecord;
        }) || [];
      console.log("BEFORE ctx ", records);
      const users = { selectedUsers: records, allSelected };
      userCtx.updateSelectedUsers(users);
      //   setSelectedRecords(records);
      //   userCtx.updateSelectedUsers({ records, allSelected: false });
    }
  };

  console.log("ALL Selected ", userCtx.allUsersSelected);

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
                  className={classes["input-check"]}
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
                    // onChecked={recordCheckedHandler}
                    // onUnChecked={recordUnCheckedHandler}
                    allSelected={userCtx.allUsersSelected}
                    isChecked={record.isChecked}
                  />
                );
              })}

            {props.currentRecords.length === 0 && (
              // <tr style={{ height: "20px" }}>
              <tr className={classes.recorItem}>
                <td align="center" colSpan={5} rowSpan={10}>
                  No records found!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showDeleteModal && (
        <DeleteModal
          onClose={() => setShowDeleteModal(false)}
          user={userState.userName}
          deleteHandler={confirmedRecordDeleteHandler}
        />
      )}
    </>
  );
}

export default Records;
