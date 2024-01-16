import AutoComplete from "./components/AutoComplete";
import { data } from "./data/data";

function App() {
  return (
    <main className="flex justify-center mt-3">
      <AutoComplete
        placeholder={"Search ...."}
        options={data}
      />
    </main>
  );
}

export default App;
