import Users from "./Components/Users";
import UserProvider from "./store/UserProvider";

function App() {
  return (
    <UserProvider>
      <Users />
    </UserProvider>
  );
}

export default App;
