import React from 'react';
import PropTypes from 'prop-types';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import {connect} from "react-redux";
import './sports.css';



import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {trackPromise} from "react-promise-tracker";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});



function BattingTable(props) {
    const classes = useStyles();

    function createData(name, howOut, runs, balls, fours, sixes, strikeRate) {
        return { name, howOut, runs, balls, fours, sixes, strikeRate };
    }

    const Team1 = [
        props.scoreCardData.fullScorecard && props.scoreCardData.fullScorecard.innings[0].batsmen.map( row =>
                    createData(row.name, row.howOut, row.runs, row.balls, row.fours,row.sixes,row.strikeRate))
    ];

    const Team2=[
        props.scoreCardData.fullScorecard && props.scoreCardData.fullScorecard.innings[1] && props.scoreCardData.fullScorecard.innings[1].batsmen.map( row =>
            createData(row.name, row.howOut, row.runs, row.balls, row.fours,row.sixes,row.strikeRate))
    ];

    const rows=props.state ? Team1 : Team2;

    return (
        <TableContainer component={Paper}>
            {rows[0] ?
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Out</TableCell>
                        <TableCell align="right">Runs</TableCell>
                        <TableCell align="right">Balls</TableCell>
                        <TableCell align="right">Fours</TableCell>
                        <TableCell align="right">Sixes</TableCell>
                        <TableCell align="right">Sr Rate</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows[0].map((row) => (
                        <TableRow key={row.name}>
                            <TableCell component="th" scope="row">
                               <a href='#'>{row.name}</a>
                            </TableCell>
                            <TableCell align="right">{row.howOut}</TableCell>
                            <TableCell align="right">{row.runs}</TableCell>
                            <TableCell align="right">{row.balls}</TableCell>
                            <TableCell align="right">{row.fours}</TableCell>
                            <TableCell align="right">{row.sixes}</TableCell>
                            <TableCell align="right">{row.strikeRate}</TableCell>
                        </TableRow>
                    )) }
                </TableBody>
            </Table>
                        : 'Match is Yet to start'}
        </TableContainer>
    );
}

BattingCard.propTypes = {

};

function BattingCard(props) {



    const [scoreCardData,setScoreCardData]=React.useState();

    React.useEffect(()=>{
        // eslint-disable-next-line no-lone-blocks
        {
            props.selectedMatchDetails &&
                trackPromise(
            fetch(`https://dev132-cricket-live-scores-v1.p.rapidapi.com/scorecards.php?seriesid=${props.selectedMatchDetails.meta.series.id}&matchid=${props.selectedMatchDetails.matchDetail.matchSummary.id}`, {
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "dev132-cricket-live-scores-v1.p.rapidapi.com",
                    "x-rapidapi-key": "a2e362eba7mshf79992f1cbe7a73p1c653ejsn87bd2054f646"
                }
            })).then(res => res.json())
                .then(data => setScoreCardData(data))
        }
    },[props.selectedMatchDetails])

    console.log(scoreCardData,'scoreCardData')

    return (
        <div>
            {scoreCardData &&
            <Typography component="div">

                <h4>{props.state ? scoreCardData.fullScorecard && scoreCardData.fullScorecard.innings[0].name :
                    scoreCardData.fullScorecard.innings[1] && scoreCardData.fullScorecard.innings[1].name}</h4>
                {scoreCardData && <BattingTable scoreCardData={scoreCardData}
                             state={props.state}/>}
            </Typography>
            }
        </div>
    );
}

function mapStateToProps(state){
    return{
        selectedMatchDetails:state.sports.selectedMatchDetails
    }
}

export default connect(mapStateToProps) (BattingCard)