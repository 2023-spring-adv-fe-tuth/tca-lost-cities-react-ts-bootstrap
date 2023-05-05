import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { GameResult, SetupInfo } from './front-end-model';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import CardHeader from 'react-bootstrap/esm/CardHeader';

interface PlayProps {
    addGameResultFunc: (r: GameResult) => void;
    setupInfo: SetupInfo;
};

export const Play: React.FC<PlayProps> = ({
    addGameResultFunc
    , setupInfo
}) => {

    console.log(setupInfo);

    const [happened, setHappened] = useState(false);

    const nav = useNavigate();

    const endGame = (winner: string) => {
        
        addGameResultFunc({
            winner: winner
            , players: setupInfo.chosenPlayers
            , start: setupInfo.start
            , end: new Date().toISOString()
            , reallyCoolThingHappened: happened
        });

        nav(-2)
    };

    return (
        <>        
            <h2>
                Play
            </h2>
            <p>
            <Form.Check
                label="Really cool thing happened"   
                type="switch"   
                checked={happened}
                onChange={(e) => setHappened(e.target.checked)}
            />   
            </p>
            {
                setupInfo.chosenPlayers.map(x => (
                    <Button 
                        variant="outline-primary"
                        onClick={() => endGame(x)}
                    >
                        {x} Won
                    </Button>
                ))
            }  

            <Card
                className="mt-3 overflow-hidden"
            >
                <Card.Header>
                    Wagers
                </Card.Header>
                <Card.Body>                     
                </Card.Body>
            </Card>
        </>          
    );
};