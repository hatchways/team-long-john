import React from 'react';
import { Box } from '@material-ui/core';
import useStyles from './useStyles';
import { ButtonBase } from '@material-ui/core';
import moment from 'moment-timezone';
import Button from '@material-ui/core/Button';

type eventHandler = (args: React.MouseEvent<HTMLButtonElement>) => void;
type strArgFunc = (args: string) => boolean;

interface TPProps {
  startTime: string;
  endTime: string;
  userTimeZone: string;
  timeZone: string;
  today: Date;
  duration: number;
  getDateInfo: eventHandler;
  checkDisableTime: strArgFunc;
}

export default function TimePopulator(props: TPProps): JSX.Element {
  const classes = useStyles();

  const timeButtonBuilder = (curMoment: moment.Moment, endMoment: moment.Moment) => {
    const output = [];
    while (curMoment.isBefore(endMoment)) {
      const time = curMoment.format('HH:mm');
      output.push(
        <Button
          key={time}
          value={time}
          className={classes.timeSched}
          onClick={props.getDateInfo}
          disabled={props.checkDisableTime(time)}
        >
          {time}
        </Button>,
      );
      curMoment = curMoment.add(props.duration, 'm');
    }
    return output;
  };

  const populateTimes = () => {
    // Using moment with user's own timezone as the basis, get a moment of the same time in different timezone.
    // Then observe how HH:mm changed to create buttons based on the selected timezone.
    const availStartBase = moment.tz(
      `${moment(props.today).format('YYYY-MM-DD')} ${props.startTime}`,
      props.userTimeZone,
    );
    const availEndBase = moment.tz(`${moment(props.today).format('YYYY-MM-DD')} ${props.endTime}`, props.userTimeZone);

    const availStartMoment = moment.tz(availStartBase, props.timeZone);
    const availEndMoment = moment.tz(availEndBase, props.timeZone);

    const availStartTZ = availStartMoment.format('HH:mm');
    const availEndTZ = availEndMoment.format('HH:mm');

    const compareTimeA = new Date(`1/1/2020 ${availStartTZ}`);
    const compareTimeB = new Date(`1/1/2020 ${availEndTZ}`);

    if (compareTimeA < compareTimeB) {
      return timeButtonBuilder(moment(compareTimeA), moment(compareTimeB));
    } else if (compareTimeB < compareTimeA) {
      const firstHalf = timeButtonBuilder(
        moment(new Date(`1/1/2020 00:${props.startTime.split(':')[1]}`)),
        moment(compareTimeB),
      );
      const secondHalf = timeButtonBuilder(moment(compareTimeA), moment(new Date('1/1/2020 23:59')));
      return firstHalf.concat(secondHalf);
    }
  };

  return <Box className={classes.timeSchedContainer}> {populateTimes()} </Box>;
}
