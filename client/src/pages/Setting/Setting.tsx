import { Box, FormControl, OutlinedInput, Button, Grid, Typography } from '@material-ui/core';

import Navigation from '../Navigation/Navigation';
import tempImg from '../../Images/b1f0e680702e811aa8ba333cb19c0e0ea95e8e31.png';
import { useSnackBar } from '../../context/useSnackbarContext';
import useStyles from './useStyles';
import { useState } from 'react';
import { uploadToCloudinary } from '../../helpers/APICalls/settings';

export default function Setting(): JSX.Element {
  const classes = useStyles();
  const [imgSource, setImgSource] = useState<File>();
  const { updateSnackBarMessage } = useSnackBar();

  const getFilePath = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileObj = event.target.files;
    if (fileObj && fileObj.length > 0) {
      setImgSource(fileObj[0]);
    }
  };

  const uploadProfilePic = () => {
    if (imgSource) {
      uploadToCloudinary(imgSource, updateSnackBarMessage);
    }
  };

  return (
    <Box>
      <Navigation />
      <Box className={classes.wrapper}>
        <Typography className={classes.headerTitle}> PROFILE SETTING </Typography>
        <Box className={classes.contentBox}>
          <img className={classes.iconImage} src={imgSource ? URL.createObjectURL(imgSource) : tempImg} />
          <Typography> Change your profile picture: </Typography>
          <input type="file" onChange={getFilePath} />
          <Button onClick={uploadProfilePic}> Update your profile picture </Button>
        </Box>
      </Box>
    </Box>
  );
}
