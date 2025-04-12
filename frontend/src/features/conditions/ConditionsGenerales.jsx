import React from "react";
import { Container, Typography, Box, Paper } from "@mui/material";

export const ConditionsGenerales = () => {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h3" align="center" gutterBottom>
        Conditions Générales de Vente de CLIM75
      </Typography>

      <Paper elevation={3} sx={{ p: 4, mt: 4, borderRadius: 2 }}>
        <Box mb={4}>
          <Typography variant="h5" gutterBottom>
            Article 1 : Objet
          </Typography>
          <Typography>
            Les présentes conditions générales de vente définissent les droits
            et obligations de la société CLIM75 et de ses clients dans le cadre
            de la fourniture de services d’installation électrique, chauffage,
            remplacement de climatisation, plomberie ainsi que la vente en ligne
            d’équipements, conformément aux articles L.111-1 et suivants du Code
            de la consommation.
          </Typography>
        </Box>

        <Box mb={4}>
          <Typography variant="h5" gutterBottom>
            Article 2 : Commandes
          </Typography>
          <Typography>
            Toute demande de prestation doit être validée par un devis signé.
            L’acceptation du devis implique l’adhésion aux présentes CGV. Les
            produits disponibles à la vente en ligne peuvent être commandés
            directement via notre site internet, en conformité avec l’article
            L.221-13 du Code de la consommation.
          </Typography>
        </Box>

        <Box mb={4}>
          <Typography variant="h5" gutterBottom>
            Article 3 : Prix
          </Typography>
          <Typography>
            Les prix sont indiqués en euros et peuvent être modifiés selon
            l’évolution du marché. Les prestations et produits sont facturés sur
            la base du tarif en vigueur au moment de la commande, conformément à
            l’article L.112-1 du Code de la consommation.
          </Typography>
        </Box>

        <Box mb={4}>
          <Typography variant="h5" gutterBottom>
            Article 4 : Modalités de paiement
          </Typography>
          <Typography>
            Le règlement des prestations et des commandes en ligne s’effectue
            via : Carte bancaire (Visa, Mastercard, American Express), Virement
            bancaire, PayPal. Les paiements en ligne sont sécurisés via une
            passerelle de paiement garantissant la confidentialité des données
            bancaires, conformément à l’article L.133-4 du Code monétaire et
            financier.
          </Typography>
        </Box>

        <Box mb={4}>
          <Typography variant="h5" gutterBottom>
            Article 5 : Livraison et Exécution
          </Typography>
          <Typography>
            Les services sont exécutés selon les délais définis dans le devis.
            Pour les ventes en ligne, les produits sont expédiés sous 5 à 7
            jours ouvrés après confirmation de paiement, en conformité avec
            l’article L.216-1 du Code de la consommation.
          </Typography>
        </Box>

        <Box mb={4}>
          <Typography variant="h5" gutterBottom>
            Article 6 : Garantie
          </Typography>
          <Typography>
            Les installations sont couvertes par une garantie de conformité de
            12 mois, sauf mention contraire. Les produits vendus en ligne
            bénéficient de la garantie légale de conformité prévue aux articles
            L.217-4 et suivants du Code de la consommation.
          </Typography>
        </Box>

        <Box mb={4}>
          <Typography variant="h5" gutterBottom>
            Article 7 : Droit de rétractation
          </Typography>
          <Typography>
            Conformément à l’article L.221-18 du Code de la consommation, le
            client dispose de 14 jours pour exercer son droit de rétractation
            sans avoir à justifier de motifs.
          </Typography>
        </Box>

        <Box mb={4}>
          <Typography variant="h5" gutterBottom>
            Article 8 : Responsabilité
          </Typography>
          <Typography>
            CLIM75 ne saurait être tenu responsable des dommages directs ou
            indirects résultant d’une mauvaise installation par un tiers ou
            d’une mauvaise utilisation des produits achetés, en conformité avec
            l’article 1240 du Code civil.
          </Typography>
        </Box>

        <Box mb={4}>
          <Typography variant="h5" gutterBottom>
            Article 9 : Protection des données
          </Typography>
          <Typography>
            Les données personnelles des clients sont collectées et traitées
            conformément au Règlement Général sur la Protection des Données
            (RGPD) et à la loi Informatique et Libertés du 6 janvier 1978. Le
            client dispose d’un droit d’accès, de rectification et de
            suppression de ses données sur simple demande, conformément aux
            articles 15 à 21 du RGPD.
          </Typography>
        </Box>

        <Box>
          <Typography variant="h5" gutterBottom>
            Article 10 : Litiges et droit applicable
          </Typography>
          <Typography>
            En cas de litige, une solution amiable sera privilégiée. À défaut,
            toute contestation relèvera de la compétence exclusive des tribunaux
            de Paris, en application des articles R.631-3 et suivants du Code de
            la consommation.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};
