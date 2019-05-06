import {
  Dimensions,
  Share,
  Alert,
  Platform,
  PermissionsAndroid
} from "react-native";
// import ImagePicker from 'react-native-image-picker';
import { AppConstants } from "../AppConstants";
const { width, height } = Dimensions.get("window");

export const heightRatio = orignalHeight => {
  h = orignalHeight / 2.69;
  return (h * height) / 736;
};

export const widthRatio = orignalWidth => {
  w = orignalWidth / 2.69;
  return (w * width) / 414;
};

export const validateEmail = text => {
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (reg.test(text) === false) {
    return false;
  }
  return true;
};

export const getCurrentLocationWithWatch = (
  enableHighAccuracyLocation = false
) => {
  let options = {
    enableHighAccuracy: enableHighAccuracyLocation,
    timeout: 20000,
    maximumAge: 1000
  };

  if (Platform.OS === "android") {
    options = {
      enableHighAccuracy: true,
      timeout: 100,
      maximumAge: 100,
      distanceFilter: 0
    };
  }

  return new Promise((resolve, reject) => {
    navigator.geolocation.watchPosition(
      position => {
        resolve(position);
      },
      error => {
        reject(error);
      },
      options
    );
  });
};

export async function checkAndRequestLocation() {
  try {
    const check = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );
    if (check === false) {
      try {
        var request = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        return request;
      } catch (err) {
        console.warn(err);
      }
    } else if (check === true) {
      return PermissionsAndroid.RESULTS.GRANTED;
    }
  } catch (err) {
    console.warn(err);
  }
}

export const getCurrentLocation = (enableHighAccuracyLocation = false) => {
  let options = {
    enableHighAccuracy: enableHighAccuracyLocation,
    timeout: 20000,
    maximumAge: 1000
  };

  if (Platform.OS === "android") {
    options = {
      enableHighAccuracy: false,
      timeout: 20000
    };
  }
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      position => {
        resolve(position);
      },
      error => {
        reject(error);
      },
      options
    );
  });
};

// export const uploadImage = () => {
//   const options = {
//     quality: 0.1,
//     maxWidth: 300,
//     maxHeight: 300,
//     storageOptions: {
//       skipBackup: true
//     }
//   };
//   return new Promise((resolve, reject) => {

//     ImagePicker.showImagePicker(options, (response) => {
//       if (response.didCancel) {
//       }
//       else if (response.error) {
//       }
//       else if (response.customButton) {
//       }
//       else {
//         resolve(response.uri)
//       }
//     })
//   })

// }

export const isEmpty = obj => {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
};

export const checkError = error => {
  if (error.response === undefined) {
    return error.message;
  } else if (error.response.status === 503) {
    return error.message;
  } else {
    var values = Object.keys(error.response.data.data[0]).map(key => {
      return error.response.data.data[0][key];
    });
    return "â€¢ " + values.join("\nâ€¢ ");
    // Alerts("titless",values)
  }
};

export const onShareButtonPressed = item => {
  Share.share(
    {
      message:
        "BAM: we're helping your business with awesome React Native apps",
      url: "http://bam.tech",
      title: "Wow, did you see that?"
    },
    {
      // Android only:
      dialogTitle: "Share BAM goodness",
      // iOS only:
      excludedActivityTypes: ["com.apple.UIKit.activity.PostToTwitter"]
    }
  );
};

export const Alerts = (description, onOkPress) => {
  Alert.alert(
    AppConstants.alert,
    description,
    [{ text: AppConstants.ok, onPress: onOkPress }],
    { cancelable: false }
  );
};
