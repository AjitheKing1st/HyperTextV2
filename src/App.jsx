import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import Home from "./Home.jsx"
import TriviaSelectionPage from "./TriviaSelectionPage.jsx"
import GameplayTest from './GameplayTest.jsx';
import TypingGameplay from './typinggameplay.jsx';
import TypingStatistics from "./TypingStatistics.jsx";
import Settings from "./Settings.jsx";
import Results from './Results.jsx';

function App() {
  return (
    <>
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path=":subject" element={<TriviaSelectionPage />}></Route>
        <Route path=":subject/:triviatopic" element={<TypingGameplay />}></Route>
        <Route path="/tutorial" element={<GameplayTest />}></Route>
        <Route path="/stats" element={<TypingStatistics />}></Route>
        <Route path="/settings" element={<Settings />}></Route>
        <Route path=":subject/:triviatopic/results" element={<Results />}></Route>
      </Routes>
    </>
  );
};

export default App;