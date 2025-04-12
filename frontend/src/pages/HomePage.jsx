import React, { useEffect } from "react";
import { Navbar } from "../features/navigation/components/Navbar";
import { ProductList } from "../features/products/components/ProductList";
import {
  resetAddressStatus,
  selectAddressStatus,
} from "../features/address/AddressSlice";
import { useDispatch, useSelector } from "react-redux";
import { Footer } from "../features/footer/Footer";
import { Typography, Container, Stack } from "@mui/material";

export const HomePage = () => {
  const dispatch = useDispatch();
  const addressStatus = useSelector(selectAddressStatus);

  useEffect(() => {
    if (addressStatus === "fulfilled") {
      dispatch(resetAddressStatus());
    }
  }, [addressStatus]);

  const engagements = [
    "Service rapide et efficace",
    "Matériaux de qualité",
    "Respect des normes en vigueur",
    "Paiement en ligne sécurisé",
    "Satisfaction client garantie",
  ];

  return (
    <>
      <Navbar isProductList={true} />
      <Container
        sx={{
          marginBottom: 2,
          marginTop: 6,
          padding: 4,
          borderRadius: 3,
        }}
      >
        {/* Titre principal */}
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          sx={{ color: "#0F3F80", fontWeight: "bold" }}
        >
          Bienvenue sur CLIM75
        </Typography>
        <Typography
          variant="h6"
          align="center"
          paragraph
          sx={{ color: "#424242" }}
        >
          Votre expert en installation électrique, chauffage, remplacement de
          climatisation et plomberie à Paris.
        </Typography>

        {/* Section Services */}
        <Stack spacing={4} sx={{ mt: 4 }}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ color: "#0F3F80", fontWeight: "bold" }}
          >
            Nos Services
          </Typography>
          <ProductList />
        </Stack>

        {/* Section Engagements */}
        <Stack spacing={2} sx={{ mt: 2 }}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ color: "#0F3F80", fontWeight: "bold" }}
          >
            Nos Engagements
          </Typography>
          <Stack spacing={1} sx={{ padding: 2, borderRadius: 2 }}>
            {engagements.map((engagement, index) => (
              <Typography
                key={index}
                sx={{
                  color: "#424242",
                  fontSize: "1.1rem",
                  backgroundColor: "white",
                }}
              >
                - {engagement}
              </Typography>
            ))}
          </Stack>
        </Stack>
      </Container>
      <Footer />
    </>
  );
};
