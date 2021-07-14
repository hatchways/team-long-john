import moment from 'moment-timezone';
import MenuItem from '@material-ui/core/MenuItem';
import useStyles from './useStyles';
import Select from '@material-ui/core/Select';
import { BTZProps, TimeZone } from '../../interface/SchedulerProps';

export default function BuildTimeZones(props: BTZProps): JSX.Element {
  const classes = useStyles();

  // This prop is used to set custom menu for the Select pop-up.
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 400,
        width: 250,
      },
    },
  };

  // Create a map of time zones.
  const timeZones: TimeZone = {};
  moment.tz.names().map((tZone): void => {
    const abbr = moment.tz(tZone).zoneName();

    if (abbr[0] === '+' || abbr[0] === '-') return;

    timeZones[tZone] = { tZone, abbr };
  });

  // Render our list of time zones to choose from.
  const renderTimeZones = Object.keys(timeZones)
    .sort()
    .map((key) => {
      const { tZone, abbr } = timeZones[key];
      const time = moment.tz(tZone).format('(h:mma)');

      return (
        <MenuItem key={tZone} value={tZone}>
          <h4 className={classes.schedMenuInfo}> {`${tZone} (${abbr})`} </h4>
          <span className={classes.schedMenuTime}> {time} </span>
        </MenuItem>
      );
    });

  return (
    <Select
      defaultValue={props.userTimeZone ? props.userTimeZone : ' '}
      MenuProps={MenuProps}
      onChange={props.changeTimeZone}
    >
      {renderTimeZones}
    </Select>
  );
}
