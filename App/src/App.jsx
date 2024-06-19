import logo from './logo.svg';

import FirstPage from './components/FirstPage/FirstPage';
import RegisterEmail from './components/RegisterEmail/RegisterEmail';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <Router>
    <Routes>
      {/** Route of the Element Register */}
      <Route path="/" element={ 
        <>
              <FirstPage/>
        </>
      } />


      {/** Route of the Element Register */}
      <Route path="/RegisterEmail" element={
      <>
        <RegisterEmail/>
      </>
      } />
    </Routes>
    </Router>
  );
}

export default App;
