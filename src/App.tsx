import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Home } from './Home';
import { Setup } from './Setup';
import { Play } from './Play';

import {  
  HashRouter
  , Routes
  , Route
} from 'react-router-dom';

import { 
  GameResult
  , SetupInfo
  , calculateLeaderboard
  , getPreviousPlayers
  , getShortestGameDuration
  , getLongestGameDuration
  , getAverageGameDurationByPlayerCount
} from './front-end-model';

const hardcodedGameResults: GameResult[] = [
  {
      winner: "Tom"
      , players: ["Tom", "Taylor"]
      , start: "2023-04-30T23:31:51.496Z"
      , end: "2023-04-30T23:33:51.496Z"
  }
  , {
      winner: "Taylor"
      , players: ["Jack", "Taylor"]
      , start: "2023-04-30T23:31:51.496Z"
      , end: "2023-04-30T23:33:51.496Z"
  }
  , {
      winner: "Taylor"
      , players: ["Tom", "Taylor", "Jack"]
      , start: "2023-04-30T23:31:51.496Z"
      , end: "2023-04-30T23:33:51.496Z"
  }
  , {
      winner: "X"
      , players: ["X", "Joe"]
      , start: "2023-04-30T23:31:51.496Z"
      , end: "2023-04-30T23:33:51.496Z"
  }
  , {
      winner: "X"
      , players: ["X", "Joe"]
      , start: "2023-04-30T23:31:51.496Z"
      , end: "2023-04-30T23:33:51.496Z"
  }
  , {
      winner: "Joe"
      , players: ["X", "Joe"]
      , start: "2023-04-30T23:31:51.496Z"
      , end: "2023-04-30T23:33:51.496Z"
  }
  , {
      winner: "Jack"
      , players: ["X", "Joe", "Jack"]
      , start: "2023-04-30T23:31:51.496Z"
      , end: "2023-04-30T23:41:51.496Z"
  }
];

const App = () => {

  const [results, setGameResults] = useState(hardcodedGameResults);

  const [setupInfo, setSetupInfo] = useState<SetupInfo>({
    start: ""
    , chosenPlayers: []
  }); 

  const addGameResult = (r: GameResult) => {
    setGameResults([
      ...results
      , r
    ]);
  };

  return (
    <div className="App m-3">
      <h1>
        TCA Lost Cities
      </h1>
      <h2>
        Companion App
      </h2>
      <hr />
      <HashRouter>
        <Routes>
          <Route 
            path="/" 
            element={
              <Home 
                leaderboardData={calculateLeaderboard(results)}
                shortestGameDuration={getShortestGameDuration(results)}
                longestGameDuration={getLongestGameDuration(results)}
                averageGameDurationData={getAverageGameDurationByPlayerCount(results)}
              />} 
          />
          <Route 
            path="/setup" 
            element={
              <Setup 
                previousPlayers={getPreviousPlayers(results)}
                setSetupInfo={setSetupInfo}
              />
            } 
          />
          <Route
            path="/play" 
            element={
              <Play 
                addGameResultFunc={addGameResult}
                setupInfo={setupInfo}
              />
            } 
          />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
