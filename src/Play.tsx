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
                    <p>Player One, Round One: Number of Wagers</p>            
                    <input type="radio" name="p1r1wager" value="0" id="p1r1_w0"/>
                    <label htmlFor="p1r1_w0">0</label> &nbsp;      
                    <input type="radio" name="p1r1wager" value="1" id="p1r1_w1" />
                    <label htmlFor="p1r1_w1">1</label> &nbsp;
                    <input type="radio" name="p1r1wager" value="2" id="p1r1_w2" />
                    <label htmlFor="p1r1_w2">2</label> &nbsp;
                    <input type="radio" name="p1r1wager" value="3" id="p1r1_w3" />
                    <label htmlFor="p1r1_w3">3</label> &nbsp;
                    <input type="radio" name="p1r1wager" value="4" id="p1r1_w4" />
                    <label htmlFor="p1r1_w4">4</label> &nbsp;
                    <input type="radio" name="p1r1wager" value="5" id="p1r1_w5" />
                    <label htmlFor="p1r1_w5">5</label> 
                </Card.Body>
                <Card.Body> 
                    <p>Player One, Round One: Successful Wagers</p>            
                    <input type="radio" name="p1r1success" value="0" id="p1r1_s0"/>
                    <label htmlFor="p1r1_s0">0</label> &nbsp; 
                    <input type="radio" name="p1r1success" value="1" id="p1r1_s1"/>
                    <label htmlFor="p1r1_s1">1</label> &nbsp; 
                    <input type="radio" name="p1r1success" value="2" id="p1r1_s2"/>
                    <label htmlFor="p1r1_s2">2</label> &nbsp; 
                    <input type="radio" name="p1r1success" value="3" id="p1r1_s3"/>
                    <label htmlFor="p1r1_s3">3</label> &nbsp; 
                    <input type="radio" name="p1r1success" value="4" id="p1r1_s4"/>
                    <label htmlFor="p1r1_s4">4</label> &nbsp; 
                    <input type="radio" name="p1r1success" value="5" id="p1r1_s5"/>
                    <label htmlFor="p1r1_s5">5</label> &nbsp; 
                </Card.Body>
                <Card.Body> 
                    <p>Player One, Round Two: Number of Wagers</p>            
                    <input type="radio" name="p1r2wager" value="0" id="p1r2_w0"/>
                    <label htmlFor="p1r2_w0">0</label> &nbsp; 
                    <input type="radio" name="p1r2wager" value="1" id="p1r2_w1"/>
                    <label htmlFor="p1r2_w1">1</label> &nbsp; 
                    <input type="radio" name="p1r2wager" value="2" id="p1r2_w2"/>
                    <label htmlFor="p1r2_w2">2</label> &nbsp; 
                    <input type="radio" name="p1r2wager" value="3" id="p1r2_w3"/>
                    <label htmlFor="p1r2_w3">3</label> &nbsp; 
                    <input type="radio" name="p1r2wager" value="4" id="p1r2_w4"/>
                    <label htmlFor="p1r2_w4">4</label> &nbsp; 
                    <input type="radio" name="p1r2wager" value="5" id="p1r2_w5"/>
                    <label htmlFor="p1r2_w5">5</label> &nbsp; 
                </Card.Body>
            </Card>
        </>          
    );
};