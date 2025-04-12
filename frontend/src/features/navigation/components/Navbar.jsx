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
import { Button, Stack, useMediaQuery, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { selectUserInfo } from "../../user/UserSlice";
import { selectLoggedInUser } from "../../auth/AuthSlice";
import { styled } from "@mui/material/styles";
import {
  selectProductIsFilterOpen,
  toggleFilters,
} from "../../products/ProductSlice";
const StyledAppBar = styled(AppBar)({
  background: "linear-gradient(90deg, #0F3F80, #047d61)",
  boxShadow: "0px 4px 10px rgba(15, 63, 128, 0.3)",
});

const StyledButton = styled(Button)({
  background: "linear-gradient(45deg, #C27B06, #C24E06)",
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
        <Typography
          variant="h5"
          component={Link}
          to="/"
          sx={{
            textDecoration: "none",
            color: "#ffffff",
            fontWeight: "bold",
            letterSpacing: "2px",
            fontFamily: "monospace",
          }}
        >
          CLIM75
        </Typography>
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
            <MenuItem
              onClick={handleCloseUserMenu}
              component={Link}
              to="/logout"
            >
              Déconnexion
            </MenuItem>
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
