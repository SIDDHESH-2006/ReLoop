import { createBrowserRouter } from "react-router";
import Root from "./Root";
import Landing from "../pages/Landing";
import About from "../pages/About";
import GetStarted from "../pages/GetStarted";
import FoodInstitution from "../pages/onboarding/FoodInstitution";
import RecyclerUpcycler from "../pages/onboarding/RecyclerUpcycler";
import NgoDonation from "../pages/onboarding/NgoDonation";
import Marketplace from "../pages/Marketplace";
import SellItem from "../pages/sell/SellItem";
import SellAnalysis from "../pages/sell/SellAnalysis";
import ItemDetail from "../pages/ItemDetail";
import ListItem from "../pages/ListItem";
import Analyze from "../pages/Analyze";
import Passport from "../pages/Passport";
import Dashboard from "../pages/Dashboard";
import Impact from "../pages/Impact";
import CampusMap from "../pages/CampusMap";
import NotFound from "../pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Landing },
      { path: "about", Component: About },
      { path: "get-started", Component: GetStarted },
      { path: "food-institutions", Component: FoodInstitution },
      { path: "recyclers-upcyclers", Component: RecyclerUpcycler },
      { path: "ngos-donations", Component: NgoDonation },
      { path: "marketplace", Component: Marketplace },
      { path: "marketplace/:id", Component: ItemDetail },
      { path: "sell", Component: SellItem },
      { path: "sell/analysis", Component: SellAnalysis },
      { path: "list", Component: ListItem },
      { path: "analyze", Component: Analyze },
      { path: "passport/:id", Component: Passport },
      { path: "dashboard", Component: Dashboard },
      { path: "impact", Component: Impact },
      { path: "map", Component: CampusMap },
      { path: "*", Component: NotFound },
    ],
  },
]);
