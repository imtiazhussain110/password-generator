import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const passRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz";

    if (numAllowed) str += "1234567890";
    if (charAllowed) str += "@#$%&!";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, charAllowed, numAllowed, setPassword]);

  const copyPasswordToClip = useCallback(() => {
    passRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numAllowed, charAllowed, passwordGenerator]);

  return (
    <div className="h-screen bg-slate-700 flex flex-col space-y-5 justify-center items-center">
      <h1 className="text-4xl text-center text-white text-bold underline-offset-8">
        Password Generator
      </h1>
      <div className="space-y-4">
        <div className="flex ">
          <input
            type="text"
            readOnly
            value={password}
            ref={passRef}
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-3 outline-none border-8 border-solid border-gray-400 rounded-s-lg text-lg font-mono"
          />
          <button
            onClick={copyPasswordToClip}
            className="px-4 py-3 border-8 border-solid border-gray-400 text-2xl  bg-slate-900 text-lime-500 hover:text-lime-600 transition"
          >
            Copy
          </button>
          <button
            onClick={() => passwordGenerator()}
            className="px-4 py-3 border-8 border-solid border-gray-400 text-2xl rounded-e-lg bg-slate-900 text-lime-500 hover:text-lime-600 transition"
          >
            Generate
          </button>
        </div>

        <div className="flex justify-between w-full">
          <div>
            <label className="text-2xl text-white">Length: {length}</label>
            <input
              type="range"
              value={length}
              max={20}
              className="ms-3 accent-lime-500 cursor-pointer"
              onChange={(e) => setLength(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="number" className="text-2xl text-white">
              Number
            </label>
            <input
              type="checkbox"
              id="number"
              className="accent-gray-400 ring-1 ring-lime-500 w-4 h-4 ms-3 "
              checked={numAllowed}
              onChange={() => setNumAllowed((prev) => !prev)}
            />
          </div>
          <div>
            <label htmlFor="char" className="text-2xl text-white">
              Character
            </label>
            <input
              type="checkbox"
              id="char"
              className="accent-gray-400 ring-1 ring-lime-500 w-4 h-4 ms-3"
              checked={charAllowed}
              onChange={() => setCharAllowed((prev) => !prev)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
