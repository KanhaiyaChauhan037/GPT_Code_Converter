// import {useState} from 'react';
// import axios from 'axios';
// import CGLogo from './chatGPT.png';
// import AppLogo from './app-logo.png';
// import './App.css';

// function App() {
//   const [prompt, setPrompt] = useState('');
//   const [response, setResponse] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setLoading(true);
  
//     axios
//       .post("http://localhost:5555/chat", { prompt })
//       .then((res) => {
//         setResponse(res.data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error(err);
//       });
    
//   };

//   return (
//     <div className="wrapper">
//       <img src={AppLogo} alt="" className="app-logo" />	
//       <form onSubmit={handleSubmit}>
//         <img src={CGLogo} alt="" className={loading ? 'cg-logo loading' : 'cg-logo'} />
//         <input
//           type="text"
//           value={prompt}
//           onChange={(e) => setPrompt(e.target.value)}
//           placeholder="Ask anything... :)"
//         />
//         <button type="submit">Ask</button>
//       </form>
//       <p className="response-area">
//         {loading ? 'loading...' : response}
//       </p>
//       <div className="footer">~ Fun_ChatBot_Ai ~</div>
// </div>
//   );
// }

// export default App;



import React from 'react'
import Codeconverter from './components/Codeconverter'

const App = () => {
  return (
    <div>
      <Codeconverter/>
    </div>
  )
}

export default App