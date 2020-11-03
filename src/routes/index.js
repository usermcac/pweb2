import React from "react";

import async from "../components/Async";

import {
  BookOpen,
  Briefcase,
  Calendar as CalendarIcon,
  CheckSquare,
  CreditCard,
  Grid,
  Heart,
  Layout,
  List,
  Map,
  Monitor,
  ShoppingCart,
  PieChart,
  Sliders,
  User,
  Users,
  ChevronRight,
  Home,
  Zap,
  Circle
} from "react-feather";

// Auth components
const SignIn = async(() => import("../pages/auth/SignIn"));
const SignUp = async(() => import("../pages/auth/SignUp"));
const ResetPassword = async(() => import("../pages/auth/ResetPassword"));
const Page404 = async(() => import("../pages/auth/Page404"));
const Page500 = async(() => import("../pages/auth/Page500"));

// Components components 
const Alerts = async(() => import("../pages/components/Alerts"));
const Avatars = async(() => import("../pages/components/Avatars"));
const Badges = async(() => import("../pages/components/Badges"));
const Buttons = async(() => import("../pages/components/Buttons"));
const Cards = async(() => import("../pages/components/Cards"));
const Chips = async(() => import("../pages/components/Chips"));
const Dialogs = async(() => import("../pages/components/Dialogs"));
const ExpPanels = async(() => import("../pages/components/ExpansionPanels"));
const Lists = async(() => import("../pages/components/Lists"));
const Menus = async(() => import("../pages/components/Menus"));
const Pagination = async(() => import("../pages/components/Pagination"));
const Progress = async(() => import("../pages/components/Progress"));
const Snackbars = async(() => import("../pages/components/Snackbars"));
const Tooltips = async(() => import("../pages/components/Tooltips"));

// Dashboards components
const Default = async(() => import("../pages/dashboards/Default"));
const Analytics = async(() => import("../pages/dashboards/Analytics"));

// Forms components
const Pickers = async(() => import("../pages/forms/Pickers"));
const SelectionCtrls = async(() => import("../pages/forms/SelectionControls"));
const Selects = async(() => import("../pages/forms/Selects"));
const TextFields = async(() => import("../pages/forms/TextFields"));
const Dropzone = async(() => import("../pages/forms/Dropzone"));
const Editors = async(() => import("../pages/forms/Editors"));

// Icons components
const MaterialIcons = async(() => import("../pages/icons/MaterialIcons"));
const FeatherIcons = async(() => import("../pages/icons/FeatherIcons"));

// Pages components
const Blank = async(() => import("../pages/pages/Blank"));
const InvoiceDetails = async(() => import("../pages/pages/InvoiceDetails"));
const Facturas = async(() => import("../pages/pages/Facturas"));
const Citas = async(() => import("../pages/pages/Citas"));
const Gestiones = async(() => import("../pages/pages/Gestiones"));
const Consumo = async(() => import("../pages/pages/Consumo"));
const NuevoServicio = async(() => import("../pages/pages/NuevosServicios"));
const Orders = async(() => import("../pages/pages/Orders"));
const Pricing = async(() => import("../pages/pages/Pricing"));
const Denuncias = async(() => import("../pages/pages/Denuncias"));
const ReportePeligros = async(() => import("../pages/pages/ReportePeligros"));
const Interrupciones = async(() => import("../pages/pages/PowerOutages"));
const Innovacion = async(() => import("../pages/pages/Innovacion"));
const Profile = async(() => import("../pages/pages/Profile"));
const Settings = async(() => import("../pages/pages/Settings"));
const Tasks = async(() => import("../pages/pages/Tasks"));
const Projects = async(() => import("../pages/pages/Projects"));
const Calendar = async(() => import("../pages/pages/Calendar"));

// Tables components
const SimpleTable = async(() => import("../pages/tables/SimpleTable"));
const AdvancedTable = async(() => import("../pages/tables/AdvancedTable"));

// Chart components
const Chartjs = async(() => import("../pages/charts/Chartjs"));

// Maps components
const GoogleMaps = async(() => import("../pages/maps/GoogleMaps"));
const VectorMaps = async(() => import("../pages/maps/VectorMaps"));

// Documentation
const Docs = async(() => import("../pages/docs/Documentation"));
const Changelog = async(() => import("../pages/docs/Changelog"));
const Presentation = async(() => import("../pages/docs/Presentation"));
// CODITY Menu
// const dashboardsRoutes = {
//   id: "Inicio",
//   path: "#",
//   // header: "Consultas",
//   icon: <Home />,
//   // containsHome: true,
//   // children: [
//   //   {
//   //     path: "/dashboard/default",
//   //     name: "Default",
//   //     component: Default
//   //   },
//   //   {
//   //     path: "/dashboard/analytics",
//   //     name: "Analytics",
//   //     component: Analytics
//   //   }
//   // ]
// };

