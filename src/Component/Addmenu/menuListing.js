import React, {useState , useEffect} from 'react'

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';


export const MenuListingComponenent = (props) =>{
    
        return(
            <div>
               <CollapsibleTable tabledata={props.data}></CollapsibleTable>
            </div>
        )
}





const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
  menuImage:{
    maxWidth: 100,
    maxHeight: 100
  }
});



function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">{
          row.imageUrl ? <img src={row.imageUrl} className={classes.menuImage} alt="img" /> : null
        }
          {row.name}
        </TableCell>
        <TableCell align="right">{row.variant.length}</TableCell>

      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Variant</TableCell>
                    <TableCell align="right">Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.variant.map((variant,index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {variant.name}
                      </TableCell>
                      <TableCell align="right">{variant.price}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}





export default function CollapsibleTable(props) {
    const tabledata = props.tabledata.category;
      let menuitems = [];
    let rows = tabledata.map((category)=>{
      return category.menuitems.map((row) => {
        menuitems.push(row);
          return row;
      } 
      )
    })

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Menu Name</TableCell>
            <TableCell align="right">Varient</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
      {
        menuitems.map(menu=>(<Row row={menu}></Row>))
      }
        </TableBody>
      </Table>
    </TableContainer>
  );
}