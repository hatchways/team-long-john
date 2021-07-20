import moment from 'moment';
import { appointCompProp } from '../../../interface/SchedulerProps';

const fitNewTimeSlot = (timeSlotLB: Date, duration: number, appointments: appointCompProp[]): boolean => {
  if (appointments.length === 0) {
    return true;
  }
  const timeSlotUB = moment(timeSlotLB).add(duration, 'm').toDate();
  for (let i = 0; i < appointments.length; i++) {
    const pivotStart = appointments[i].appointment;
    const pivotEnd = moment(pivotStart).add(appointments[i].duration, 'm').toDate();
    if (
      pivotStart.getTime() === timeSlotLB.getTime() ||
      (pivotStart < timeSlotLB && timeSlotLB < pivotEnd) ||
      (timeSlotLB < pivotStart && pivotStart < timeSlotUB)
    ) {
      return false;
    }
  }
  return true;
};

export default fitNewTimeSlot;
