import { useState, useContext, useEffect } from "react";
import UserContext from "../../store/users-context";

import classes from "./RecordItem.module.css";
import Button from "../UI/Button";
// import SearchRecords from "./SearchRecords";

function RecordItem(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [isInvalidEdit, setIsInvalidEdit] = useState(false);

  // const [isChecked, setIsChecked] = useState(props.allSelected);

  // const [isDeleting, setIdDeleting] = useState(false);

  const userCtx = useContext(UserContext);

  const record = props.record;

  const [updatedName, setUpdatedName] = useState(record.name);
  const [updatedEmail, setUpdatedEmail] = useState(record.email);
  const [updatedRole, setUpdatedRole] = useState(record.role);

  useEffect(() => {
    setIsInvalidEdit(
      updatedName.trim() === "" ||
        updatedEmail.trim() === "" ||
        updatedRole.trim() === ""
    );
  }, [updatedEmail, updatedName, updatedRole]);

  const nameChangeHandler = (event) => {
    event.preventDefault();

    setUpdatedName(event.target.value);
    // setUpdatedName(nameInput.current.value);

    // setIsInvalidEdit(event.target.value === "");

    // checkInvalidInput(event.target.value === "");
    // checkInvalidInput();
  };

  const emailChangeHandler = (event) => {
    event.preventDefault();

    setUpdatedEmail(event.target.value);
    // setIsInvalidEdit(event.target.value === "");

    // checkInvalidInput(event.target.value === "");
    // checkInvalidInput();

    // setIsInvalidEdit(event.target.value.trim().length === 0);
  };

  const roleChangeHandler = (event) => {
    event.preventDefault();

    setUpdatedRole(event.target.value);
    // setIsInvalidEdit(event.target.value === "");

    // checkInvalidInput(event.target.value === "");
    // checkInvalidInput();

    // setIsInvalidEdit(event.target.value.trim().length === 0);
  };

  const recordEditHandler = () => {
    setIsEditing(true);
  };

  const recordSaveHandler = () => {
    if (
      updatedName.trim().length === 0 ||
      updatedEmail.trim().length === 0 ||
      updatedRole.trim().length === 0
      // nameInput.current.value.trim().length === 0 ||
      // emailInput.current.value.trim().length === 0 ||
      // roleInput.current.value.trim().length === 0
    ) {
      setIsInvalidEdit(true);
      return;
    }

    userCtx.editUser(record.id, {
      name: updatedName,
      email: updatedEmail,
      role: updatedRole,
      // name: nameInput.current.value,
      // email: emailInput.current.value,
      // role: roleInput.current.value,
      isChecked: false,
    });
    setIsEditing(false);
  };

  const recordItemDeleteHandler = (id, username) => {
    props.deleteHandler(id, username);

    // userCtx.removeUser(id);
  };

  const selectChangeHandler = (event) => {
    // setIsChecked(event.target.checked);
    // console.log(event.target.checked);

    props.selectChangeHandler(event);

    // event.target.checked
    //   ? props.onChecked(record.id)
    //   : props.onUnChecked(record.id);
  };

  let content = (
    <Button
      className={`${classes.actions} ${classes["actions-alter"]}`}
      onClickHandler={() => {
        recordEditHandler(record.id);
      }}
    >
      Edit
    </Button>
  );

  if (isEditing) {
    content = (
      <Button
        className={`${classes.actions} ${classes["actions-alter"]}`}
        isDisabled={isInvalidEdit}
        onClickHandler={() => {
          recordSaveHandler(record.id);
        }}
      >
        Save
      </Button>
    );
  }

  return (
    <tr key={record.id} className={classes.recordItem}>
      <td>
        <input
          type="checkbox"
          name={record.id}
          onChange={selectChangeHandler}
          className={classes.recordCheckbox}
          // checked={props.allSelected}
          checked={props.isChecked}
        />
      </td>
      <td>
        {!isEditing ? (
          record.name
        ) : (
          <input
            onChange={nameChangeHandler}
            value={updatedName}
            className={classes.recordInput}
            name="name"
          />
        )}
      </td>
      <td>
        {!isEditing ? (
          record.email
        ) : (
          <input
            onChange={emailChangeHandler}
            value={updatedEmail}
            className={classes.recordInput}
            name="email"
          />
        )}
      </td>
      <td>
        {!isEditing ? (
          record.role
        ) : (
          <input
            onChange={roleChangeHandler}
            value={updatedRole}
            className={classes.recordInput}
            name="role"
          />
        )}
      </td>
      <td>
        <section className={classes.actionsContainer}>
          {content}
          <Button
            className={`${classes.actions} ${classes["actions-del"]}`}
            onClickHandler={() => {
              recordItemDeleteHandler(record.id, record.name);
            }}
          >
            Delete
          </Button>
        </section>
      </td>
    </tr>
  );
}

export default RecordItem;