// CODITY -HOMESCREEN
const presentationRoutes = {
  id: "Inicio",
  path: "/", 
  // header: "Docs",
  icon: <Zap />,
  component: Presentation,
  children: null
};

const pagesRoutes = {
  id: "Consultas",
  path: "/pages",
  icon: <Circle />,
  children: [
    {
      path: "/agencias-puntos-de-pago-aes",
      name: "Agencias y puntos de pago",
      component: Settings
    },
    {
      path: "/noticias-aes",
      name: "Noticias",
      component: Pricing
    },
    {
      path: "/denuncias",
      name: "Denuncias de hurto",
      component: Denuncias
    },
    {
      path: "/interrupciones",
      name: "Interrupciones programadas",
      component: Interrupciones
    },
    {
      path: "/peligros-en-la-red",
      name: "Reporte de peligros en la red",
      component: ReportePeligros
    },
    {
      path: "/innovacion",
      name: "Ideas de innovación",
      component: Innovacion
    }
  ]
};

// const profileRoutes = {
//   id: "Profile",
//   path: "/profile",
//   icon: <User />,
//   component: Profile,
//   children: null
// };

// const projectsRoutes = {
//   id: "Projects",
//   path: "/projects",
//   icon: <Briefcase />,
//   badge: "8",
//   component: Projects,
//   children: null
// };

const invoiceRoutes = {
  id: "Gestiones",
  path: "/invoices",
  icon: <Circle />,
  children: [
    {
      path: "/consulta_pago_de_facturas",
      name: "Consulta y pago de facturas",
      component: Facturas
    },
    {
      path: "/citas",
      name: "Citas en oficinas comerciales",
      component: Citas
    },
    {
      path: "/gestiones",
      name: "Gestiones",
      component: Gestiones
    },
    // {
    //   path: "/invoices/detail",
    //   name: "Calculadora de consumo",
    //   component: Facturas
    // },    
    {
      path: "/consumo_en_linea",
      name: "Consumo en linea",
      component: Consumo
    },
    {
      path: "/solicitud_nuevos_servicios",
      name: "Solicitud de servicio nuevo",
      component: NuevoServicio
    }
  ]
};

// const orderRoutes = {
//   id: "Orders",
//   path: "/orders",
//   icon: <ShoppingCart />,
//   component: Orders,
//   children: null
// };

// const tasksRoutes = {
//   id: "Tasks",
//   path: "/tasks",
//   icon: <CheckSquare />,
//   badge: "17",
//   component: Tasks,
//   children: null
// };

// const calendarRoutes = {
//   id: "Calendar",
//   path: "/calendar",
//   icon: <CalendarIcon />,
//   component: Calendar,
//   children: null
// };

// const authRoutes = {
//   id: "Mi cuenta",
//   path: "/auth",
//   icon: <Users />,
//   children: [
//     {
//       path: "/auth/sign-in",
//       name: "Inicio de sesión",
//       component: SignIn
//     },
//     {
//       path: "/auth/sign-up",
//       name: "Registro",
//       component: SignUp
//     },
//     {
//       path: "/auth/reset-password",
//       name: "Recuperar contraseña",
//       component: ResetPassword
//     }
//     // ,
//     // {
//     //   path: "/auth/404",
//     //   name: "404 Page",
//     //   component: Page404
//     // },
//     // {
//     //   path: "/auth/500",
//     //   name: "500 Page",
//     //   component: Page500
//     // }
//   ]
// };

