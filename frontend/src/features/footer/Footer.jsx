import * as React from "react";
import {
  Stack,
  Typography,
  Box,
  useMediaQuery,
  useTheme,
  Grid,
} from "@mui/material";
import { FaCcMastercard, FaCcVisa, FaCcAmex, FaFacebookF, FaInstagram } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { selectLoggedInUser } from "../auth/AuthSlice";

const StyledFooter = styled(Stack)(({ theme }) => ({
  background: "linear-gradient(90deg, #3D3326, #3D3726)",
  padding: "2rem 1.5rem 1rem",
  color: "#ffffff",
  justifyContent: "space-between",
  [theme.breakpoints.down("sm")]: {
    textAlign: "center",
    alignItems: "center",
  },
}));

const FooterTitle = styled(Typography)({
  fontSize: "1.1rem",
  fontWeight: "bold",
  color: "#C27B06", // Keep the gold for contrast, or change to #C24E06 if you prefer a red-orange
});

const FooterLink = styled(Typography)({
  fontWeight: 300,
  fontSize: "0.9rem",
  color: "#ffffff",
  cursor: "pointer",
  transition: "color 0.3s",
  "&:hover": {
    color: "#C27B06", // You can change this to something like "#FFD700" or "#C24E06" for better harmony
  },
});


export const Footer = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const loggedInUser = useSelector(selectLoggedInUser);

  return (
    <StyledFooter>
      <Grid container justifyContent="space-around" flexWrap="wrap">
        {/* Bloc 1 : Informations sur la Société */}
        <Grid item xs={6} md="false" >
          <Stack spacing={1} sx={{ minWidth: 250 }} style={{ marginLeft: "20%" }}>
            <FooterTitle>Informations sur la Société</FooterTitle>
            <Grid container spacing={0.5}>
              <Grid item xs={3}>
                <FooterLink>Forme :</FooterLink>
                <FooterLink>Adresse :</FooterLink>
                <FooterLink>Numéro :</FooterLink>
                <FooterLink>E-mail :</FooterLink>
                <FooterLink>RCS :</FooterLink>
                <FooterLink>Président :</FooterLink>
                <FooterLink>Immatriculation :</FooterLink>
              </Grid>
              <Grid item xs={6}>
                <FooterLink>SAS</FooterLink>
                <FooterLink>
                  {process.env.REACT_APP_BASE_ADRESS}
                </FooterLink>
                <FooterLink>+{process.env.REACT_APP_BASE_NUMBER}</FooterLink>
                <FooterLink>{process.env.REACT_APP_BASE_MAIL}</FooterLink>
                <FooterLink>Bobigny</FooterLink>
                <FooterLink>M. SLITI Soufian</FooterLink>
                <FooterLink>934 722 414</FooterLink>
              </Grid>
            </Grid>
          </Stack>
        </Grid>

        <Grid item xs={2} md="false">
          <Stack
            spacing={1}
            sx={{ minWidth: 200, height: "100%" }} // Ensure the Stack takes full height of the grid cell
            style={{ marginRight: "20%" }}
          >
            <FooterTitle>Compte</FooterTitle>
            <FooterLink onClick={() => navigate("/profile")}>Mon Compte</FooterLink>
            {!loggedInUser && (
              <FooterLink onClick={() => navigate("/login")}>
                Connexion / Inscription
              </FooterLink>
            )}

            {/* Social Icons */}
            <Stack
              direction="row"
              spacing={1}
              mt={4}
              style={{
                marginTop: "auto", // This ensures the icons are pushed to the bottom
              }}
            >
              {[{ icon: FaFacebookF, color: "#4267B2", url: process.env.REACT_APP_FACEBOOK_URL },
              { icon: FaInstagram, color: "#E4405F", url: process.env.REACT_APP_INSTAGRAM_URL }].map(
                ({ icon: Icon, color, url }, idx) => (
                  <a
                    key={idx}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none" }}
                  >
                    <Box
                      sx={{
                        backgroundColor: "white",
                        padding: "6px",
                        borderRadius: "8px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Icon size={30} color={color} />
                    </Box>
                  </a>
                )
              )}
            </Stack>
          </Stack>
        </Grid>




        {/* Bloc 3 : Liens rapides */}
        <Grid item xs={3} md="false">
          <Stack spacing={1} sx={{ minWidth: 200 }}>
            <FooterTitle>Liens rapides</FooterTitle>
            <FooterLink onClick={() => navigate("/conditions")}>
              Conditions générales
            </FooterLink>
            <FooterLink onClick={() => navigate("/mentionsLegales")}>
              Mentions légales
            </FooterLink>
            <FooterLink onClick={() => navigate("/about")}>À Propos</FooterLink>
            <FooterLink onClick={() => navigate("/contact")}>Contact</FooterLink>
            <Stack direction="row" spacing={1} mt={1}>
              {[FaCcMastercard, FaCcVisa, FaCcAmex].map((Icon, idx) => (
                <Box
                  key={idx}
                  sx={{
                    backgroundColor: "white",
                    padding: "6px",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon
                    size={30}
                    color={
                      idx === 0 ? "#EB001B" : idx === 1 ? "#142787" : "#002663"
                    }
                  />
                </Box>
              ))}
            </Stack>
          </Stack>
        </Grid>
      </Grid>


      <Typography
        sx={{
          fontSize: "0.9rem",
          color: "#C27B06", // or try "#FFD580" for a softer gold
          textAlign: "center",
          marginTop: "2rem",
        }}
      >
        &copy; Union Prestige {new Date().getFullYear()}. Tous droits réservés
      </Typography>

    </StyledFooter>
  );
};
