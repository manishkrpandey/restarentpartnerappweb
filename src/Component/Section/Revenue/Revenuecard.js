import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { useSelector } from "react-redux";
const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'left',
      color: theme.palette.text.secondary,
    },
  }));
function Revenuecard(){
    const resData = useSelector(state => state.reducer.resInfo);
    console.log('resData====>',resData.collection);
    const classes = useStyles();
    return(
        <>
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Paper className={classes.paper}>
                    <Typography>Id:{resData.collection.rest_code}</Typography>
                    <h2>{resData.collection.restaurant_name}</h2>
                    <ul className="revenueList row mt-2">
                        <li className="col text-left">
                            <span className="revenueTitle">Today's Revenue</span>
                            <div className="totalRevenue">{resData.todayRevenue.totalRevenue}</div>
                            <p>{resData.todayRevenue.totalOrder}</p>
                        </li>
                        <li className="col text-left">
                            <span className="revenueTitle">Monthely Revenue</span>
                            <div className="totalRevenue">{resData.monthRevenue.totalRevenue}</div>
                            <p>{resData.monthRevenue.totalOrder}</p>
                        </li>
                    </ul>
                </Paper>
            </Grid>
        </Grid>
        </>
    )
}
export default Revenuecard;