import TaskList from "./components/taskList";
import RXDBProvider from "./rxDB/rxDBProvider";
import "./App.css";

function App() {
  return (
    <RXDBProvider>
      <div className="App" style={{ paddingBlock: "40px" }}>
        <h3>Task WebApp</h3>
      </div>
      <TaskList />
    </RXDBProvider>
  );
}

export default App;
