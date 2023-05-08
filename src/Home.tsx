
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

interface HomeProps {
    leaderboardData: LeaderboardPlayer[];
    shortestGameDuration: number;
    longestGameDuration: number;
    averageGameDurationData: {
		playerCount: number;
		avgGameDuration: number;
    
	}[];
    reallyCoolThingHappenedPercent: number;
};

export const Home: React.FC<HomeProps> = ({
    leaderboardData
    , shortestGameDuration
    , longestGameDuration
    , averageGameDurationData
    , reallyCoolThingHappenedPercent
}) => {

    console.log(
        leaderboardData
        , shortestGameDuration
        , longestGameDuration    
    );

    const nav = useNavigate();

    const format = durationFormatter();    

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
                    Bar Chart Default
                </CardHeader>
                <Card.Body>
                    <p>
                        {`Happens ${(reallyCoolThingHappenedPercent * 100).toFixed(2)}% of games`}
                    </p>                    
                </Card.Body>
            </Card>
        </>
    )
};

const Chart = () => {
    const [data] = useState({
      labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
      datasets: [
        {
          label: 'My First dataset',
          backgroundColor: 'rgba(194, 116, 161, 0.5)',
          borderColor: 'rgb(194, 116, 161)',
          data: [65, 59, 90, 81, 56, 55, 40],
        },
        {
          label: 'My Second dataset',
          backgroundColor: 'rgba(71, 225, 167, 0.5)',
          borderColor: 'rgb(71, 225, 167)',
          data: [28, 48, 40, 19, 96, 27, 100],
        },
      ],
    });
  
    return (
      <CDBContainer>
        <h3 className="mt-5">Bar chart</h3>
        <Bar data={data} options={{ responsive: true }} />
      </CDBContainer>
    );
};

export default Chart;