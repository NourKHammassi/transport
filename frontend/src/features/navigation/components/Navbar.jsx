import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link, useNavigate } from "react-router-dom";
import { Box, Button, Stack, useMediaQuery, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { selectUserInfo } from "../../user/UserSlice";
import { selectLoggedInUser } from "../../auth/AuthSlice";
import { styled } from "@mui/material/styles";
import {
  selectProductIsFilterOpen,
  toggleFilters,
} from "../../products/ProductSlice";
import { van, VanIcon } from "../../../assets";
const StyledAppBar = styled(AppBar)({
  background: "linear-gradient(90deg, #3D3326, #3D3726)",
  boxShadow: "0px 4px 10px rgba(25, 33, 39, 0.3)", // using complement color
});

const StyledButton = styled(Button)({
  background: "linear-gradient(45deg, #3D3726, #1D1D2A)", // secondary and secondary#2
  color: "white",
  fontWeight: "bold",
  padding: "6px 16px",
  borderRadius: "8px",
  transition: "0.3s",
  "&:hover": {
    transform: "scale(1.05)",
  },
});

export const Navbar = ({ isProductList = false }) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const userInfo = useSelector(selectUserInfo);
  const loggedInUser = useSelector(selectLoggedInUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleToggleFilters = () => {
    dispatch(toggleFilters());
  };

  const settings = [
    { name: "Accueil", to: "/" },
    {
      name: "Mon profil",
      to: "/profile",
    },
    { name: "Se déconnecter", to: "/logout" },
  ];

  return (
    <StyledAppBar position="sticky">
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 20px",
        }}
      >
        <Box
          component={Link}
          to="/"
          sx={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            color: "#ffffff",
            fontWeight: "bold",
            letterSpacing: "2px",
            fontFamily: "monospace",
          }}
        >
          <svg
            fill="#ffffff"
            height="36px"
            width="36px"
            viewBox="0 0 60.032 60.032"
            xmlns="http://www.w3.org/2000/svg"
            style={{ marginRight: "8px" }}
          >
            <g>
              <path d="M56.661,17.515c-2.245,0-32.292,0-36.224,0c-3.93,0-11.428,9.674-11.428,9.674s-4.296,0.719-7.103,2.401 c-2.806,1.688-1.684,8.423-1.684,8.423h4.352c0-2.791,2.263-5.052,5.054-5.052c2.792,0,5.055,2.265,5.055,5.052h30.958 c0-2.791,2.262-5.052,5.053-5.052c2.793,0,5.056,2.265,5.056,5.052h4.282V25.66C60.032,25.66,58.909,17.515,56.661,17.515z M4.166,32.012H1.839v-1.477h2.328L4.166,32.012L4.166,32.012z M25.847,25.412H13.42c0,0,4.423-5.614,6.529-5.614 c2.105,0,5.898,0,5.898,0L25.847,25.412L25.847,25.412z M38.134,25.412h-9.76v-5.613h9.76V25.412z M48.872,25.347h-9.533v-5.613 h9.533V25.347z M50.066,25.412v-5.613h5.896l1.264,5.616L50.066,25.412L50.066,25.412z M58.62,34.958h-0.786v-9.3h0.786V34.958z M9.51,33.517c-2.485,0-4.5,2.014-4.5,4.496c0,2.486,2.015,4.504,4.5,4.504s4.501-2.018,4.501-4.504 C14.011,35.531,11.994,33.517,9.51,33.517z M9.509,39.989c-1.089,0-1.973-0.885-1.973-1.977c0-1.088,0.885-1.972,1.973-1.972 s1.974,0.884,1.974,1.972C11.483,39.105,10.596,39.989,9.509,39.989z M50.553,33.517c-2.482,0-4.498,2.014-4.498,4.496 c0,2.486,2.016,4.504,4.498,4.504s4.498-2.018,4.498-4.504C55.052,35.531,53.036,33.517,50.553,33.517z M50.553,39.989 c-1.086,0-1.975-0.885-1.975-1.977c0-1.088,0.889-1.972,1.975-1.972c1.088,0,1.974,0.884,1.974,1.972 C52.524,39.105,51.639,39.989,50.553,39.989z M15,38.437h30.917v1.474H15V38.437z" />
            </g>
          </svg>
          <Typography variant="h6" sx={{ color: "inherit", fontWeight: "bold" }}>
            Union Prestige
          </Typography>
        </Box>

        <Stack direction="row" alignItems="center" spacing={2}>
          <Tooltip title="Paramètres">
            <IconButton onClick={handleOpenUserMenu}>
              <Avatar alt={userInfo?.name} src={userInfo?.avatar || "null"} />
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorElUser}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
            sx={{ mt: 2 }}
          >
            {loggedInUser?.isAdmin && (
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography
                  component={Link}
                  color={"text.primary"}
                  sx={{ textDecoration: "none" }}
                  to="/admin/add-product"
                  textAlign="center"
                >
                  Ajouter un service
                </Typography>
              </MenuItem>
            )}
            <MenuItem
              onClick={handleCloseUserMenu}
              component={Link}
              to="/profile"
            >
              Mon Profil
            </MenuItem>
            {loggedInUser ? (<>              <MenuItem
              onClick={handleCloseUserMenu}
              component={Link}
              to="/logout"
            >
              Déconnexion
            </MenuItem></>) : (<>             <MenuItem
              onClick={handleCloseUserMenu}
              component={Link}
              to="/login"
            >
              Se Connecter
            </MenuItem>
            </>)
            }

          </Menu>
          <Typography variant="body1" sx={{ color: "#ffffff" }}>
            {isMobile ? (
              userInfo == undefined ? (
                <StyledButton onClick={() => navigate("/login")}>
                  Connexion
                </StyledButton>
              ) : (
                userInfo?.name?.split(" ")[0]
              )
            ) : userInfo == undefined ? (
              <StyledButton onClick={() => navigate("/login")}>
                Connexion
              </StyledButton>
            ) : (
              `Salut, ${userInfo?.name}`
            )}
          </Typography>
          {loggedInUser?.isAdmin && (
            <StyledButton onClick={() => navigate("/admin/dashboard")}>
              Admin
            </StyledButton>
          )}
        </Stack>
      </Toolbar>
    </StyledAppBar>
  );
};
