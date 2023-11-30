import { Fragment } from "react";

import Button from "./UI/Button";
import Modal from "./UI/Modal";

import classes from "./UserDeleteModal.module.css";

function UserDeleteModal(props) {
  const content = (
    <Fragment>
      <h2>Are you sure to delete {props.user} user entry?</h2>
      <div className={classes.actionsContainer}>
        <Button
          className={`${classes["button-alt"]} ${classes.actions}`}
          onClickHandler={() => {
            props.deleteHandler();
          }}
        >
          Delete
        </Button>
        <Button
          className={`${classes.primary} ${classes.actions}`}
          onClickHandler={() => {
            props.onClose();
          }}
        >
          Cancle
        </Button>
      </div>
    </Fragment>
  );

  return <Modal onClose={props.onClose}>{content}</Modal>;
}

export default UserDeleteModal;
