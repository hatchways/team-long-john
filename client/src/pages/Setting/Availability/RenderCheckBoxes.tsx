import { Box, Checkbox } from '@material-ui/core/';

import { availSettingProp } from '../../../interface/Settings';
import useStyles from './useStyles';

const RenderCheckBoxes = (prop: availSettingProp): JSX.Element[] => {
  const classes = useStyles();
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const handleChangeDays = (e: { target: HTMLInputElement | HTMLTextAreaElement }, idx: number) => {
    const { value } = e.target;
    const copy = prop.openDays;

    // If value is already in here, then we want to remove it
    if (copy.includes(value)) copy[idx] = '';
    // else the value is not in here, then add it
    else copy[idx] = value;

    prop.setOpenDays([...copy]);
  };

  const renderCheckboxes = days.map((day: string, idx: number) => {
    const isEnabled = prop.openDays[idx] === day;
    if (idx === 0) {
      return (
        <Box key={day} className={`${classes.checkboxContainer} ${classes.checkboxLeft}`}>
          <Checkbox
            value={day}
            onChange={(e) => handleChangeDays(e, idx)}
            checked={isEnabled ? true : false}
            className={isEnabled ? classes.enabledCheckbox : classes.disabledCheckbox}
          />
          <p className={isEnabled ? classes.enabledCheckboxText : classes.disabledCheckboxText}>{day}</p>
        </Box>
      );
    } else if (idx === days.length - 1) {
      return (
        <Box key={day} className={`${classes.checkboxContainer} ${classes.checkboxRight}`}>
          <Checkbox
            value={day}
            onChange={(e) => handleChangeDays(e, idx)}
            checked={isEnabled ? true : false}
            className={isEnabled ? classes.enabledCheckbox : classes.disabledCheckbox}
          />
          <p className={isEnabled ? classes.enabledCheckboxText : classes.disabledCheckboxText}>{day}</p>
        </Box>
      );
    } else {
      return (
        <Box key={day} className={`${classes.checkboxContainer} ${classes.checkboxLeft}`}>
          <Checkbox
            value={day}
            onChange={(e) => handleChangeDays(e, idx)}
            checked={isEnabled ? true : false}
            className={isEnabled ? classes.enabledCheckbox : classes.disabledCheckbox}
          />
          <p className={isEnabled ? classes.enabledCheckboxText : classes.disabledCheckboxText}>{day}</p>
        </Box>
      );
    }
  });

  return renderCheckboxes;
};

export default RenderCheckBoxes;
