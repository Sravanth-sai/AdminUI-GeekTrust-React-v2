import { useState, useContext } from "react";

import UserContext from "../../store/users-context";

function RecordsDupItems(props) {
  const userCtx = useContext(UserContext);
  const [isEditing, setIsEditing] = useState(false);
  const record = props.record;

  const recordEditHandler = () => {
    setIsEditing(true);
  };

  const recordDeleteHandler = (id) => {
    userCtx.removeUser(id);
  };

  return (
    <>
      <li>
        <input type="checkbox" />
      </li>
      <li>{!isEditing ? record.name : <input value={record.name} />}</li>
      <li>{record.email}</li>
      <li>{record.role}</li>
      <li>
        <section>
          <button
            onClick={() => {
              recordEditHandler(record.id);
            }}
          >
            EDIT
          </button>
          <button
            onClick={() => {
              recordDeleteHandler(record.id);
            }}
          >
            DELETE
          </button>
        </section>
      </li>
    </>
  );
}

export default RecordsDupItems;
