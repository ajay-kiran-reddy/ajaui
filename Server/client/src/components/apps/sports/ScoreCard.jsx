import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import {red} from '@material-ui/core/colors';
import {connect} from 'react-redux'
import {StoreSelectedMatchDetails} from "../../../reduxModules/actions";
import {trackPromise} from "react-promise-tracker";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Commentary from "./Commentary";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: '100%',
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

function ScoreCard(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    React.useEffect(() => {
        trackPromise(
            fetch(`https://dev132-cricket-live-scores-v1.p.rapidapi.com/matchdetail.php?seriesid=${props.matchData.series.id}&matchid=${props.matchData.id}`, {
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "dev132-cricket-live-scores-v1.p.rapidapi.com",
                    "x-rapidapi-key": "a2e362eba7mshf79992f1cbe7a73p1c653ejsn87bd2054f646"
                }
            }))
            .then(res => res.json())
            .then(data => props.StoreSelectedMatchDetails(data))
    }, [])

    const getSelectedPlayerData = () => {

    }

    console.log(props.matchData, 'matchData')

    const [option, setOption] = React.useState('');

    const handleChange = (event) => {
        setOption(event.target.value);
    };
    console.log(option, 'option')
    console.log(option === 'Commentary', 'check')

    return (
        <Card className={classes.root}>
            {props.selectedMatchDetails ?
                <div>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-helper-label">Choose Category</InputLabel>
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            value={option}
                            onChange={handleChange}
                        >
                            <MenuItem value={'Summary'}>Summary</MenuItem>
                            {props.matchData.currentMatchState !== 'UPCOMING' &&
                            <MenuItem value={'Commentary'}>Commentary</MenuItem>}
                            {/*<MenuItem value={30}>Thirty</MenuItem>*/}
                        </Select>
                        <FormHelperText>Some important helper text</FormHelperText>
                    </FormControl>
                    {option === 'Commentary' ? <Commentary matchData={props.matchData}/> :
                        <div>
                            <CardHeader
                                avatar={
                                    <Avatar aria-label="recipe" className={classes.avatar}>
                                        R
                                    </Avatar>
                                }
                                title={props.matchData.series.name}
                                subheader={props.matchData.startDateTime}
                            />

                            {props.matchData.currentMatchState !== 'UPCOMING' &&
                            <CardContent>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {props.selectedMatchDetails.matchDetail.matchSummary.matchSummaryText}
                                </Typography>
                                <img src={props.selectedMatchDetails.matchDetail.teamBatting.logoUrl} style={{
                                    height: "100px",
                                    width: "150px"
                                }}/>
                                <h3>{`${props.selectedMatchDetails.matchDetail.teamBatting.shortName} :  ${props.selectedMatchDetails.matchDetail.teamBatting.score}`}</h3>

                                <h5>{props.selectedMatchDetails.matchDetail.matchSummaryText}</h5>
                            </CardContent>
                            }
                            {props.matchData.currentMatchState !== 'UPCOMING' &&
                            <div>

                                <div>Bowler:-</div>
                                <CardActions>
                                    <table style={{marginLeft: "3%"}}>
                                        <tr style={{padding: '10px'}}>
                                            <th>Name</th>
                                            <th>Overs</th>
                                            <th>Economy</th>
                                            <th>Runs</th>
                                            <th>Wickets</th>
                                        </tr>
                                        <tr style={{padding: '10px'}}>
                                            <td style={{padding: '10px'}}>
                                                <a href='#'
                                                   onClick={getSelectedPlayerData}>{props.selectedMatchDetails.matchDetail && props.selectedMatchDetails.matchDetail.bowler.name}</a>

                                            </td>
                                            <td style={{padding: '10px'}}>
                                                {props.selectedMatchDetails.matchDetail.bowler.bowlerOver}
                                            </td>
                                            <td style={{padding: '10px'}}>
                                                {props.selectedMatchDetails.matchDetail.bowler.economy}
                                            </td>
                                            <td style={{padding: '10px'}}>
                                                {props.selectedMatchDetails.matchDetail.bowler.runsAgainst}
                                            </td>
                                            <td style={{padding: '10px'}}>
                                                {props.selectedMatchDetails.matchDetail.bowler.wickets}
                                            </td>
                                        </tr>
                                    </table>
                                </CardActions>
                                <div>
                                    Batsmen:-
                                </div>
                                <CardActions>
                                    <table style={{marginLeft: "3%"}}>
                                        <tr>
                                            <th>Name</th>
                                            <th>Runs</th>
                                            <th>Balls Faced</th>
                                            <th>Sr rate</th>
                                        </tr>
                                        <tr style={{padding: '10px'}}>
                                            <td style={{padding: '10px'}}>
                                                <a href='#'
                                                   onClick={getSelectedPlayerData}>{props.selectedMatchDetails.matchDetail.currentBatters[0].name}</a>

                                            </td>
                                            <td style={{padding: '10px'}}>
                                                {props.selectedMatchDetails.matchDetail.currentBatters[0].runs}
                                            </td>
                                            <td style={{padding: '10px'}}>
                                                {props.selectedMatchDetails.matchDetail.currentBatters[0].ballsFaced}
                                            </td>
                                            <td style={{padding: '10px'}}>
                                                {props.selectedMatchDetails.matchDetail.currentBatters[0].strikeRate}
                                            </td>

                                        </tr>

                                        {props.selectedMatchDetails.matchDetail.currentBatters[1] && <tr>
                                            <td style={{padding: '10px'}}>
                                                <a href='#'
                                                   onClick={getSelectedPlayerData}>{props.selectedMatchDetails.matchDetail.currentBatters[1].name}</a>

                                            </td>
                                            <td style={{padding: '10px'}}>
                                                {props.selectedMatchDetails.matchDetail.currentBatters[1].runs}
                                            </td>
                                            <td style={{padding: '10px'}}>
                                                {props.selectedMatchDetails.matchDetail.currentBatters[1].ballsFaced}
                                            </td>
                                            <td style={{padding: '10px'}}>
                                                {props.selectedMatchDetails.matchDetail.currentBatters[1].strikeRate}
                                            </td>

                                        </tr>
                                        }

                                    </table>
                                </CardActions>
                            </div>
                            }

                        </div>
                    }

                </div>
                : 'No Live matches Currently..!!!!'
            }


        </Card>

    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        StoreSelectedMatchDetails: (payload) => dispatch(StoreSelectedMatchDetails(payload))
    }
}

function mapStateToProps(state) {
    return {
        selectedMatchDetails: state.sports.selectedMatchDetails
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScoreCard)