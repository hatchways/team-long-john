import useStyles from './useStyles';
import { Typography } from '@material-ui/core';
import { Table } from '@material-ui/core';
import { TableBody } from '@material-ui/core';
import { TableCell } from '@material-ui/core';
import { TableRow } from '@material-ui/core';
import { TableContainer } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { Box } from '@material-ui/core';
import tempImg from '../../../Images/loading.gif';
import { useAuth } from '../../../context/useAuthContext';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useState } from 'react';
import { useEffect } from 'react';
import { loadProfileImage } from '../../../helpers/APICalls/settings';
import { useSnackBar } from '../../../context/useSnackbarContext';

interface Props {
  handleOpen: React.MouseEventHandler<HTMLButtonElement>;
}

export default function UserDashInfo({ handleOpen }: Props): JSX.Element {
  const classes = useStyles();
  const [profileUrl, setProfileUrl] = useState(tempImg);
  const { updateSnackBarMessage } = useSnackBar();
  const { loggedInUser } = useAuth();

  useEffect(() => {
    if (loggedInUser) {
      loadProfileImage(loggedInUser._id, setProfileUrl, updateSnackBarMessage);
    }
  }, [loggedInUser, updateSnackBarMessage]);

  if (loggedInUser === undefined || loggedInUser === null) {
    return <CircularProgress />;
  }

  return (
    <TableContainer>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell className={classes.iconWrapper}>
              <img src={profileUrl} className={classes.iconImage} />
            </TableCell>
            <TableCell>
              <Box>
                <Typography className={classes.userName}> {loggedInUser.name} </Typography>
              </Box>
              <Box>
                <Typography> calendapp.com/{loggedInUser.username} </Typography>
              </Box>
            </TableCell>
            <TableCell>
              <Button onClick={handleOpen} variant="outlined" className={classes.outlinedButton}>
                + New Event Type
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
