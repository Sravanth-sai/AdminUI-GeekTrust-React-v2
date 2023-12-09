import { Fragment } from "react";
import Modal from "../UI/Modal";
import classes from "./TableItemDeleteModal.module.css";

function TableItemDeleteModal(props) {
  const content = (
    <Fragment>
      <h2>Are you sure to delete {props.user} user entry?</h2>
      <div className={classes.actionsContainer}>
        <button
          className={`${classes["button-alt"]} ${classes.actions}`}
          onClick={() => {
            props.deleteHandler();
          }}
        >
          Delete
        </button>
        <button
          className={`${classes.primary} ${classes.actions}`}
          onClick={() => {
            props.onClose();
          }}
        >
          Cancel
        </button>
      </div>
    </Fragment>
  );

  return <Modal onClose={props.onClose}>{content}</Modal>;
}

export default TableItemDeleteModal;
