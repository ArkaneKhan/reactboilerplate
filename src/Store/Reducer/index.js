import SignInReducer from "../../Modules/SignIn/SignInReducer";
import SignUpReducer from "../../Modules/SignUp/SignUpReducer";
import ForgotPasswordReducerfrom from "../../Modules/ForgotPassword/ForgotPasswordReducer";
import ChangePasswordReducer from "../../Modules/ChangePassoword/ChangePasswordReducer";
import HomeReducer from "../../Modules/Customer/Home/HomeReducer";
import EditReducer from "../../Modules/EditProfile/EditProfileReducer";
// import CompanyProfileReducer from '../../Modules/CompanyProfile/CompanyProfileReducer'
import RequestReducer from "../../Modules/Worker/Requests/RequestsReducer";
import TodoReducer from "../../Modules/Worker/Todo/TodoReducer";
import OnGoingReducer from "../../Modules/Worker/OnGoing/OnGoingReducer";
import DoneReducer from "../../Modules/Worker/Done/DoneReducer";
import MyBookingsReducer from "../../Modules/Customer/MyBookings/MyBookingsReducer";
import MapReducer from "../../Modules/Customer/Map/MapReducer";
import AddLocation from "../../Modules/Customer/AddLocation/AddLocationReducer";

export default {
  signIn: SignInReducer,
  signUp: SignUpReducer,
  forgot: ForgotPasswordReducerfrom,
  changePassword: ChangePasswordReducer,
  home: HomeReducer,
  edit: EditReducer,
  // companyProfile: CompanyProfileReducer,
  requests: RequestReducer,
  todo: TodoReducer,
  onGoing: OnGoingReducer,
  done: DoneReducer,
  myBookings: MyBookingsReducer,
  map: MapReducer,
  addLocation: AddLocation

  //  nav : navReducer,
};
