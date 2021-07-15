import { hostInfoProp } from '../../../interface/SchedulerProps';

const processAppointments = (
  userdata: any,
  data: any,
  setter: React.Dispatch<React.SetStateAction<hostInfoProp>>,
): void => {
  const appointments = data.success.appointments;
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

export default processAppointments;
