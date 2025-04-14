import React, { useEffect } from "react";
import { Navbar } from "../features/navigation/components/Navbar";
import { ProductList } from "../features/products/components/ProductList";
import {
  resetAddressStatus,
  selectAddressStatus,
} from "../features/address/AddressSlice";
import { useDispatch, useSelector } from "react-redux";
import { Footer } from "../features/footer/Footer";
import {
  Typography,
  Container,
  Stack,
  Divider,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

export const HomePage = () => {
  const dispatch = useDispatch();
  const addressStatus = useSelector(selectAddressStatus);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    if (addressStatus === "fulfilled") {
      dispatch(resetAddressStatus());
    }
  }, [addressStatus]);

  const engagements = [
    "Confort, sécurité et satisfaction client",
    "Chauffeurs professionnels et expérimentés",
    "Véhicules haut de gamme entretenus",
    "Service client réactif et à l'écoute",
    "Ponctualité et flexibilité garanties",
  ];

  const pourquoiNousChoisir = [
    "Qualité de service irréprochable",
    "Souplesse et adaptabilité",
    "Véhicules modernes et entretenus",
    "Ponctualité et fiabilité",
    "Satisfaction client garantie",
  ];

  return (
    <>
      <Navbar isProductList={true} />

      <Container maxWidth="lg" sx={{ mt: 6, mb: 6 }}>
        {/* Heading */}
        <Stack spacing={2} alignItems="center" textAlign="center">
          <Typography
            variant={isMobile ? "h4" : "h3"}
            sx={{ fontWeight: "bold", color: "#C27B06", fontFamily: "sans-serif" }}
          >
            Bienvenue chez Union Prestige
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Chaque trajet est une expérience sur mesure, alliant confort, sécurité
            et excellence.
          </Typography>
        </Stack>

        <Divider sx={{ my: 5 }} />

        {/* Présentation */}
        <Stack spacing={2}>
          <Typography variant="h5" sx={{ fontWeight: 600, color: "#0F3F80" }}>
            Notre Mission
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Fondée avec l'ambition de redéfinir le transport de qualité, notre
            société se distingue par un engagement sans compromis envers le confort,
            la sécurité et la satisfaction de nos clients.
            <br />
            <br />
            Que vous ayez besoin d’un transport standard pour vos trajets quotidiens
            ou d’une expérience VIP, notre priorité est de vous proposer un service
            personnalisé, ponctuel et haut de gamme.
          </Typography>
        </Stack>

        <Divider sx={{ my: 5 }} />

        {/* Engagements */}
        <Stack spacing={2}>
          <Typography
            variant="h5"
            sx={{ fontWeight: 600, color: "#0F3F80" }}
          >
            Nos Engagements
          </Typography>
          <Stack spacing={1}>
            {engagements.map((item, index) => (
              <Box key={index} display="flex" alignItems="center">
                <CheckIcon fontSize="small" color="success" sx={{ mr: 1 }} />
                <Typography variant="body1" color="text.secondary">
                  {item}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Stack>

        <Divider sx={{ my: 5 }} />

        {/* Pourquoi nous choisir */}
        <Stack spacing={2}>
          <Typography
            variant="h5"
            sx={{ fontWeight: 600, color: "#0F3F80" }}
          >
            Pourquoi Choisir Union Prestige ?
          </Typography>
          <Stack spacing={1}>
            {pourquoiNousChoisir.map((reason, index) => (
              <Box key={index} display="flex" alignItems="center">
                <CheckIcon fontSize="small" sx={{ mr: 1, color: "#0F3F80" }} />
                <Typography variant="body1" color="text.secondary">
                  {reason}
                </Typography>
              </Box>
            ))}
          </Stack>
          <Typography variant="body1" sx={{ mt: 2 }} color="text.secondary">
            Union Prestige, ce n’est pas qu’un transport, c’est une promesse
            d’excellence. Rejoignez ceux qui nous font déjà confiance.
          </Typography>
        </Stack>

        <Divider sx={{ my: 5 }} />

        {/* Nos Services */}
        <Stack spacing={2}>
          <Typography
            variant="h5"
            sx={{ fontWeight: 600, color: "#0F3F80" }}
          >
            Nos Services
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }} color="text.secondary">
            Nous mettons à votre disposition des services flexibles, en fonction de vos besoins. Que ce soit pour des événements spéciaux, des déplacements professionnels ou des trajets privés, nous sommes là pour vous accompagner, où que vous soyez.
            <br />
            Chez Union Prestige, nous proposons une gamme complète de services de transport, adaptée à toutes les situations :
          </Typography>
          <br />
          <ProductList />
        </Stack>
      </Container>

      <Footer />
    </>
  );
};
