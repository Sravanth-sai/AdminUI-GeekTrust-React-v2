import classes from "./Button.module.css";

function Button(props) {
  const onClickHandler = (event) => {
    props.onClickHandler(event);
  };

  return (
    <button
      //   type={props.type}
      disabled={props.isDisabled}
      onClick={onClickHandler}
      className={`${props.className} ${classes.defaultBtn} ${
        props.isDisabled ? classes.disabledBtn : ""
      }`}
    >
      {props.children}
    </button>
  );
}

export default Button;