// const componentsRoutes = {
//   id: "Components",
//   path: "/components",
//   header: "Elements",
//   icon: <Grid />,
//   children: [
//     {
//       path: "/components/alerts",
//       name: "Alerts",
//       component: Alerts
//     },
//     {
//       path: "/components/avatars",
//       name: "Avatars",
//       component: Avatars
//     },
//     {
//       path: "/components/badges",
//       name: "Badges",
//       component: Badges
//     },
//     {
//       path: "/components/buttons",
//       name: "Buttons",
//       component: Buttons
//     },
//     {
//       path: "/components/cards",
//       name: "Cards",
//       component: Cards
//     },
//     {
//       path: "/components/chips",
//       name: "Chips",
//       component: Chips
//     },
//     {
//       path: "/components/dialogs",
//       name: "Dialogs",
//       component: Dialogs
//     },
//     {
//       path: "/components/expansion-panels",
//       name: "Expansion Panels",
//       component: ExpPanels
//     },
//     {
//       path: "/components/lists",
//       name: "Lists",
//       component: Lists
//     },
//     {
//       path: "/components/menus",
//       name: "Menus",
//       component: Menus
//     },
//     {
//       path: "/components/pagination",
//       name: "Pagination",
//       component: Pagination
//     },
//     {
//       path: "/components/progress",
//       name: "Progress",
//       component: Progress
//     },
//     {
//       path: "/components/snackbars",
//       name: "Snackbars",
//       component: Snackbars
//     },
//     {
//       path: "/components/tooltips",
//       name: "Tooltips",
//       component: Tooltips
//     }
//   ]
// };

// const formsRoutes = {
//   id: "Forms",
//   path: "/forms",
//   icon: <CheckSquare />,
//   children: [
//     {
//       path: "/forms/pickers",
//       name: "Pickers",
//       component: Pickers
//     },
//     {
//       path: "/forms/selection-controls",
//       name: "Selection Controls",
//       component: SelectionCtrls
//     },
//     {
//       path: "/forms/selects",
//       name: "Selects",
//       component: Selects
//     },
//     {
//       path: "/forms/text-fields",
//       name: "Text Fields",
//       component: TextFields
//     },
//     {
//       path: "/forms/dropzone",
//       name: "Dropzone",
//       component: Dropzone
//     },
//     {
//       path: "/forms/editors",
//       name: "Editors",
//       component: Editors
//     }
//   ]
// };

// const tablesRoutes = {
//   id: "Tables",
//   path: "/tables",
//   icon: <List />,
//   children: [
//     {
//       path: "/tables/simple-table",
//       name: "Simple Table",
//       component: SimpleTable
//     },
//     {
//       path: "/tables/advanced-table",
//       name: "Advanced Table",
//       component: AdvancedTable
//     }
//   ]
// };

// const iconsRoutes = {
//   id: "Icons",
//   path: "/icons",
//   icon: <Heart />,
//   children: [
//     {
//       path: "/icons/material-icons",
//       name: "Material Icons",
//       component: MaterialIcons
//     },
//     {
//       path: "/icons/feather-icons",
//       name: "Feather Icons",
//       component: FeatherIcons
//     }
//   ]
// };

// const chartRoutes = {
//   id: "Charts",
//   path: "/charts",
//   icon: <PieChart />,
//   component: Chartjs,
//   children: null
// };

// const mapsRoutes = {
//   id: "Maps",
//   path: "/maps",
//   icon: <Map />,
//   children: [
//     {
//       path: "/maps/google-maps",
//       name: "Google Maps",
//       component: GoogleMaps
//     },
//     {
//       path: "/maps/vector-maps",
//       name: "Vector Maps",
//       component: VectorMaps
//     }
//   ]
// };



// const documentationRoutes = {
//   id: "Getting Started",
//   path: "/documentation",
//   icon: <BookOpen />,
//   component: Docs,
//   children: null
// };

// const changelogRoutes = {
//   id: "Changelog",
//   path: "/changelog",
//   badge: "v1.0.8",
//   icon: <List />,
//   component: Changelog,
//   children: null
// };

// This route is not visisble in the sidebar
const privateRoutes = {
  id: "Private",
  path: "/private",
  component: Blank,
  children: null
};

export const dashboard = [
  //dashboardsRoutes,
  presentationRoutes,
  pagesRoutes,
  // profileRoutes,
  // projectsRoutes,
  // orderRoutes,
  invoiceRoutes,
  //tasksRoutes,
  // calendarRoutes,
  //componentsRoutes,
  //chartRoutes,
  //formsRoutes,
  // tablesRoutes,
  // iconsRoutes,
  // mapsRoutes,
  
//  documentationRoutes,
//  changelogRoutes,
  privateRoutes
];

// export const auth = [authRoutes];

export default [
  presentationRoutes,
  //dashboardsRoutes,
  pagesRoutes,
  // profileRoutes,
  // projectsRoutes,
  // orderRoutes,
  invoiceRoutes,
  // tasksRoutes,
  // calendarRoutes,
  // authRoutes,
  // componentsRoutes,
  //chartRoutes,
  //formsRoutes,
  // tablesRoutes,
  // iconsRoutes,
  // mapsRoutes,
  
  // documentationRoutes,
  // changelogRoutes
];
