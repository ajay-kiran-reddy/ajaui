import React from 'react';
import PropTypes from 'prop-types';
import CricketPage from "./CricketPage";
import data from './data.json';
import {trackPromise} from "react-promise-tracker";
SportsLandingPage.propTypes = {

};

function SportsLandingPage(props) {

    const [matchesData,setMatchesData]=React.useState();

    React.useEffect(()=>{
        trackPromise(
        fetch("https://dev132-cricket-live-scores-v1.p.rapidapi.com/matches.php?completedlimit=5&inprogresslimit=5&upcomingLimit=5", {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "dev132-cricket-live-scores-v1.p.rapidapi.com",
                "x-rapidapi-key": "a2e362eba7mshf79992f1cbe7a73p1c653ejsn87bd2054f646"
            }
        })).then(response => response.json())
            .then(data=>setMatchesData(data))
            .catch(err => {
                console.log(err);
            });
    },[])

    console.log(data,'data')
    return (
        <div>
           <h1> Welcome to Jay Sports Page</h1>
            {matchesData && <CricketPage matchesData={matchesData}/>}
        </div>
    );
}

export default SportsLandingPage;