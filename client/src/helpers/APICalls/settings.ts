import { RouteComponentProps } from 'react-router-dom';
import { appointmentInfoProp, appointmentProp } from '../../interface/AppointmentProps';

type snackBarFunc = (message: string) => void;

const uploadToCloudinary = (userId: string, imgSrc: File, updateSnackBarMessage: snackBarFunc): void => {
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
        updateSnackBarMessage('Image could not be uploaded to cloudinary.');
      }
    })
    .then((data) => {
      if (data) {
        const cloudinaryRes = data.success.cloudinaryRes;
        updateSnackBarMessage('Profile image has been uploaded!');
        updateProfileImgDB(userId, cloudinaryRes.url, cloudinaryRes.secure_url, updateSnackBarMessage);
      }
    })
    .catch((error) => {
      alert(error);
    });
};

const updateProfileImgDB = (
  userId: string,
  cloudUrl: string,
  cloudUrlS: string,
  updateSnackBarMessage: snackBarFunc,
): void => {
  const url = `/profileImage?userId=${userId}`;
  const request = new Request(url, {
    method: 'PATCH',
    body: JSON.stringify({
      url: cloudUrl,
      secureUrl: cloudUrlS,
    }),
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
  fetch(request).then((res) => {
    if (!(res && res.status === 200)) {
      updateSnackBarMessage('Image could not be uploaded to cloudinary.');
    }
  });
};

const loadProfileImage = (
  userId: string,
  setter: React.Dispatch<React.SetStateAction<string>>,
  updateSnackBarMessage: snackBarFunc,
): void => {
  const url = `/profileImage?userId=${userId}`;
  const request = new Request(url, {
    method: 'GET',
    credentials: 'include',
  });
  fetch(request)
    .then((res) => {
      if (res && res.status === 200) {
        return res.json();
      } else if (res && res.status === 404) {
        updateSnackBarMessage('Profile image could not be loaded. It may not exist for this user.');
      }
    })
    .then((data) => {
      if (data && data.success) {
        setter(data.success.profileImage.secureUrl);
      }
    })
    .catch((error) => {
      alert(error);
    });
};

export { uploadToCloudinary, loadProfileImage };
