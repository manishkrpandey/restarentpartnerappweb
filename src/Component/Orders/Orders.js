import React , {useState , useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import CallMadeIcon from '@material-ui/icons/CallMade';
import { findByLabelText } from '@testing-library/react';
import Acceptrders from './Acceptorders'
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  gapPaper:{
    padding:'15px',
    marginBottom:'10px'
  },
  gapCard:{
    marginBottom:'10px',
    overflow:'visible',
    position:'relative'
  },
  actionBorder:{
    borderTopWidth:'1px',
    borderTopStyle:'dotted',
    borderTopColor:'#e7e7e7',
  },
  newOrders:{
    display:'flex',
    justifyContent:'space-between',
    background: 'green',
    color: '#fff',
  },
  timmer:{
    textAlign: 'center',
    background: '#efefef',
    borderRadius: '6px'
  },
  textCenter:{
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex'
  }
}));
function Orders() {
  const [neworder, setNeworder] = useState(false)
  const [timer , setTimer] = useState(300);
  const classes = useStyles();
  const redirectAccept =()=>{
    setNeworder(true)
  }
  const convertTominSec = (second) =>{
    let min = Math.floor(second/60);
    let sec = second%60;
    return min + ' M ' + sec + ' S'
  }

  useEffect(()=>{
    const stopInterval = setInterval(() => {
      setTimer(timer => timer - 1);
    }, 1000);
    return () => clearInterval(stopInterval)
  }, [])
 
  return (
      neworder?(
        <Acceptrders/>
      ):(
        <div className={classes.root}>
          <Grid container spacing={3} >
            <Grid item xs={7} className={classes.textCenter} >
            <Typography component="p" variant="caption" >5th Block Kormangala</Typography>
            </Grid>
            <Grid item xs={5} >
               <div className={classes.timmer}>
                <Typography component="span" >{convertTominSec(timer)}m</Typography>
                <Typography component="p" variant="caption">Prepration Time</Typography>
               </div>
            </Grid>
            <Grid item xs={12} className={classes.newOrders} onClick=
            {redirectAccept}>
              <Typography component="span">You have new order</Typography>
              <span className="circleWrapper">
                <CallMadeIcon/>
              </span>
            </Grid>
            <Grid item xs={12} >
              <Paper square  className={classes.gapPaper}>
                <Card variant="outlined" className={classes.gapCard}>
                  <CardContent>
                    <Grid container>
                    <Grid item xs={12} >
                      <Grid container>
                          <Grid item xs={6}>
                          <Typography className='menustatustag' variant="body2" component="span">
                            Preparing
                          </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography component="span" variant="body2">
                              Driver arriving in 5min
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12} className="mt-2">
                        <Typography component="span" className={classes.gapCard}>
                          <strong>#2222</strong>
                        </Typography>
                        <Typography component="p" variant="caption">
                          12:55Pm Ltchi with ice cream
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                    <CardActions className={classes.actionBorder}>
                      <Grid container>
                        <Grid item xs={6}>
                          <Button size="small" color="primary">
                            Mark Ready
                          </Button>
                        </Grid>
                        <Grid item xs={6}>
                          <Button size="small" color="primary">
                            Track Driver
                          </Button>
                        </Grid>
                      </Grid>
                    </CardActions>
                </Card>
              </Paper>
            </Grid>
          </Grid>
        </div>
      )
  );
      }
export default Orders;