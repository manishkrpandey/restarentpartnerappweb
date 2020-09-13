import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
        width: theme.spacing(16),
        height: theme.spacing(16),
      }
    },
    gapPaper:{
        padding:'15px',
        marginBottom:'10px'
    },
    formControl: {
        minWidth: '100%',
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    actionBorder:{
        borderTopWidth:'1px',
        borderTopStyle:'dotted',
        borderTopColor:'#e7e7e7',
      },
  }));
function Acceptrders() {
    const classes = useStyles();
    return (
        <React.Fragment className={classes.root}>
        <Grid container spacing={3}>
            <Grid item xs={12} >
                <Typography component="h2" >Accept Order</Typography>
            </Grid>
          <Grid item xs={12} >
            <Paper square className={classes.gapPaper}>
                <Card variant="outlined" >
                    <CardContent>
                        <Grid item xs={12}>
                            <Typography component="span">
                                <strong>#22222</strong>
                            </Typography>
                            <Typography component="p" variant="caption">
                                12:55Pm Ltchi with ice cream
                            </Typography>
                        </Grid>
                        <Grid item xs={12} className="mt-2">
                            <FormControl className={classes.formControl}>
                                <InputLabel id="label">Order Complete Time</InputLabel>
                                <Select labelId="label" id="select" value="20">
                                    <MenuItem value="10">Ten</MenuItem>
                                    <MenuItem value="20">Twenty</MenuItem>
                                    <MenuItem value="30">Thirty</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </CardContent>
                    <CardActions className={classes.actionBorder}>
                        <Grid container>
                            <Grid item xs={12}>
                            <Button size="small" color="primary">
                                Accept
                            </Button>
                            <Button size="small" color="primary">
                                Cancel
                            </Button>
                            </Grid>
                        </Grid>
                    </CardActions>
                </Card>
            </Paper>
          </Grid>
        </Grid>
      </React.Fragment>
    );
}
export default Acceptrders;