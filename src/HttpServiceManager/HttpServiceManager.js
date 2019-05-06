import axios from 'axios';
import { getCurrentLocale } from '../Modules/Localization/i18n';
import { Alerts } from '../utility/utility';
import ProgressSpinKitModule from '../utility/common/ProgressSpinKitModule';


class HttpServiceManager {

  static myInstance = null;
  static axiosInstance = null;
  userToken = "";
  static getInstance() {
    if (HttpServiceManager.myInstance == null) {
      HttpServiceManager.myInstance = new HttpServiceManager();
    }
    return this.myInstance;
  }

  static initialize = (baseURL, authHeader) => {

    HttpServiceManager.getInstance().axiosInstance = axios.create({
      baseURL: baseURL,
      timeout: 60000,
      headers: authHeader
    });
    // HttpServiceManager.getInstance().axiosInstance.defaults.headers.common['Content-Type'] = 'multipart/form-data';
    HttpServiceManager.getInstance().axiosInstance.interceptors.request.use(
      function (config) {
        config.headers["user-token"] = HttpServiceManager.getInstance().userToken
        config.headers["Accept-Language"] = getCurrentLocale()
        console.log("header Config : ", config)
        return config
      },
      function (error) {
        console.log("header Config err:", error)
        return error
      }
    );
  }

  multipleRequest = (RequestArray) => {
    if (HttpServiceManager.getInstance().axiosInstance !== null) {
      return new Promise((resolve, reject) => {
        axios.all(RequestArray)
          .then((response) => {
            resolve(response)
          }).catch((error) => {
            reject(checkError(error));
          })
      })
    } else {
      console.warn('HttpServiceManager method "initialize" is not called, call it in App.js componentDidMount');
    }
  }


  getRequestObject = (requestName, parameters, method) => {
    // showLoader(showHud);
    if (HttpServiceManager.getInstance().axiosInstance !== null) {
      return HttpServiceManager.getInstance().axiosInstance.request({
        method: method,
        url: requestName,
        params: parameters
      });
    } else {
      console.warn('HttpServiceManager method "initialize" is not called, call it in App.js componentDidMount');
    }
  }

  request = (requestName, parameters, method, multipart = false) => {

    // ProgressSpinKitModule.showSpinnerProgressDialog(true, 'red')

    const data = method === "get" ? null : parameters;
    if (HttpServiceManager.getInstance().axiosInstance !== null) {
      return new Promise((resolve, reject) => {
        let reqParam = {
          method: method,
          url: requestName,
          data: data,
          params: parameters
        }
        console.log("reqParam : ", reqParam)
        HttpServiceManager.getInstance().axiosInstance.request(reqParam)
          .then((response) => {
            console.log("HttpServiceManager-RequestName: " + requestName + " Method : " + method + " Response : ", response)
            if (response.data.code === 200) {
              resolve({ response: response.data.data, meta: response.data.meta, message: response.data.message });
            }
            // ProgressSpinKitModule.hideSpinnerProgressDialog();
          }).catch((error) => {
            console.log("HttpServiceManager-error: ", error.response)
            reject(HttpServiceManager.checkError(error));
            // ProgressSpinKitModule.hideSpinnerProgressDialog();
          });
     
      })
    } else {
      console.warn('HttpServiceManager method "initialize" is not called, call it in App.js componentDidMount');
    }
  }

  static checkError = (error) => {
    console.log("CHECK ERROR: ", error.response)
    let showError = ''
    if (error.response === undefined || error.response.status === 503 || error.response.status === 403) {
      showError = error.message
    } else if (error.response.status === 500) {
      return "Html cannot be parsed"
    } else if (error.response.status === 404) {
      // console.log(Object.keys(error.response.data.data[0]))
      var values = Object.keys(error.response.data.data).map((key) => {
        return error.response.data.data[key];
      });
      // console.log('\n• ' + values.join('{"\n•"}'))
      showError = ('• ' + values.join('\n• '));
    } else {
      return error.message
    }
    setTimeout(() => {
      Alerts(
        showError
      )
    }, 510);
  }

  // static checkError = (error) => {
  //   if (error.response === undefined) {
  //     return error.message
  //   } else if (error.response.status === 500) {
  //     return "Html cannot be parsed"
  //   } else if (error.response.status === 503) {
  //     return error.message
  //   } else if (error.response.status === 403) {
  //     return error.message
  //   } else if (error.response.status === 404) {
  //     var values = Object.keys(error.response.data.data).map((key) => {
  //       return error.response.data.data[key];
  //     });
  //     return ('• ' + values.join('\n• '));
  //   } else {
  //     return error.message
  //   }
  // }
}

export default HttpServiceManager;