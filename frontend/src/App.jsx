// App.jsx
import React from 'react';
import './App.css';

function App() {
  const handleClick = () => {
    alert('Hello from React!');
  };

  return (
    <div className="App">
      <h1>Welcome to My React App</h1>
      <button onClick={handleClick}>Click Me</button>
    </div>
  );
}

export default App;
