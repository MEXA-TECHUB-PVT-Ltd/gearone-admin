import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Settings from "./scenes/settings";
import Terms from "./scenes/Terms";
import Privacy from "./scenes/Privacy";
import Updatepassword from "./scenes/updatepassword";
import Dashboard from "./scenes/dashboard";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import LoginPage from "./scenes/loginPage/login"
import ManageLogos from "./scenes/ManageLogos"
import Addworkoutplans from "./scenes/addworkoutplans"
import AddworkoutplanExercises from "./scenes/addworkoutexercises"
import Updateworkoutplan from "./scenes/updateworkoutplan"
import WorkoutDetail from "./scenes/workoutplandetails"
import ManageBannersAds from "./scenes/manageBannersAds"
import AddExercise from "./scenes/addexercise"
import ExerciseDetail from "./scenes/exercisedetail"
import UpdateExercise from "./scenes/updateexercise"
import Dietplan from "./scenes/dietplan"
import Addfood from "./scenes/addfood"
import UpdateDietplan from "./scenes/updatedietplan"
import Categories from "./scenes/categories"
import Users from "./scenes/viewusers"
import UpdateDailyDeals from "./scenes/updateDailyDeals"
import AddDailyDeals from "./scenes/addDailyDeals"
import AddMerchandise from "./scenes/addMerchandise"
import Subscription from "./scenes/subscription"
import Faqs from "./scenes/faqs"
import ManageUsers from "./scenes/ManageUsers"
import UserDetails from "./scenes/UserDetails"
import ReportItems from "./scenes/ReportItems"
import ReportedItemDetails from "./scenes/ReportedItemDetails"

import PrivacyPolicy from "./scenes/privacy&policy"
import TermConditions from "./scenes/term&conditions"
import SettingsData from "./scenes/settingsData"
import Emailverification from "./scenes/emailverification/Emailverification";
import Setnewpassword from "./scenes/setnewpassword/Setnewpassword";
import Profile from "./scenes/profile/Profile";
import UpdateMerchandise from "./scenes/updateMerchandise"
import EditMerchandise from "./scenes/EditMerchandise"
import AddLogo from "./scenes/addLogo"
import UpdateLogo from "./scenes/UpdateLogo"
import Orders from "./scenes/Orders"

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const { pathname } = useLocation();
  useEffect(() => {
    if (window.location.pathname === '/' && window.location.pathname === '/emailverification' && window.location.pathname === '/setnewpassword') {
      setIsSidebar(false);

    }
  }, []);
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <div className="app">
          {pathname === '/' ? null :
            pathname === '/emailverification' ? null :
              pathname === '/setnewpassword' ? null :
                <Sidebar isSidebar={isSidebar} />
          }
          <main className="content">
            {pathname === '/' ? null :
              pathname === '/emailverification' ? null :
                pathname === '/setnewpassword' ? null :
                  <Topbar setIsSidebar={setIsSidebar} />
            }

            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/emailverification" element={<Emailverification />} />
              <Route path="/setnewpassword" element={<Setnewpassword />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/updatepassword" element={<Updatepassword />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/ManageLogos" element={<ManageLogos />} />
              <Route path="/addworkoutplans" element={<Addworkoutplans />} />
              <Route path="/addexercises" element={<AddworkoutplanExercises />} />
              <Route path="/updateworkoutplan" element={<Updateworkoutplan />} />
              <Route path="/workoutdetail" element={<WorkoutDetail />} />
              <Route path="/ReportItems" element={<ReportItems />} />
              <Route path="/Orders" element={<Orders />} />
              <Route path="/ReportedItemDetails" element={<ReportedItemDetails />} />

              <Route path="/Terms" element={<Terms />} />
              <Route path="/Privacy" element={<Privacy />} />
              <Route path="/AddMerchandise" element={<AddMerchandise />} />
              <Route path="/addDailyDeals" element={<AddDailyDeals />} />
              <Route path="/updateMerchandise" element={<UpdateMerchandise />} />
              <Route path="/UpdateLogo" element={<UpdateLogo />} />
              <Route path="/ManageUsers" element={<ManageUsers />} />

              <Route path="/EditMerchandise" element={<EditMerchandise />} />
              <Route path="/AddLogo" element={<AddLogo />} />
              <Route path="/updateDailyDeals" element={<UpdateDailyDeals />} />
              <Route path="/manage_banners_ads" element={<ManageBannersAds />} />
              <Route path="/addexercise" element={<AddExercise />} />
              <Route path="/exercisedetail" element={<ExerciseDetail />} />
              <Route path="/updateexercise" element={<UpdateExercise />} />
              <Route path="/dietplan" element={<Dietplan />} />
              <Route path="/addfood" element={<Addfood />} />
              <Route path="/updatedietplan" element={<UpdateDietplan />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/users" element={<Users />} />
              <Route path="/UserDetails" element={<UserDetails />} />
              <Route path="/subscription" element={<Subscription />} />
              <Route path="/faqs" element={<Faqs />} />
              <Route path="/pivacy&policy" element={<PrivacyPolicy />} />
              <Route path="/term&conditions" element={<TermConditions />} />
              <Route path="/settings" element={<SettingsData />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;

