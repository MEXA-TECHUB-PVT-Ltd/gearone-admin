import React, { useState, useEffect } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import StorefrontIcon from '@mui/icons-material/Storefront';
import PasswordIcon from '@mui/icons-material/Password';
import GavelIcon from '@mui/icons-material/Gavel';
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
import { Apps, Dashboard, People, PrivacyTip } from "@mui/icons-material";
import logo from '../../components/Images/logo.svg'
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import CategoryIcon from '@mui/icons-material/Category';

const logoStyle = {
  paddingTop: 5,
  width: '100%',
  height: '40%'
}

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: "gray",
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography fontWeight="bold">{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [btnHidesmall, setbtnHideSmall] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  useEffect(() => {
    const interval = setInterval(() => {
      if (window.innerWidth < 820) {
        setIsCollapsed(true)
        setbtnHideSmall(false)
      } else {
        setIsCollapsed(false)
        setbtnHideSmall(true)
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        // backgroundColor: "red",
        "& .pro-sidebar-inner": {
          boxShadow: "0px 3px 8px #00000029",
          background: `white !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "gray !important",
        },
        "& .pro-menu-item.active": {
          color: "#B5030B !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed} >
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          {
            btnHidesmall ?
              <MenuItem
                onClick={() => setIsCollapsed(!isCollapsed)}
                icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
                style={{
                  margin: "10px 0 20px 0",
                  color: colors.grey[100],
                }}
              >
                {!isCollapsed && (
                  <Box
                  // display="flex"
                  // justifyContent="space-between"
                  // alignItems="center"
                  // ml="15px"
                  >
                    <div style={{ display: "flex", alignContent: "center", justifyContent: "center" }}>
                      <img src={logo} style={{ width: '120px', height: '120px' }} />
                    </div>
                    {/* <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                      <MenuOutlinedIcon />
                    </IconButton> */}
                  </Box>
                )}
              </MenuItem>
              :
              null
          }

          <Typography variant="paragraph" color="#202020" sx={{ pl: 1.5, font: "normal normal medium 22px/32px Roboto", fontWeight: 600, fontSize: "15px", letterSpacing: "1px" }}>
            Menu
          </Typography>

          <Box paddingLeft={isCollapsed ? undefined : "5%"}>
            <Item
              title="Dashboard"
              to="/dashboard"
              icon={<Dashboard />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Manage Users"
              to="/ManageUsers"
              icon={<People />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Manage Logos"
              to="/ManageLogos"
              icon={<ViewCarouselIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Manage Banners Ads "
              to="/manage_banners_ads"
              icon={<ViewCarouselIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Manage Items"
              to="/dietplan"
              icon={<Apps />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Reported Items"
              to="/ReportItems"
              icon={<Apps />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Orders"

              to="/Orders"
              icon={<CategoryIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Categories"
              to="/categories"
              icon={<CategoryIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Manage Merchandise"
              to="/users"
              icon={<StorefrontIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Manage Daily Deals"
              to="/subscription"
              icon={<ManageHistoryIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            {/* <Item
              title="Terms And Conditions"
              to="/Terms"
              icon={<GavelIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Privacy Policy"
              to="/Privacy"
              icon={<PrivacyTip />}
              selected={selected}
              setSelected={setSelected}
            /> */}
            <Item
              title="Change Password"
              to="/updatepassword"
              icon={<PasswordIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            {/*  
            <Item
              title="Payment From Customers"
              to="/paymentsfromcustomers"
              icon={<AccountBalanceWallet />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Appointment Cancellation Reasons"
              to="/cancellationreason"
              icon={<Cancel />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Complaint Reasons"
              to="/complaintreason"
              icon={<ThumbDown />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Refunds To Customers"
              to="/refundstocustomers"
              icon={<Receipt />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Customers"
              to="/customers"
              icon={<Visibility />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Payments Received"
              to="/paymentsreceived"
              icon={<Payment />}
              selected={selected}
              setSelected={setSelected}
            />  */}

          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
