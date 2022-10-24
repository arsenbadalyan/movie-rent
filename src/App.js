import Header from './Components/Header/Header';
import Content from './Components/Content/Content';
import Footer from './Components/Footer/Footer';
import { useState } from 'react';

function App() {
  let [pageCounter, setPageCounter] = useState(1);
  const [canList, setCanList] = useState({
    availableListing: false,
    maxAvailablePage: pageCounter,
  });
  return (
    <div className="App">
      <Header />
      <Content q_id={pageCounter - 1} listing={{ canList, setCanList }} />
      <Footer
        pageCounter={pageCounter}
        setPageCounter={setPageCounter}
        listing={{ canList, setCanList }}
      />
    </div>
  );
}

export default App;
