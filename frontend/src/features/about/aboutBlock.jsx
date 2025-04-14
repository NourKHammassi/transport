import React from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BusinessIcon from "@mui/icons-material/Business";
import PersonIcon from "@mui/icons-material/Person";
import NumbersIcon from "@mui/icons-material/Numbers";
import EmojiTransportationIcon from "@mui/icons-material/EmojiTransportation";

export const AboutBlock = () => {
  return (
    <Container maxWidth="md" style={{ marginBottom: "40px" }}>
      <Paper elevation={3} sx={{ p: 4, mt: 4, borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom style={{ color: "#0F3F80" }}>
          À propos de Union Prestige
        </Typography>
        <Typography variant="body1" paragraph>
          Union Prestige n’est pas simplement une société de transport, c’est une promesse de qualité et d’excellence. Basée au cœur des Pavillons-sous-Bois, nous mettons tout en œuvre pour offrir à nos clients une expérience de transport inégalée. Chaque trajet, chaque détail est soigneusement pensé pour garantir un service haut de gamme, que vous soyez en déplacement quotidien ou lors d’un événement spécial.
        </Typography>

        <Typography variant="h5" sx={{ mt: 3 }} gutterBottom style={{ color: "#0F3F80" }}>
          Notre Vision
        </Typography>
        <Typography variant="body1" paragraph>
          Notre objectif est simple : offrir à nos clients un service de transport personnalisé, fiable et sans compromis sur la qualité. Avec Union Prestige, chaque trajet devient une expérience unique, conçue pour répondre à vos besoins spécifiques. Nous mettons un point d'honneur à offrir confort, sécurité et ponctualité à chaque client.
        </Typography>

        <Typography variant="h5" sx={{ mt: 3 }} gutterBottom style={{ color: "#0F3F80" }}>
          Informations sur la Société
        </Typography>
        <Box mt={2}>
          <List>
            <ListItem>
              <ListItemIcon>
                <EmojiTransportationIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Nom de la société : Union Prestige" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <BusinessIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Forme juridique : Société par actions simplifiée (SAS)" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <NumbersIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Capital social : 500€" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <LocationOnIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Adresse : 23 Allée Virginie, 93320 Les Pavillons-sous-Bois" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <BusinessIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="RCS : Bobigny" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <PersonIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Président : M. SLITI Soufian" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <NumbersIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Numéro d'immatriculation : 934 722 414" />
            </ListItem>
          </List>
        </Box>

        <Typography variant="h5" sx={{ mt: 3 }} gutterBottom style={{ color: "#0F3F80" }}>
          Pourquoi Union Prestige ?
        </Typography>
        <Typography variant="body1" component="ul">
          <li>Un service sur-mesure : Chaque client est unique et nous nous adaptons à vos besoins.</li>
          <li>Ponctualité et fiabilité : Nous savons à quel point votre temps est précieux.</li>
          <li>Chauffeurs qualifiés : Des professionnels dédiés, formés pour offrir un service discret et irréprochable.</li>
          <li>Véhicules haut de gamme : Un parc de véhicules de qualité, entretenus et équipés pour votre confort.</li>
        </Typography>

        <Typography variant="h5" sx={{ mt: 3 }} gutterBottom style={{ color: "#0F3F80" }}>
          Union Prestige : Plus Qu’un Transport
        </Typography>
        <Typography variant="body1" paragraph>
          Nous croyons que le transport ne se limite pas à vous conduire d’un endroit à un autre. Chez Union Prestige, nous nous engageons à offrir une expérience qui va bien au-delà de vos attentes. Faites-nous confiance pour vos déplacements, et laissez-nous vous emmener vers votre destination avec style et sérénité.
        </Typography>
      </Paper>
    </Container>
  );
};
