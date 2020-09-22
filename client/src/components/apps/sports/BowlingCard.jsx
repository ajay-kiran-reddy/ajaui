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



function BowlingTable(props) {
    const classes = useStyles();

    function createData(name, maidens, overs, runsConceded, wickets, wides, economy) {
        return { name, maidens, overs, runsConceded, wickets, wides, economy };
    }

    const Team1 = [
        props.scoreCardData.fullScorecard && props.scoreCardData.fullScorecard.innings[0].bowlers.map( row =>
            createData(row.name, row.maidens, row.overs, row.runsConceded, row.wickets,row.wides,row.economy)
        )
    ];

    const Team2 = [
        props.scoreCardData.fullScorecard && props.scoreCardData.fullScorecard.innings[1] && props.scoreCardData.fullScorecard.innings[1].bowlers.map( row =>
            createData(row.name, row.maidens, row.overs, row.runsConceded, row.wickets,row.wides,row.economy)
        )
    ];

    const rows=props.state ? Team1 : Team2;

    return (
        <TableContainer component={Paper}>
            {rows[0] ?
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Maidens</TableCell>
                            <TableCell align="right">Overs</TableCell>
                            <TableCell align="right">Runs</TableCell>
                            <TableCell align="right">Wickets</TableCell>
                            <TableCell align="right">Wides</TableCell>
                            <TableCell align="right">Economy</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows[0].map((row) => (
                            <TableRow key={row.name}>
                                <TableCell component="th" scope="row">
                                    <a href='#'>{row.name}</a>
                                </TableCell>
                                <TableCell align="right">{row.maidens}</TableCell>
                                <TableCell align="right">{row.overs}</TableCell>
                                <TableCell align="right">{row.runsConceded}</TableCell>
                                <TableCell align="right">{row.wickets}</TableCell>
                                <TableCell align="right">{row.wides}</TableCell>
                                <TableCell align="right">{row.economy}</TableCell>
                            </TableRow>
                        )) }
                    </TableBody>
                </Table>
                : 'Match is Yet to start'}
        </TableContainer>
    );
}



const AntSwitch = withStyles((theme) => ({
    root: {
        width: 28,
        height: 16,
        padding: 0,
        display: 'flex',
    },
    switchBase: {
        padding: 2,
        color: theme.palette.grey[500],
        '&$checked': {
            transform: 'translateX(12px)',
            color: theme.palette.common.white,
            '& + $track': {
                opacity: 1,
                backgroundColor: theme.palette.primary.main,
                borderColor: theme.palette.primary.main,
            },
        },
    },
    thumb: {
        width: 12,
        height: 12,
        boxShadow: 'none',
    },
    track: {
        border: `1px solid ${theme.palette.grey[500]}`,
        borderRadius: 16 / 2,
        opacity: 1,
        backgroundColor: theme.palette.common.white,
    },
    checked: {},
}))(Switch);

BowlingCard.propTypes = {

};

function BowlingCard(props) {

    const [state, setState] = React.useState({
        checkedA: true,
        checkedB: true,
        checkedC:true
    });

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

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


    return (
        <div>
            {scoreCardData &&
            <Typography component="div">
                <h4>{props.state ? scoreCardData.fullScorecard && scoreCardData.fullScorecard.innings[1] && scoreCardData.fullScorecard.innings[1].name
                    : scoreCardData.fullScorecard && scoreCardData.fullScorecard.innings[0].name
                }</h4>
                <BowlingTable scoreCardData={scoreCardData}
                 state={props.state}/>
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

export default connect(mapStateToProps) (BowlingCard)