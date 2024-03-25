import React from 'react';

import Login from './components/Login';
import ClosedEndedQuestions from './components/ClosedEndedQuestions';
import OpenEndedQuestions from './components/OpenEndedQuestions';




import { BrowserRouter, Route, Routes} from 'react-router-dom';


const App = () => {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          
          <Route path="/closedendedquestions" element={<ClosedEndedQuestions />} />
          
          <Route path="/openendedquestions" element={<OpenEndedQuestions />} />
          
        </Routes>
      </BrowserRouter>
    );
  };
  
  export default App;