import { useState } from "react";

import Users from "./Components/Users";

import UserProvider from "./store/UserProvider";

import "./App.css";
import TESTDeleteModal from "./Components/Modal/TESTDeleteModal";

function App() {
  const [showDeleteModal, setShowDeleteModal] = useState(true);

  const closeDeleteModalHandler = () => {
    setShowDeleteModal(false);
  };

  const showDeleteModalHandler = () => {
    setShowDeleteModal(true);
  };

  return (
    <UserProvider>
      {/* <h1>Hello world!</h1> */}
      {/* {showDeleteModal && <TESTDeleteModal onClose={closeDeleteModalHandler} />} */}

      <Users />
    </UserProvider>
  );
}

export default App;
