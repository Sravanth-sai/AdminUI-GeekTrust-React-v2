import { useReducer } from "react";
import UserEditContext from "./useredit-context";

const initialState = {
  name: {
    value: "",
    isValid: true,
    errorMessage: "",
  },
  email: {
    value: "",
    isValid: true,
    errorMessage: "",
  },
  role: {
    value: "",
    isValid: true,
    errorMessage: "",
  },
};

const userEditReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        name: {
          value: action.user.name,
          isValid: true,
          errorMessage: "",
        },
        email: {
          value: action.user.email,
          isValid: true,
          errorMessage: "",
        },
        role: {
          value: action.user.role,
          isValid: true,
          errorMessage: "",
        },
      };
    case "EDIT_NAME":
      const name = action.name;
      let isNameValid = true;
      let nameErr = "";
      if (name.trim() === "") {
        isNameValid = false;
        nameErr = "Name cannot be empty!";
      } else if (!name.match(/^[A-za-z\s]+$/)) {
        isNameValid = false;
        nameErr = "Invalid name!";
      }
      return {
        ...state,
        name: {
          value: name,
          isValid: isNameValid,
          errorMessage: nameErr,
        },
      };
    case "EDIT_EMAIL":
      const email = action.email;
      let emailErr = "";
      let isEmailValid = true;
      if (email.length === 0) {
        emailErr = "Email cannot be empty!";
        isEmailValid = false;
      } else if (!email.includes("@") || !email.includes(".")) {
        emailErr = "Invalid email!";
        isEmailValid = false;
      }

      return {
        ...state,
        email: {
          value: action.email,
          isValid: isEmailValid,
          errorMessage: emailErr,
        },
      };
    case "EDIT_ROLE":
      const { role } = action;

      let isRoleValid = true;
      let roleErr = "";

      if (role === "") {
        roleErr = "Role cannot be empty!";
        isRoleValid = false;
      } else if (!role.includes("admin") && !role.includes("member")) {
        isRoleValid = false;
        roleErr = "Role should either be 'admin' or 'member'";
      }

      return {
        ...state,
        role: {
          value: role,
          isValid: isRoleValid,
          errorMessage: roleErr,
        },
      };
    default:
      return {
        ...state,
      };
  }
};

const UserEditProvider = (props) => {
  const [userEditState, dispatchEditAction] = useReducer(
    userEditReducer,
    initialState
  );

  const setFormData = (user) => {
    dispatchEditAction({ type: "SET_USER", user });
  };

  const editName = (name) => {
    dispatchEditAction({
      type: "EDIT_NAME",
      name,
    });
  };

  const editEmail = (email) => {
    dispatchEditAction({
      type: "EDIT_EMAIL",
      email,
    });
  };

  const editRole = (role) => {
    dispatchEditAction({
      type: "EDIT_ROLE",
      role: role.trim().toLowerCase(),
    });
  };

  const userEditContext = {
    name: userEditState.name,
    email: userEditState.email,
    role: userEditState.role,
    setFormData,
    editName,
    editEmail,
    editRole,
  };

  return (
    <UserEditContext.Provider value={userEditContext}>
      {props.children}
    </UserEditContext.Provider>
  );
};

export default UserEditProvider;
