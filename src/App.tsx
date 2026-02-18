import { useState } from "react";
import Alert from "./components/Alert";
import Buttons from "./components/Buttons";


function App() {
  let items = ["New York", "San Francisco", "Tokyo", "London", "Paris"];
  const [AlertVibility, setAlertVisibility] = useState(false);

  const handleSelectItem = (item: string) => {
    console.log(item);
  };
  return (
    <div>
      {AlertVibility && <Alert onClose={() => setAlertVisibility(false)}>
        Hello World!
      </Alert>}
      <Buttons onClick={() => setAlertVisibility(true)} color="success">
        Click me!
      </Buttons>
     
    </div>
  );
}

export default App;
