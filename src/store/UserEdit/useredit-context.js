import { createContext } from "react";

const UserEditContext = createContext({
  name: {},
  email: {},
  role: {},
  setFormData: (user) => {},
  editName: (name) => {},
  editEmail: (email) => {},
  editRole: (role) => {},
});

export default UserEditContext;
