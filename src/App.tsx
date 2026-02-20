import { useState } from "react";
import Alert from "./components/Alert";
import Buttons from "./components/Buttons/Buttons";
import Like from "./components/Like";


function App() {
  let items = ["New York", "San Francisco", "Tokyo", "London", "Paris"];
  const [AlertVibility, setAlertVisibility] = useState(false);

  const handleSelectItem = (item: string) => {
    console.log(item);
  };
  return (
    <div>
      {AlertVibility && (
        <Alert onClose={() => setAlertVisibility(false)}>Hello World!</Alert>
      )}
      < Buttons onClick={() => setAlertVisibility(true)} color="primary">
        Click me!
      </Buttons>
      <Like onClick={() => console.log("Clicked!")}/>
      
    </div>
  );
}

export default App;
