import { useCallback, useEffect, useState, useRef } from "react"

function App() {

  const [length, setLength] = useState(8)
  const [numAllowed, setNumAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")
  // ref hook

  const passRef = useRef(null)



  const passwordGenerator = useCallback(
    () => {
      let pass = ""
      let str =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

      if (numAllowed) str += "012356789"
      if (charAllowed) str += "!@#$%^&*()-_+=[]{}~`"

      for (let i = 1; i <= length; i++) {
        let char = Math.floor(Math.random() * str.length + 1)
        pass += str.charAt(char)
      }

      setPassword(pass)
    },
    [length, numAllowed, charAllowed, setPassword],
  )

  const copyPass = useCallback(
    () => {
      passRef.current?.select()
      passRef.current?.setSelectionRange(0, 100)
      window.navigator.clipboard.writeText(password)
    },
    [password],
  )


  useEffect(() => {
    passwordGenerator()
  }, [length, numAllowed, charAllowed, passwordGenerator])



  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md 
      rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800 " >

        <h1 className="text-white text-center">Password Generator</h1>

        <div className="flex shadow rounded-lg overflow-hidden mb-4">

          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3 bg-white"
            placeholder="password"
            ref={passRef}
          />
          <button className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
            onClick={copyPass}
          >Copy</button>

        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input type="range"
              min={6}
              max={100}
              value={length}
              id="charInput"
              onChange={(e) => { setLength(e.target.value) }}
            />
            <label htmlFor="charInput">Length: {length}</label>
          </div>
          <label htmlFor="numberInput">Numbers: </label>
          <div className="flex items-center gap-x-1">
            <input type="checkbox"
              defaultChecked={numAllowed}
              id="numberInput"
              onChange={() => {
                setNumAllowed((prev) => !prev)
              }}
            />
          </div>

          <label htmlFor="characterInput">Characters: </label>
          <div className="flex items-center gap-x-1">
            <input type="checkbox"
              defaultChecked={charAllowed}
              id="characterInput"
              onChange={() => {
                setCharAllowed((prev) => !prev)
              }}
            />
          </div>

        </div>
      </div>
    </>
  )
}

export default App
