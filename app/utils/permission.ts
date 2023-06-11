import {check, PERMISSIONS, RESULTS} from 'react-native-permissions';

// Kiểm tra quyền truy cập camera
export const AskCameraPermission = async () => {
  check(PERMISSIONS.ANDROID.CAMERA)
    .then(result => {
      switch (result) {
        case RESULTS.UNAVAILABLE:
          console.log('Quyền truy cập camera không khả dụng trên thiết bị này');
          break;
        case RESULTS.DENIED:
          console.log('Người dùng chưa cho phép truy cập camera');
          break;
        case RESULTS.GRANTED:
          console.log('Quyền truy cập camera đã được cấp');
          break;
        case RESULTS.BLOCKED:
          console.log('Người dùng đã từ chối truy cập camera vĩnh viễn');
          break;
      }
    })
    .catch(error => console.log(error));
};
