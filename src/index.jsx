import React from 'react';
import ReactDOM from 'react-dom/client';

const App = () => (<>
    <h1>Hello, Stuart!</h1>
    <p>Would you like to play a game?</p>
</>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
