import React from "react";
import { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { getMails } from "./mails-selectors";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { TThemeReducer } from "../../redux/theme-reducer";
import { getTheme } from "../../view/app-selectors";

const useStyles = makeStyles((theme: TThemeReducer) => {
  return {
    MainVertical: {
      display: 'flex',
      flexDirection: 'column',
      height: 'calc(100vh - 20px)'
    },
    Header: {
      height: '70px',
    },
    Main: {
      flex: 1,
      position: 'relative',
      backgroundColor: theme.palette.background.level2
    },
    ScrollContainer: {
      position: 'absolute',
      height: '100%',
      overflowY: 'auto'
    },
    FooterContent: {
      paddingTop: '10px',
      paddingLeft: '10px',
      fontSize: '10px',
      fontWeight: 200
    },
    table: {
      minWidth: 650,
    }
  }
});

function createData(name: string, calories: number, fat: number, carbs: number, protein: number) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export const PrintedMails: FunctionComponent<{}> = () => {

  const mails = useSelector(getMails);
  const theme = useSelector(getTheme);
  const classes = useStyles(theme);

  return (
      <div className={classes.MainVertical}>
          <div className={classes.Header}>
              {"//TODO toolbar"}
          </div>
          <div className={classes.Main}>
            <TableContainer component={Paper}>
              <Table className={classes.table} size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell>Dessert (100g serving)</TableCell>
                    <TableCell align="right">Calories</TableCell>
                    <TableCell align="right">Fat&nbsp;(g)</TableCell>
                    <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                    <TableCell align="right">Protein&nbsp;(g)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.name}>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.calories}</TableCell>
                      <TableCell align="right">{row.fat}</TableCell>
                      <TableCell align="right">{row.carbs}</TableCell>
                      <TableCell align="right">{row.protein}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <div className={classes.FooterContent}>
            {"Version: 0.0.2"}
          </div>
      </div>
  );

};
