import './App.css';
import Dashboard from './Pages/Dashboard/dashboard';
import Home from './Pages/Home/home';
import { Routes,Route } from 'react-router-dom';
function App() {
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/dashboard" element={<Dashboard/>}/>

      </Routes>

    </div>
  );
}

export default App;
