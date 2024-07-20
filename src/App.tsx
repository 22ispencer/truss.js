import Canvas from "./Canvas";

function App() {
  return (
    <div className="flex h-full w-full flex-row">
      <div className="w-[300px] flex-none border-r border-black text-center">
        <h1 className="text-2xl">Truss Calculator</h1>
        <h2 className="text-xl">Nodes</h2>
        <label>
          x:
          <input type="number" />
        </label>
      </div>
      <div>
        <Canvas width={window.innerWidth - 300} height={window.innerHeight} />
      </div>
    </div>
  );
}

export default App;
