import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ScoreCard from "./ScoreCard";
import Grid from '@material-ui/core/Grid';
import {connect} from "react-redux";
import BattingCard from "./BattingCard";
import BowlingCard from "./BowlingCard";
import Switch from "@material-ui/core/Switch";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
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

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
}));

function MatchesCard(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [state, setState] = React.useState(true);

    const handleChangeSwitch = (event) => {
        setState(!state);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static" color="default">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs example"
                >
                {props.matchesData && props.matchesData.map((match,index)=>{
                    return <Tab label={match.series.name + '-' + match.name} {...a11yProps(index)} />
                })}
                </Tabs>

            </AppBar>

            {props.matchesData && props.matchesData.map((match,index)=>{
                return <TabPanel value={value} index={index}>
                    <Grid container spacing={1}>
                       <Grid item xs={12} md={6} lg={4}>
                           <ScoreCard matchData={match}/>
                       </Grid>

                        <Grid item xs={12} md={6} lg={4}>
                            {props.selectedMatchDetails && props.selectedMatchDetails.matchDetail.innings[0].id !== 0  &&
                            <Grid component="label" container alignItems="center" spacing={1}>
                                <Grid item>{props.selectedMatchDetails.matchDetail.innings[0].shortName}</Grid>
                                <Grid item>
                                    <AntSwitch checked={state} onChange={handleChangeSwitch} name="checkedC"/>
                                </Grid>
                                <Grid item>{props.selectedMatchDetails.matchDetail.innings[1] && props.selectedMatchDetails.matchDetail.innings[1].shortName}</Grid>
                            </Grid>
                            }
                            Batting Stats
                            <BattingCard state={state}/>
                        </Grid>

                        <Grid item xs={12} md={6} lg={4}>
                            Bowling Stats
                            <BowlingCard state={state}/>
                        </Grid>
                    </Grid>


                </TabPanel>
                }
            )}
        </div>
    );
}

function mapStateToProps(state){
    return{
        selectedMatchDetails:state.sports.selectedMatchDetails
    }
}

export default connect(mapStateToProps) (MatchesCard)
