import { useEffect } from "react";
import GlobalStyles from "./styles/GlobalStyles";
import { getCabins } from "./services/apiCabins";

function App() {
  useEffect(function () {
    getCabins().then((data) => console.log(data));
  }, []);

  return (
    <>
      <GlobalStyles />
      <div>Homepage</div>
    </>
  );
}

export default App;
