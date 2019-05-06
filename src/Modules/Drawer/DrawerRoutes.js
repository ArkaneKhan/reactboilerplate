import {AppConstants} from '../../AppConstants';
import { Images } from '../../Assets';

export const WorkerDrawerRoutes = [
  {
    id: '1',
    title: AppConstants.myJobs,
    route: "WorkerHomeStack",
    lhsImage: Images.icMyJobs,
    IsActive: true,
  },
  {
    id: '2',
    title: AppConstants.componayProfile,
    route: "WorkerCompanyProfileStack",
    lhsImage: Images.icProfile,
    IsActive: false,
  },
  {
    id: '3',
    title: AppConstants.notifications,
    route: "WorkerNotificationScreen",
    lhsImage: Images.icNotification,
    IsActive: false,
  },
  {
    id: '4',
    title: AppConstants.settings,
    route: "WorkerSettingStack",
    lhsImage: Images.icSettings,
    IsActive: false,
  },
  {
    id: '5',
    title: AppConstants.logout,
    route: "",
    lhsImage: Images.icLogout,
    IsActive: false,
  },
]

export const CustomerDrawerRoutes = [
  {
    id: '1',
    title: AppConstants.home,
    route: "CustomerHomeStack",
    lhsImage: Images.icHome,
    IsActive: true,
  },
  {
    id: '2',
    title: AppConstants.myBookings,
    route: "MyBookings",
    lhsImage: Images.icMyBookings,
    IsActive: false,
  },
  {
    id: '3',
    title: AppConstants.rateApplication,
    route: "RateApplication",
    lhsImage: Images.icStar,
    IsActive: false,
  },
  {
    id: '4',
    title: AppConstants.inviteFriends,
    route: "InviteFriends",
    lhsImage: Images.icInviteFriends,
    IsActive: false,
  },
  {
    id: '5',
    title: AppConstants.notifications,
    route: "CustomerNotificationScreen",
    lhsImage: Images.icNotification,
    IsActive: false,
  },
  {
    id: '6',
    title: AppConstants.settings,
    route: "CustomerSettingStack",
    lhsImage: Images.icSettings,
    IsActive: false,
  },
  {
    id: '7',
    title: AppConstants.logout,
    route: "",
    lhsImage: Images.icLogout,
    IsActive: false,
  },
]