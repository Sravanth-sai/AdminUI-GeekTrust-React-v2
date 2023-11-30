// import SearchBar from "./Components/SearchBar/SearchBar";
import Users from "./Components/Users";
import UserProvider from "./store/UserProvider";

function App() {
  return (
    <UserProvider>
      {/* <SearchBar /> */}

      <Users />
    </UserProvider>
  );
}

export default App;
