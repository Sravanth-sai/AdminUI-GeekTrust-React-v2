import Search from "./Components/Search/Search";
import User from "./Components/User/User";
import UserProvider from "./store/User/UserProvider";

function App() {
  return (
    <UserProvider>
      <Search />
      <User />
    </UserProvider>
  );
}

export default App;
