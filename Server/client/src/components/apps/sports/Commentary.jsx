import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {trackPromise} from "react-promise-tracker";
import Avatar from '@material-ui/core/Avatar';
import {makeStyles} from '@material-ui/core/styles';
import {deepOrange, deepPurple} from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    orange: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
    },
    purple: {
        color: theme.palette.getContrastText(deepPurple[500]),
        backgroundColor: deepPurple[500],
    },
    small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
    },
    large: {
        width: theme.spacing(11),
        height: theme.spacing(11),
    },
}));


Commentary.propTypes = {};

function Commentary(props) {

    const [commentary, setCommentary] = React.useState();
    const classes = useStyles();

    React.useEffect(() => {
        trackPromise(
            fetch(`https://dev132-cricket-live-scores-v1.p.rapidapi.com/comments.php?seriesid=${props.matchData.series.id}&matchid=${props.matchData.id}`, {
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "dev132-cricket-live-scores-v1.p.rapidapi.com",
                    "x-rapidapi-key": "a2e362eba7mshf79992f1cbe7a73p1c653ejsn87bd2054f646"
                }
            })).then(res => res.json())
            .then(data => setCommentary(data))
    }, [])

    console.log(commentary, 'commen')

    return (
        <div>
            {commentary &&
            <React.Fragment>

                <h4 style={{color: commentary.commentary.innings[0].teamColour}}>{commentary.commentary.innings[0].name}</h4>
                <div>
                    <h6>Bowler</h6>
                    <span>
                       {commentary.commentary.innings[0].overs[0].overSummary.bowlersName}
                   </span>
                    <table>
                        <tr>
                            <td>
                                <Avatar alt="Remy Sharp"
                                        src={commentary.commentary.innings[0].overs[0].overSummary.bowlersImage}
                                        className={classes.large}/>
                            </td>
                            <td>
                                <tr>
                                    <th>
                                        Bowling Figures - <span
                                        style={{color: '#0f79c9'}}>{commentary.commentary.innings[0].overs[0].overSummary.bowlersBowlingFigures}</span>
                                    </th>
                                </tr>
                            </td>
                        </tr>
                    </table>

                    <table>
                        <tr>
                            <td>
                                <Avatar
                                    className={classes.orange}>{commentary.commentary.innings[0].overs[0].number}</Avatar>
                            </td>

                            <td>
                                {commentary.commentary.innings[0].overs[0].balls.map(ball => {
                                    return (
                                        <td>
                                            <Avatar
                                                className={classes.orange}>{ball.result}</Avatar>
                                        </td>
                                    )
                                })}

                            </td>
                        </tr>
                    </table>

                    <span>
                        {commentary.commentary.innings[0].overs.map(over => {
                            return (
                                <div>

                                    <p style={{color: commentary.commentary.innings[0].teamColour}}>{over.id + 1 + 'Overs'}</p>
                                    {over.balls.map(ball => {
                                        return (
                                            <div>
                                            <span>
                                               Ball {ball.ballNumber} :- <p style={{display:'inline',padding:'10px',textAlign:'center'}}> {ball.comments[0].text}</p>
                                            </span>
                                            </div>
                                        )
                                    })}
                                </div>
                            )
                        })}
                    </span>

                </div>

            </React.Fragment>
            }
        </div>
    );
}

function mapStateToProps(state) {
    return {
        selectedMatchDetails: state.sports.selectedMatchDetails
    }
}

export default connect(mapStateToProps)(Commentary)

