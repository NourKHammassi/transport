import React from "react";
import { Container, Typography, Paper, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const ServicesBlock = () => {
  const navigate = useNavigate(); // Hook for navigation

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom>
          Nos Services
        </Typography>

        <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>
          Vente de smartphones, équipements électroniques et objets de
          décoration
        </Typography>
        <Typography variant="body1" component="ul">
          <li>Un large choix de smartphones des plus grandes marques.</li>
          <li>
            Vente d'appareils électroménagers et accessoires pour la maison.
          </li>
          <li>
            Objets de décoration modernes et tendances pour sublimer votre
            intérieur.
          </li>
          <li>Garantie sur nos produits et assistance personnalisée.</li>
        </Typography>

        <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>
          Réparation d'équipements de communication et électroménagers
        </Typography>
        <Typography variant="body1" component="ul">
          <li>
            Diagnostic rapide et réparation efficace de smartphones et
            tablettes.
          </li>
          <li>
            Intervention sur appareils électroménagers pour assurer leur bon
            fonctionnement.
          </li>
          <li>
            Remplacement de pièces défectueuses avec des composants de qualité.
          </li>
          <li>Service express pour minimiser l’attente.</li>
        </Typography>

        <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>
          Conseil et assistance
        </Typography>
        <Typography variant="body1" component="ul">
          <li>
            Accompagnement pour choisir le meilleur équipement selon vos
            besoins.
          </li>
          <li>Formation à l’utilisation optimale de vos appareils.</li>
          <li>Support technique et assistance post-achat.</li>
        </Typography>

        <Button
          variant="contained"
          sx={{
            backgroundColor: "black",
            color: "white",
            display: "block",
            mx: "auto",
            mt: 3,
          }}
          onClick={() => navigate("/demanderDevis")}
        >
          Demander un devis
        </Button>
      </Paper>
    </Container>
  );
};
