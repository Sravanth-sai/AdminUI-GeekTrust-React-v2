import Modal from "../UI/Modal";

import classes from "./DeleteModal.module.css";

function TESTDeleteModal(props) {
  const content = (
    <>
      <h2>Are you sure to delete {props.user} user?</h2>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.deleteHandler}>
          Confirm
        </button>
        <button className={classes["button-alt"]} onClick={props.onClose}>
          Cancle
        </button>
      </div>
    </>
  );

  return (
    <Modal onClose={props.onClose}>
      {<h2>HELLO</h2>}
      {content}
    </Modal>
  );
}

export default TESTDeleteModal;
