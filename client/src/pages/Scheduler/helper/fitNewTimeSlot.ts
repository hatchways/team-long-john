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
    if (pivotStart.isAfter(timeSlotUB, 'm')) {
      break;
    }
    if (pivotStart.isSame(timeSlotLB, 'm')) {
      return false;
    } else if (timeSlotLB.isBetween(pivotStart, pivotEnd, 'm')) {
      return false;
    } else if (pivotStart.isBetween(timeSlotLB, timeSlotUB, 'm')) {
      return false;
    }
  }
  return true;

  // // Modified binary search only using the start times.
  // let left = 0;
  // let right = appointments.length - 1;
  // while (left < right) {
  //   const mid = left + Math.floor((right - left) / 2);
  //   const pivotStart = moment(appointments[mid].appointment);
  //   if (pivotStart.isSame(timeSlotLB, 'minute')) {
  //     return false;
  //   } else if (pivotStart.isAfter(timeSlotLB, 'minute')) {
  //     right = mid - 1;
  //   } else {
  //     left = mid + 1;
  //   }
  // }

  // // Using left index as the pivot, see if the new time slot could fit in.
  // const pivotStart = moment(appointments[left].appointment);
  // console.log(pivotStart, timeSlotLB);
  // const pivotEnd = pivotStart.add(appointments[left].duration, 'm');
  // if (pivotEnd.isSameOrBefore(timeSlotLB, 'minute')) {
  //   return left + 1 === appointments.length || timeSlotUB.isSameOrBefore(appointments[left + 1].appointment, 'minute');
  // } else if (pivotStart.isSameOrAfter(timeSlotUB, 'minute')) {
  //   if (left === 0) {
  //     return true;
  //   }
  //   let prvAppointment = moment(appointments[left - 1].appointment);
  //   prvAppointment = prvAppointment.add(appointments[left - 1].duration, 'm');
  //   return timeSlotLB.isSameOrAfter(prvAppointment, 'minute');
  // }
  // return false;
};

export default fitNewTimeSlot;
