import logo from "./logo.svg";
import "./App.css";
import useCounter from "./hooks/useCounter";
import { useMetaMesk } from "./hooks/useWallet";

function App() {
  const { connectMetaMask, isConnected, currentAccount } = useMetaMesk();
  const { count, increment, decrement, loading } = useCounter(currentAccount);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{loading ? "loading..." : "Dapp Counter"}</p>
        <div className="App-counter">
          <button
            className="btn-connect"
            onClick={connectMetaMask}
            disabled={isConnected}
          >
            {isConnected ? "Connected" : "Connect Wallet"}
          </button>

          <button
            className="btn-connect"
            onClick={increment}
            disabled={!isConnected}
          >
            Increment
          </button>
          <button
            className="btn-connect"
            onClick={decrement}
            disabled={!isConnected}
          >
            Decrement
          </button>
          <p className="count">{count}</p>
        </div>
      </header>
    </div>
  );
}

export default App;
