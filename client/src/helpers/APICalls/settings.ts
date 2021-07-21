import { RouteComponentProps } from 'react-router-dom';
import { appointmentInfoProp, appointmentProp } from '../../interface/AppointmentProps';

type snackBarFunc = (message: string) => void;

const uploadToCloudinary = (imgSrc: File, updateSnackBarMessage: snackBarFunc): void => {
  const url = '/profileImage/upload/';
  const formData = new FormData();
  formData.append('fileSource', imgSrc);

  const request = new Request(url, {
    method: 'POST',
    body: formData,
    credentials: 'include',
    headers: {
      Accept: 'multipart/form-data',
    },
  });
  fetch(request)
    .then((res) => {
      if (res && res.status === 200) {
        return res.json();
      } else if (res && res.status === 400) {
        alert('Image could not be uploaded to cloudinary.');
      }
    })
    .then((data) => {
      if (data) {
        const cloudinaryRes = data.success.cloudinaryRes;
        updateSnackBarMessage('Profile image has been uploaded!');
        console.log(cloudinaryRes);
      }
    })
    .catch((error) => {
      alert(error);
    });
};

export { uploadToCloudinary };
