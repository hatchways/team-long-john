import moment from 'moment';
import { Moment } from 'moment-timezone';
import { appointCompProp } from '../../../interface/SchedulerProps';

const fitNewTimeSlot = (timeSlotLB: Moment, duration: number, appointments: appointCompProp[]): boolean => {
  if (appointments.length === 0) {
    return true;
  }
  const timeSlotUB = timeSlotLB.add(duration, 'm');
  for (let i = 0; i < appointments.length; i++) {
    const pivotStart = moment(appointments[i].appointment);
    const pivotEnd = pivotStart.add(appointments[i].duration, 'm');
    // If current appointment is after the current time slot, no need to continue.
    if (pivotStart.isAfter(timeSlotUB, 'm')) {
      break;
    }
    if (!pivotEnd.isBefore(timeSlotLB, 'm')) {
      if (
        pivotStart.isSame(timeSlotLB, 'm') ||
        timeSlotLB.isBetween(pivotStart, pivotEnd, 'm') ||
        pivotStart.isBetween(timeSlotLB, timeSlotUB, 'm')
      ) {
        return false;
      }
    }
  }
  return true;
};

export default fitNewTimeSlot;
