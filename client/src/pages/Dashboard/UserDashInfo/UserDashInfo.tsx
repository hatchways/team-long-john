import useStyles from './useStyles';
import { Typography } from '@material-ui/core';
import { Table } from '@material-ui/core';
import { TableBody } from '@material-ui/core';
import { TableCell } from '@material-ui/core';
import { TableRow } from '@material-ui/core';
import { TableContainer } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { Box } from '@material-ui/core';
import tempImg from '../../../Images/b1f0e680702e811aa8ba333cb19c0e0ea95e8e31.png';

export default function UserDashInfo(): JSX.Element {
  const classes = useStyles();
  const userName = 'TEMP USER';

  return (
    <TableContainer>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell className={classes.iconWrapper}>
              <img src={tempImg} className={classes.iconImage} />
            </TableCell>
            <TableCell>
              <Box>
                <Typography className={classes.userName}> {userName} </Typography>
              </Box>
              <Box>
                <Typography> calendapp.com/{userName} </Typography>
              </Box>
            </TableCell>
            <TableCell>
              <Button variant="outlined" className={classes.outlinedButton}>
                + New Event Type
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
