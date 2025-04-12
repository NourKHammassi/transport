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
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import BusinessIcon from "@mui/icons-material/Business";
export const AboutBlock = () => {
  return (
    <Container maxWidth="md" style={{ marginBottom: "40px" }}>
      <Paper elevation={3} sx={{ p: 4, mt: 4, borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom>
          CLIM75
        </Typography>
        <Typography variant="h6" color="primary" gutterBottom>
          Installation électrique, chauffage, climatisation et plomberie
        </Typography>
        <Typography variant="body1" paragraph>
          Basée à Paris, nous mettons notre expertise au service de vos projets,
          avec un engagement fort sur la qualité et la satisfaction client.
        </Typography>
        <Typography variant="body1" paragraph>
          Nous nous engageons à fournir des prestations fiables et durables pour
          répondre aux besoins des particuliers et des entreprises. Notre site
          vous permet désormais d’acheter directement en ligne vos équipements
          avec un paiement sécurisé et une livraison rapide.
        </Typography>
        <Box mt={2}>
          <List>
            <ListItem>
              <ListItemIcon>
                <LocationOnIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="16 rue Marx Dormoy, 75018 Paris" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <PhoneIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="+33 7 53 21 95 58" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <EmailIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="contact@clim75.fr" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <BusinessIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="SIRET : 978 450 054 R.C.S. Paris" />
            </ListItem>
          </List>
        </Box>
      </Paper>
    </Container>
  );
};
