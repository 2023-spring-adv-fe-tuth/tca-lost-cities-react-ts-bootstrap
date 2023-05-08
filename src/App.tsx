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
  , getPercentGamesReallyCoolThingHappened
  , getChartData
} from './front-end-model';

const hardcodedGameResults: GameResult[] = [
  {
      winner: "Tom"
      , players: ["Tom", "Taylor"]
      , start: "2023-04-30T23:31:51.496Z"
      , end: "2023-04-30T23:33:51.496Z"
      , reallyCoolThingHappened: false
  }
  , {
      winner: "Taylor"
      , players: ["Jack", "Taylor"]
      , start: "2023-04-30T23:31:51.496Z"
      , end: "2023-04-30T23:33:51.496Z"
      , reallyCoolThingHappened: false
  }
  , {
      winner: "Taylor"
      , players: ["Tom", "Taylor", "Jack"]
      , start: "2023-04-30T23:31:51.496Z"
      , end: "2023-04-30T23:33:51.496Z"
      , reallyCoolThingHappened: false
  }
  , {
      winner: "X"
      , players: ["X", "Joe"]
      , start: "2023-04-30T23:31:51.496Z"
      , end: "2023-04-30T23:33:51.496Z"
      , reallyCoolThingHappened: false
  }
  , {
      winner: "X"
      , players: ["X", "Joe"]
      , start: "2023-04-30T23:31:51.496Z"
      , end: "2023-04-30T23:33:51.496Z"
      , reallyCoolThingHappened: false
  }
  , {
      winner: "Joe"
      , players: ["X", "Joe"]
      , start: "2023-04-30T23:31:51.496Z"
      , end: "2023-04-30T23:33:51.496Z"
      , reallyCoolThingHappened: false
  }
  , {
      winner: "Jack"
      , players: ["X", "Joe", "Jack"]
      , start: "2023-04-30T23:31:51.496Z"
      , end: "2023-04-30T23:41:51.496Z"
      , reallyCoolThingHappened: false
  }
  , {
    winner: "Edward"
    , players: ["Edward", "Tom"]
    , start: "2023-05-05T18:07:33.828Z"
    , end: "2023-05-05T18:27:33.828Z"
    , reallyCoolThingHappened: false
}
, {
    winner: "Edward"
    , players: ["Edward", "Tom"]
    , start: "2023-05-07T18:07:33.828Z"
    , end: "2023-05-07T18:27:33.828Z"
    , reallyCoolThingHappened: false
}
, {
    winner: "Tom"
    , players: ["Edward", "Tom"]
    , start: "2023-05-07T18:28:33.828Z"
    , end: "2023-05-07T18:58:33.828Z"
    , reallyCoolThingHappened: true
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
                reallyCoolThingHappenedPercent={getPercentGamesReallyCoolThingHappened(results)}
                chartData={getChartData(results)}
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
