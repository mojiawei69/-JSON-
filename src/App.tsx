import { useState } from 'react';
import './App.scss';
import Generate from './JSONParser/Generate';
import { Header } from './page/Header';
import { JSONGenerate,JSONWatch } from './page/JSONGenerate';

function App() {
  const [code, setCode] = useState("");
  const [wcode, setWcode] = useState("");
  const onChangeCode = (co: string) => setCode(co);
  const JSONGen = () => {
    const c = Generate(code);
    setWcode(c);
  };

  return (
    <>
      <Header onClick={JSONGen} />
      <div className="container">
        <JSONGenerate onChangeCode={onChangeCode} />
        <JSONWatch code={wcode} />
      </div>
    </>
  );
}

export default App;
