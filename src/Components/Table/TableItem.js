import { useState, useContext } from "react";
import UserContext from "../../store/User/user-context";
import UserEditContext from "../../store/UserEdit/useredit-context";
import classes from "./TableItem.module.css";
import { FaTrash, FaEdit, FaSave, FaWindowClose } from "react-icons/fa";

function TableItem(props) {
  const [isEditing, setIsEditing] = useState(false);
  const userCtx = useContext(UserContext);
  const userEditCtx = useContext(UserEditContext);

  const setFormData = (user) => {
    userEditCtx.setFormData(user);
  };

  const name = userEditCtx.name;
  const email = userEditCtx.email;
  const role = userEditCtx.role;

  const { record } = props;

  const nameChangeHandler = (event) => {
    const name = event.target.value;
    userEditCtx.editName(name);
  };

  const emailChangeHandler = (event) => {
    const email = event.target.value;
    userEditCtx.editEmail(email);
  };

  const roleChangeHandler = (event) => {
    const role = event.target.value;
    userEditCtx.editRole(role);
  };

  const recordEditHandler = () => {
    setIsEditing(true);
    const user = { name: record.name, email: record.email, role: record.role };
    userEditCtx.setFormData(user);
  };

  const recordSaveHandler = () => {
    if (!name.isValid || !email.isValid || !role.isValid) {
      return;
    }
    userCtx.editUser(record.id, {
      name: name.value.trim(),
      email: email.value.trim(),
      role: role.value.trim(),
      isChecked: false,
    });
    setIsEditing(false);
  };

  const cancleEditHandler = () => {
    const user = { name: record.name, email: record.email, role: record.role };
    setFormData(user);
    setIsEditing(false);
  };

  const recordItemDeleteHandler = (id, username) => {
    props.deleteHandler(id, username);
  };

  const selectChangeHandler = (event) => {
    props.selectChangeHandler(event);
  };

  let content = (
    <FaEdit
      className={`${classes.actions} ${classes.edit}`}
      onClick={() => {
        recordEditHandler(record.id);
      }}
    />
  );

  if (isEditing) {
    content = (
      <>
        <FaSave
          className={`${classes.actions} ${classes.save}`}
          //   isDisabled={!name.isValid || !email.isValid || !role.isValid}
          onClick={() => {
            recordSaveHandler(record.id);
          }}
        />

        <FaWindowClose
          className={`${classes.actions} ${classes.close}`}
          onClick={cancleEditHandler}
        />
      </>
    );
  }

  let styles = `${classes.recordItem}`;

  if (props.isChecked) {
    styles += ` ${classes.recordChecked}`;
  }

  return (
    <tr key={record.id} className={`${styles}`}>
      <td>
        <input
          type="checkbox"
          name={record.id}
          onChange={selectChangeHandler}
          className={classes.recordCheckbox}
          checked={props.isChecked}
        />
      </td>
      <td>
        {!isEditing ? (
          record.name
        ) : (
          <>
            <input
              onChange={nameChangeHandler}
              value={name.value}
              className={`${classes.recordInput} ${
                !name.isValid ? classes.invalidInput : ""
              }`}
              name="name"
            />

            {!name.isValid && (
              <div className={classes["error-text"]}>{name.errorMessage}</div>
            )}
          </>
        )}
      </td>
      <td>
        {!isEditing ? (
          record.email
        ) : (
          <>
            <input
              onChange={emailChangeHandler}
              value={email.value}
              className={`${classes.recordInput} ${
                !email.isValid ? classes.invalidInput : ""
              }`}
              name="email"
              typeof="email"
            />
            {!email.isValid && (
              <div className={classes["error-text"]}>{email.errorMessage}</div>
            )}
          </>
        )}
      </td>
      <td>
        {!isEditing ? (
          record.role
        ) : (
          <>
            <input
              onChange={roleChangeHandler}
              value={role.value}
              className={`${classes.recordInput} ${
                !role.isValid ? classes.invalidInput : ""
              }`}
              name="role"
            />
            {!role.isValid && (
              <div className={classes["error-text"]}>{role.errorMessage}</div>
            )}
          </>
        )}
      </td>
      <td>
        <section className={classes.actionsContainer}>
          {content}
          <FaTrash
            className={`${classes.actions} ${classes.delete}`}
            onClick={() => {
              recordItemDeleteHandler(record.id, record.name);
            }}
          />
        </section>
      </td>
    </tr>
  );
}

export default TableItem;
