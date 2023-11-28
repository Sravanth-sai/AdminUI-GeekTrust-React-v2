import { useState, useContext } from "react";
import UserContext from "../../store/users-context";

import classes from "./RecordsDup.module.css";
import SearchRecords from "./SearchRecords";
import RecordsDupItems from "./RecordsDupItems";

function RecordsDup(props) {
  //   const [isEditing, setIsEditing] = useState(false);
  // const [isEditing, setIsEditing] = useState(false);
  // const [isEditing, setIsEditing] = useState(false);
  // const [isEditing, setIsEditing] = useState(false);

  //   const userCtx = useContext(UserContext);

  //   console.log("HERE ", props);

  const records = props.currentRecords;

  //   const recordEditHandler = () => {
  //     setIsEditing(true);
  //   };

  //   const recordDeleteHandler = (id) => {
  //     userCtx.removeUser(id);
  //   };

  return (
    <>
      <SearchRecords />
      <section className={classes.records}>
        <ul>
          <li>
            <ul>
              <li>
                <input type="checkbox" />
              </li>
              <li>Name</li>
              <li>Email</li>
              <li>Role</li>
              <li>Actions</li>
            </ul>
          </li>

          {/* <RecordsDup record={records} /> */}
          {console.log("HERE 2", records)}

          {records.length > 0 &&
            records.map((record) => {
              return (
                <li key={record.id}>
                  <ul>
                    <RecordsDupItems record={record} />
                  </ul>
                </li>
              );
            })}
        </ul>
      </section>
    </>
  );
}

export default RecordsDup;
