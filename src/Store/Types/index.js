const ActionTypes = {

  REHYDRATE: "persist/REHYDRATE",
  // =============================================================================
  // SignIn Types
  // =============================================================================
  SIGNIN_EMAIL_CHANGED: "SIGNIN_EMAIL_CHANGED",
  SIGNIN_PASSWORD_CHANGED: "SIGNIN_PASSWORD_CHANGED",
  SIGNIN_SUCCESS: "SIGNIN_SUCCESS",
  SIGNIN_FAIL: "SIGNIN_FAIL",
  SIGNIN: "SIGNIN",
  LOGOUT: "LOGOUT",
  SIGNIN_RESET: "SIGNIN_RESET",
  SIGNIN_LOGOUT: "SIGNIN_LOGOUT",
  SET_USER_TYPE: "SET_USER_TYPE",
  SIGNIN_LOADING: "SIGNIN_LOADING",
  SET_LANGUAGE: "SET_LANGUAGE",
  SET_LANGUAGE_ON_STARTUP: "SET_LANGUAGE_ON_STARTUP",
  CHANGE_LANGUAGE : "CHANGE_LANGUAGE",
  CHANGE_LANGUAGE_SUCCESS : "CHANGE_LANGUAGE_SUCCESS",
  USER_LOCATION_CHANGED: "USER_LOCATION_CHANGED",
  USER_LOCATION_CHANGED_FAIL : "USER_LOCATION_CHANGED_FAIL",
  USER_LOCATION_LOADING: "USER_LOCATION_LOADING",
  RESET_USER_LOCATION_CHANGED: "RESET_USER_LOCATION_CHANGED",
  // =============================================================================
  // SignUp Types
  // =============================================================================
  RESET_SIGNIN_SIGNUP: "RESET_SIGNIN_SIGNUP",
  RESET_SIGNIN_FORGOT: "RESET_SIGNIN_FORGOT",
  SIGNUP_EMAIL_CHANGED: "SIGNUP_EMAIL_CHANGED",
  SIGNUP_PASSWORD_CHANGED: "SIGNUP_PASSWORD_CHANGED",
  SIGNUP_USERNAME_CHANGED: "SIGNUP_USERNAME_CHANGED",
  SIGNUP_CONFIRMPASSWORD_CHANGED: "SIGNUP_CONFIRMPASSWORD_CHANGED",
  SIGNUP_IMAGE_CHANGED: "SIGNUP_IMAGE_CHANGED",
  SIGNUP: "SIGNUP",
  SIGNUP_SUCCESS: "SIGNUP_SUCCESS",
  SIGNUP_FAIL: "SIGNUP_FAIL",
  SIGNUP_RESET: "SIGNUP_RESET",
  SIGNUP_LOADING: "SIGNUP_LOADING",

  // =============================================================================
  // Forgot Password Types
  // =============================================================================
  FORGOT_EMAIL_CHANGED: "FORGOT_EMAIL_CHANGED",
  FORGOT_SUCCESS: "FORGOT_SUCCESS",
  FORGOT_FAIL: "FORGOT_FAIL",
  FORGOT_LOADING: "FORGOT_LOADING",

  // =============================================================================
  // Change Password Types
  // =============================================================================
  CURRENT_PASSWORD_CHANGED: "CURRENT_PASSWORD_CHANGED",
  NEW_PASSWORD_CHANGED: "NEW_PASSWORD_CHANGED",
  CONFIRM_PASSWORD_CHANGED: "CONFIRM_PASSWORD_CHANGED",
  CHANGE_PASSWORD_SUCCESS: "CHANGE_PASSWORD_SUCCESS",
  CHANGE_PASSWORD_FAIL: "CHANGE_PASSWORD_FAIL",
  CHANGE_PASSWORD_LOADING: "CHANGE_PASSWORD_LOADING",
  RESET_CHANGE_PASSWORD: "RESET_CHANGE_PASSWORD",

  // =============================================================================
  // Edit Types
  // =============================================================================
  EDIT_USERNAME_CHANGED: "EDIT_USERNAME_CHANGED",
  EDIT_IMAGE_CHANGED: "EDIT_IMAGE_CHANGED",
  EDIT_PHONENO_CHANGED: "EDIT_PHONENO_CHANGED",
  SET_EDIT_USER: "SET_EDIT_USER",
  EDIT_USER_SUCCESS: "EDIT_USER_SUCCESS:",
  EDIT_USER_FAIL: "EDIT_USER_FAIL:",
  EDIT_USER: "EDIT_USER",

  // =============================================================================
  // Customer Home
  // =============================================================================
  GET_SERVICE_PROVIDERS_SUCCESS: "GET_SERVICE_PROVIDERS_SUCCESS",
  GET_SERVICE_PROVIDERS_FAIL: "GET_SERVICE_PROVIDERS_FAIL",
  SET_COMPANY_DETAILS: "SET_COMPANY_DETAILS",
  SET_SERVICE_PROVIDERS_FOR_MAP: "SET_SERVICE_PROVIDERS_FOR_MAP",
  GET_SERVICE_PROVIDERS: "GET_SERVICE_PROVIDERS",
  GET_SERVICE_PROVIDERS_LOADMORE: "GET_SERVICE_PROVIDERS_LOADMORE",
  GET_SERVICE_PROVIDERS_LOADING: "GET_SERVICE_PROVIDERS_LOADING",

  // =============================================================================
  // Company Profile
  // =============================================================================
  GET_COMPANY_SERVICES: "GET_COMPANY_SERVICES",
  GET_COMPANY_SERVICES_SUCCESS: "GET_COMPANY_SERVICES_SUCCESS",
  GET_COMPANY_SERVICES_FAIL: "GET_COMPANY_SERVICES_FAIL",
  GET_COMPANY_SERVICES_LOADMORE: "GET_COMPANY_SERVICES_LOADMORE",
  SET_SERVICE_DETAILS: "SET_SERVICE_DETAILS",
  SCHEDULE_LOADING: "SCHEDULE_LOADING",
  SCHEDULE_SUCCESS: "SCHEDULE_SUCCESS",
  SCHEDULE_FAIL: "SCHEDULE_FAIL",

  // =============================================================================
  // Requests Tab
  // =============================================================================
  GET_CUSTOMER_REQUESTS: "GET_CUSTOMER_REQUESTS",
  GET_CUSTOMER_REQUESTS_SUCCESS: "GET_CUSTOMER_REQUESTS_SUCCESS",
  GET_CUSTOMER_REQUESTS_FAIL: "GET_CUSTOMER_REQUESTS_FAIL",
  GET_CUSTOMER_REQUESTS_LOADMORE: "GET_CUSTOMER_REQUESTS_LOADMORE",

  REQUEST_ACCEPT_LOADING: "REQUEST_ACCEPT_LOADING",
  REQUEST_ACCEPT_SUCCESS: "REQUEST_ACCEPT_SUCCESS",
  REQUEST_ACCEPT_FAIL: "REQUEST_ACCEPT_FAIL",

  REQUEST_REJECT_LOADING: "REQUEST_REJECT_LOADING",
  REQUEST_REJECT_SUCCESS: "REQUEST_REJECT_SUCCESS",
  REQUEST_REJECT_FAIL: "REQUEST_REJECT_FAIL",

  // =============================================================================
  // Todo Tab
  // =============================================================================
  GET_TODO_LIST: "GET_TODO_LIST",
  GET_TODO_LIST_SUCCESS: "GET_TODO_LIST_SUCCESS",
  GET_TODO_LIST_FAIL: "GET_TODO_LIST_FAIL",
  GET_TODO_LIST_LOADMORE: "GET_TODO_LIST_LOADMORE",

  START_SERVICE_LOADING: "START_SERVICE_LOADING",
  START_SERVICE_SUCCESS: "START_SERVICE_SUCCESS",
  START_SERVICE_FAIL: "START_SERVICE_FAIL",

  // =============================================================================
  // OnGoing Tab
  // =============================================================================
  GET_ONGOING_LIST: "GET_ONGOING_LIST",
  GET_ONGOING_LIST_SUCCESS: "GET_ONGOING_LIST_SUCCESS",
  GET_ONGOING_LIST_FAIL: "GET_ONGOING_LIST_FAIL",
  GET_ONGOING_LIST_LOADMORE: "GET_ONGOING_LIST_LOADMORE",

  DONE_REQUEST_LOADING: "DONE_REQUEST_LOADING",
  DONE_REQUEST_SUCCESS: "DONE_REQUEST_SUCCESS",
  DONE_REQUEST_FAIL: "DONE_REQUEST_FAIL",

  // =============================================================================
  // Done Tab
  // =============================================================================
  GET_DONE_REQUESTS: "GET_DONE_REQUESTS",
  GET_DONE_REQUESTS_SUCCESS: "GET_DONE_REQUESTS_SUCCESS",
  GET_DONE_REQUESTS_FAIL: "GET_DONE_REQUESTS_FAIL",
  GET_DONE_REQUESTS_LOADMORE: "GET_DONE_REQUESTS_LOADMORE",

  // =============================================================================
  // My Booking Screen
  // =============================================================================

  // =============================================================================
  // Schedule Tab
  // =============================================================================

  GET_SCHEDULE_LOADING: "GET_SCHEDULE_LOADING",
  GET_SCHEDULE_SUCCESS: "GET_SCHEDULE_SUCCESS",
  GET_SCHEDULE_LOADMORE: "GET_SCHEDULE_LOADMORE",
  GET_SCHEDULE_FAIL: "GET_SCHEDULE_FAIL",


  REQUEST_CONFIRM_LOADING: "REQUEST_CONFIRM_LOADING",
  REQUEST_CONFIRM_SUCCESS: "REQUEST_CONFIRM_SUCCESS",
  REQUEST_CONFIRM_FAIL: "REQUEST_CONFIRM_FAIL",

  // =============================================================================
  // Compeleted Tab
  // =============================================================================

  GET_COMPLETED_LOADING: "GET_COMPLETED_LOADING",
  GET_COMPLETED_SUCCESS: "GET_COMPLETED_SUCCESS",
  GET_COMPLETED_LOADMORE: "GET_COMPLETED_LOADMORE",
  GET_COMPLETED_FAIL: "GET_COMPLETED_FAIL",

  // =============================================================================
  // Add Location
  // =============================================================================
  ADD_LOCATION_LOADING: "ADD_LOCATION_LOADING",
  ADD_LOCATION_FAIL : "ADD_LOCATION_FAIL",

  // =============================================================================
  // Add Location
  // =============================================================================
  MAP_LOCATION_LOADING: "MAP_LOCATION_LOADING"

  // =============================================================================
  // Extra
  // =============================================================================
  // LOGGEDIN,
  // LOADING,
  // REFRESHING

}

export default ActionTypes;

