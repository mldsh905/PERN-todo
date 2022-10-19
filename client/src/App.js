import Header from "./components/header/header";
import Add from "./components/add_todo/add";
import List from "./components/list/list";

function App() {
    return (
        <div className="App">
            <Header/>
            <Add/>
            <List/>
        </div>
    );
}

export default App;
