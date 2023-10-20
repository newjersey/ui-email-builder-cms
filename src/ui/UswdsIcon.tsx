import React, { FC } from 'react'

interface UswdsIconProps {
  icon: keyof typeof UswdsIconVariants
}

export const UswdsIcon: FC<UswdsIconProps> = ({icon}) => {
  return <img src={`/icons/${UswdsIconVariants[icon]}.png`} alt="" />
}

export const UswdsIconVariants = {
  AccessibilityNew: "accessibility_new",
  AccessibleForward: "accessible_forward",
  AccountBalance: "account_balance",
  AccountBox: "account_box",
  AccountCircle: "account_circle",
  AddCircleOutline: "add_circle_outline",
  AddCircle: "add_circle",
  Add: "add",
  Alarm: "alarm",
  AlternateEmail: "alternate_email",
  Announcement: "announcement",
  Api: "api",
  ArrowBack: "arrow_back",
  ArrowDownward: "arrow_downward",
  ArrowDropDown: "arrow_drop_down",
  ArrowDropUp: "arrow_drop_up",
  ArrowForward: "arrow_forward",
  ArrowUpward: "arrow_upward",
  Assessment: "assessment",
  AttachFile: "attach_file",
  AttachMoney: "attach_money",
  Autorenew: "autorenew",
  Backpack: "backpack",
  Bathtub: "bathtub",
  Bedding: "bedding",
  Bookmark: "bookmark",
  BugReport: "bug_report",
  Build: "build",
  CalendarToday: "calendar_today",
  Campaign: "campaign",
  Camping: "camping",
  Cancel: "cancel",
  Chat: "chat",
  CheckCircleOutline: "check_circle_outline",
  CheckCircle: "check_circle",
  Check: "check",
  Checkroom: "checkroom",
  CleanHands: "clean_hands",
  Close: "close",
  ClosedCaption: "closed_caption",
  Clothes: "clothes",
  Cloud: "cloud",
  Code: "code",
  Comment: "comment",
  ConnectWithoutContact: "connect_without_contact",
  Construction: "construction",
  ContactPage: "contact_page",
  ContentCopy: "content_copy",
  Coronavirus: "coronavirus",
  CreditCard: "credit_card",
  Deck: "deck",
  Delete: "delete",
  DeviceThermostat: "device_thermostat",
  DirectionsBike: "directions_bike",
  DirectionsBus: "directions_bus",
  DirectionsCar: "directions_car",
  DirectionsWalk: "directions_walk",
  Directions: "directions",
  DoNotDisturb: "do_not_disturb",
  DoNotTouch: "do_not_touch",
  DragHandle: "drag_handle",
  Eco: "eco",
  Edit: "edit",
  ElectricalServices: "electrical_services",
  EmojiEvents: "emoji_events",
  ErrorOutline: "error_outline",
  Error: "error",
  Event: "event",
  ExpandLess: "expand_less",
  ExpandMore: "expand_more",
  Facebook: "facebook",
  FastForward: "fast_forward",
  FastRewind: "fast_rewind",
  FavoriteBorder: "favorite_border",
  Favorite: "favorite",
  FileDownload: "file_download",
  FilePresent: "file_present",
  FileUpload: "file_upload", 
  FilterAlt: "filter_alt",
  FilterList: "filter_list",
  Fingerprint: "fingerprint",
  FirstPage: "first_page",
  Flag: "flag",
  Flickr: "flickr",
  Flight: "flight",
  Flooding: "flooding",
  FolderOpen: "folder_open",
  Folder: "folder",
  FormatQuote: "format_quote",
  FormatSize: "format_size",
  Forum: "forum",
  Github: "github",
  GridView: "grid_view",
  GroupAdd: "group_add",
  Groups: "groups",
  Hearing: "hearing",
  HelpOutline: "help_outline",
  Help: "help",
  HighlightOff: "highlight_off",
  History: "history",
  Home: "home",
  Hospital: "hospital",
  Hotel: "hotel",
  HourglassEmpty: "hourglass_empty",
  Hurricane: "hurricane",
  Identification: "identification",
  Image: "image",
  InfoOutline: "info_outline",
  Info: "info",
  Insights: "insights",
  Instagram: "instagram",
  Keyboard: "keyboard",
  Label: "label",
  Language: "language",
  LastPage: "last_page",
  Launch: "launch",
  LightbulbOutline: "lightbulb_outline",
  Lightbulb: "lightbulb",
  LinkOff: "link_off",
  Link: "link",
  List: "list",
  LocalCafe: "local_cafe",
  LocalFireDepartment: "local_fire_department",
  LocalGasStation: "local_gas_station",
  LocalGroceryStore: "local_grocery_store",
  LocalHospital: "local_hospital",
  LocalLaundryService: "local_laundry_service",
  LocalLibrary: "local_library",
  LocalOffer: "local_offer",
  LocalParking: "local_parking",
  LocalPharmacy: "local_pharmacy",
  LocalPolice: "local_police",
  LocalTaxi: "local_taxi",
  LocationCity: "location_city",
  LocationOn: "location_on",
  LockOpen: "lock_open",
  LockOutline: "lock_outline",
  Lock: "lock",
  Logout: "logout",
  Loop: "loop",
  MailOutline: "mail_outline",
  Mail: "mail",
  Map: "map",
  Masks: "masks",
  MedicalServices: "medical_services",
  Menu: "menu",
  MilitaryTech: "military_tech",
  MoreHoriz: "more_horiz",
  MoreVert: "more_vert",
  MyLocation: "my_location",
  NavigateBefore: "navigate_before",
  NavigateFarBefore: "navigate_far_before",
  NavigateFarNext: "navigate_far_next",
  NavigateNext: "navigate_next",
  NearMe: "near_me",
  NotificationsActive: "notifications_active",
  NotificationsNone: "notifications_none",
  NotificationsOff: "notifications_off",
  Notifications: "notifications",
  Park: "park",
  People: "people",
  Person: "person",
  Pets: "pets",
  Phone: "phone",
  PhotoCamera: "photo_camera",
  Print: "print",
  PriorityHigh: "priority_high",
  Public: "public",
  PushPin: "push_pin",
  RadioButtonUnChecked: "radio_button_un_checked",
  Rain: "rain",
  ReduceCapacity: "reduce_capacity",
  Remove: "remove",
  Report: "report",
  Restaurant: "restaurant",
  RssFeed: "rss_feed",
  SafetyDivider: "safety_divider",
  Sanitizer: "sanitizer",
  SaveAlt: "save_alt",
  Schedule: "schedule",
  School: "school",
  Science: "science",
  Search: "search",
  Security: "security",
  Send: "send",
  SentimentDissatisfied: "sentiment_dissatisfied",
  SentimentNeutral: "sentiment_neutral",
  SentimentSatisfiedAlt: "sentiment_satisfied_alt",
  SentimentSatisfied: "sentiment_satisfied",
  SentimentVeryDissatisfied: "sentiment_very_dissatisfied",
  Settings: "settings",
  SevereWeather: "severe_weather",
  Share: "share",
  Shield: "shield",
  ShoppingBasket: "shopping_basket",
  Snow: "snow",
  Soap: "soap",
  SocialDistance: "social_distance",
  SortArrow: "sort_arrow",
  Spellcheck: "spellcheck",
  StarHalf: "star_half",
  StarOutline: "star_outline",
  Star: "star",
  Store: "store",
  Subtract: "subtract",
  SupportAgent: "support_agent",
  Support: "support",
  TextFields: "text_fields",
  ThumbDownOffAlt: "thumb_down_off_alt",
  ThumbUpAlt: "thumb_up_alt",
  Timer: "timer",
  ToggleOff: "toggle_off",
  ToggleOn: "toggle_on",
  Topic: "topic",
  Tornado: "tornado",
  Translate: "translate",
  TrendingDown: "trending_down",
  TrendingUp: "trending_up",
  Twitter: "twitter",
  Undo: "undo",
  UnfoldLess: "unfold_less",
  UnfoldMore: "unfold_more",
  Update: "update",
  UploadFile: "upload_file",
  VerifiedUser: "verified_user",
  Verified: "verified",
  VisisbilityOff: "visisbility_off",
  Visibility: "visibility",
  VolumeOff: "volume_off",
  Warning: "warning",
  Wash: "wash",
  Wifi: "wifi",
  Work: "work",
  Youtube: "youtube",
  ZoomIn: "zoom_in",
  ZoomOutMap: "zoom_out_map",
  ZoomOut: "zoom_out",
} as const