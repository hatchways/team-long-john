import { Box, FormControl, OutlinedInput, Button, Grid, Typography } from '@material-ui/core';

import Navigation from '../Navigation/Navigation';
import tempImg from '../../Images/loading.gif';
import { useSnackBar } from '../../context/useSnackbarContext';
import useStyles from './useStyles';
import { useState } from 'react';
import { loadProfileImage, uploadToCloudinary } from '../../helpers/APICalls/settings';
import { useAuth } from '../../context/useAuthContext';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useEffect } from 'react';
import Availability from './Availability/Availability';

export default function Setting(): JSX.Element {
  const classes = useStyles();
  const { loggedInUser } = useAuth();
  const { updateSnackBarMessage } = useSnackBar();
  const [imgSource, setImgSource] = useState<File>();
  const [profileUrl, setProfileUrl] = useState(tempImg);

  useEffect(() => {
    if (loggedInUser) {
      loadProfileImage(loggedInUser._id, setProfileUrl, updateSnackBarMessage);
    }
  }, [loggedInUser, updateSnackBarMessage]);

  if (loggedInUser === undefined || loggedInUser === null) return <CircularProgress />;

  const getFilePath = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileObj = event.target.files;
    if (fileObj && fileObj.length > 0) {
      setImgSource(fileObj[0]);
      setProfileUrl(URL.createObjectURL(fileObj[0]));
    }
  };

  const uploadProfilePic = () => {
    if (imgSource) {
      uploadToCloudinary(loggedInUser._id, imgSource, updateSnackBarMessage);
    }
  };

  return (
    <Box>
      <Navigation />
      <Box className={classes.wrapper}>
        <Typography className={classes.headerTitle}> PROFILE SETTING </Typography>
        <Box className={classes.profileWrapper}>
          <Box className={classes.imageSettingBox}>
            <img className={classes.iconImage} src={profileUrl} />
            <input className={classes.imgInput} type="file" onChange={getFilePath} />
            <Button className={classes.imgInputButton} onClick={uploadProfilePic}>
              Update your profile picture
            </Button>
          </Box>
          <Box className={classes.userInfoBox}>
            <Typography className={classes.subHeader}> USER INFO </Typography>
            <Typography className={classes.infoContent}>
              <strong> NAME: </strong> <u> {loggedInUser.name} </u>
            </Typography>
            <Typography className={classes.infoContent}>
              <strong> USER NAME: </strong> <u> {loggedInUser.username} </u>
            </Typography>
            <Typography className={classes.infoContent}>
              <strong> EMAIL: </strong> <u> {loggedInUser.email} </u>
            </Typography>
          </Box>
        </Box>
        <Availability />
      </Box>
    </Box>
  );
}
