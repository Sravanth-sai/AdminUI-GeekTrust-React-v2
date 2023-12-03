import { createContext } from "react";

const UserEditContext = createContext({
  name: {},
  email: {},
  role: {},
  setFormData: () => {},
  editName: () => {},
  editEmail: () => {},
  editRole: () => {},
});

export default UserEditContext;
