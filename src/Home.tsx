
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import { LeaderboardPlayer } from './front-end-model';
import Table from 'react-bootstrap/Table';
import { durationFormatter } from 'human-readable'; 
import CardHeader from 'react-bootstrap/esm/CardHeader';
import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { CDBContainer } from 'cdbreact';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

interface HomeProps {
    leaderboardData: LeaderboardPlayer[];
    shortestGameDuration: number;
    longestGameDuration: number;
    averageGameDurationData: {
		playerCount: number;
		avgGameDuration: number;
    
	}[];
    reallyCoolThingHappenedPercent: number;
    chartData: any;
    gameByDay: any;
};



export const Home: React.FC<HomeProps> = ({
    leaderboardData
    , shortestGameDuration
    , longestGameDuration
    , averageGameDurationData
    , reallyCoolThingHappenedPercent
    , chartData
    , gamesByDay
}) => {

    console.log(
        leaderboardData
        , shortestGameDuration
        , longestGameDuration    
    );

    const nav = useNavigate();

    const format = durationFormatter();    
    
    const Chart = () => {
        const [data] = useState();
        console.log("Hello Tom", data);
        return (
          <CDBContainer>
            <h3 className="mt-5">Bar Chart</h3>
            <Bar data={chartData} options={{ responsive: true }} />
          </CDBContainer>
        );
    };

    return (
        <>
            <Button 
                variant="outline-primary"
                onClick={() => nav("/setup")}
            >
                Play Lost Cities
            </Button>
            <Card
                className="mt-3 overflow-hidden"
            >
                <Card.Header>
                    Leaderboard
                </Card.Header>
                <Card.Body>
                    {
                        leaderboardData.length == 0 && 
                        <p>Play a game to see your leaderboard!</p>
                    }
                    {
                        leaderboardData.length > 0 &&
                        <Table striped bordered>
                        <thead>
                          <tr>
                            <th>W</th>
                            <th>L</th>
                            <th>AVG</th>
                            <th>Player</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            leaderboardData.map(x => (
                                <tr>
                                    <td>{x.wins}</td>
                                    <td>{x.losses}</td>
                                    <td>{x.avg}</td>
                                    <td>{x.name}</td>
                                </tr>
                            ))
                          }                            
                        </tbody>
                      </Table>
                    }
                </Card.Body>
            </Card>
            <Card>
                <CardHeader>
                    Game Time Fun Facts
                </CardHeader>
                <Card.Body>
                    <p>
                        {`${format(shortestGameDuration)} shortest game ever`}
                    </p>
                    <p>
                        {`${format(longestGameDuration)} longest game ever`}
                    </p>
                    {
						averageGameDurationData.length > 0 &&
						<Table striped bordered>
							<thead>
								<tr>
									<th>Player Count</th>
									<th>Average Duration</th>
								</tr>
							</thead>
							<tbody>
								{
									averageGameDurationData.map(x => (
										<tr>
											<td>{x.playerCount}</td>
											<td>{`${format(x.avgGameDuration)}`}</td>
										</tr>
									))
								}
							</tbody>
						</Table>                        
					}
                </Card.Body>
            </Card>
            <Card>
                <CardHeader>
                    Really Cool Thing
                </CardHeader>
                <Card.Body>
                    <p>
                        {`Happens ${(reallyCoolThingHappenedPercent * 100).toFixed(2)}% of games`}
                    </p>                    
                </Card.Body>
            </Card>
            <Card>
                <CardHeader>
                    Bar Chart Experiment
                </CardHeader>
                <Card.Body>
                    <Chart></Chart>
                </Card.Body>
            </Card>
        </>
    )
};

