import { appointDataType, googleAppointmentType } from '../../../interface/AppointmentProps';
import { appointCompProp, hostInfoProp, userDataType } from '../../../interface/SchedulerProps';

const processAppointments = (
  userdata: userDataType,
  data: appointDataType,
  setter: React.Dispatch<React.SetStateAction<hostInfoProp>>,
): void => {
  const appointments = data.appointments;
  const output = [];
  for (let i = 0; i < appointments.length; i++) {
    output.push({
      duration: appointments[i].duration,
      appointment: new Date(appointments[i].time),
    });
  }
  // Sort the array in non-decreasing order of moments.
  output.sort((a, b): number => {
    if (a.appointment < b.appointment) {
      return -1;
    } else if (a.appointment > b.appointment) {
      return 1;
    }
    return 0;
  });
  setter({
    loadedOnce: true,
    hostEmail: userdata.email,
    availableDays: userdata.availableDays,
    timeZone: userdata.timezone,
    startTime: userdata.availableHours.start,
    endTime: userdata.availableHours.end,
    appointments: output,
  });
};

const processGoogleAppointments = (
  appointments: googleAppointmentType[],
  setter: React.Dispatch<React.SetStateAction<appointCompProp[]>>,
): void => {
  const output = [];
  for (let i = 0; i < appointments.length; i++) {
    const startTime = new Date(appointments[i].start);
    const endTime = new Date(appointments[i].end);
    const duration = Math.round((endTime.getTime() - startTime.getTime()) / 60000);
    output.push({
      duration: duration,
      appointment: startTime,
    });
  }
  // Sort the array in non-decreasing order of moments.
  output.sort((a, b): number => {
    if (a.appointment < b.appointment) {
      return -1;
    } else if (a.appointment > b.appointment) {
      return 1;
    }
    return 0;
  });
  setter(output);
};

export { processAppointments, processGoogleAppointments };
