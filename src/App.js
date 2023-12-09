import Search from "./Components/Search/Search";
import Card from "./Components/Card/Card";
import UserProvider from "./store/User/UserProvider";

function App() {
  console.log("APP Rendered");

  return (
    <UserProvider>
      <Search />
      <Card />
    </UserProvider>
  );
}

export default App;
