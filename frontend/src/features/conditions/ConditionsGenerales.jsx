import React from "react";
import { Container, Typography, Box, Paper } from "@mui/material";

export const ConditionsGenerales = () => {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h3" align="center" gutterBottom style={{ color: "#0F3F80" }}>
        Conditions Générales de Vente de UNION PRESTIGE
      </Typography>

      <Paper elevation={3} sx={{ p: 4, mt: 4, borderRadius: 2 }}>
        <Box mb={4}>
          <Typography variant="h5" gutterBottom style={{ color: "#0F3F80" }}>
            Article 1 : Objet
          </Typography>
          <Typography>
            Les présentes Conditions Générales de Vente (CGV) régissent les prestations de transport de personnes avec chauffeur (VTC) proposées par la société UNION PRESTIGE, Société par Actions Simplifiée au capital de 500 €, immatriculée au RCS de Bobigny sous le numéro 934 722 414, dont le siège social est situé au 23 Allée Virginie, 93320 Les Pavillons-sous-Bois. Toute commande de prestation implique l’adhésion sans réserve du client aux présentes CGV.
          </Typography>
        </Box>

        <Box mb={4}>
          <Typography variant="h5" gutterBottom style={{ color: "#0F3F80" }}>
            Article 2 : Réservation
          </Typography>
          <Typography>
            Les réservations peuvent être effectuées par téléphone, e-mail, ou via une plateforme en ligne (si disponible). Toute demande doit préciser le lieu, la date, l’heure de prise en charge, le nombre de passagers, et la destination. La société se réserve le droit de refuser toute réservation incomplète ou non conforme.
          </Typography>
        </Box>

        <Box mb={4}>
          <Typography variant="h5" gutterBottom style={{ color: "#0F3F80" }}>
            Article 3 : Tarifs et Paiement
          </Typography>
          <Typography>
            Les prix sont indiqués en euros toutes taxes comprises (TTC). Ils sont déterminés à l’avance selon un forfait ou via un compteur kilométrique/temps. Le règlement s’effectue par carte bancaire, virement, espèces ou paiement en ligne sécurisé via notre site internet.
            <br />
            En cas de paiement en ligne, une confirmation de la transaction sera envoyée automatiquement au client. La réservation ne sera considérée comme définitive qu’à réception du paiement. Aucun escompte ne sera accordé pour paiement anticipé.
          </Typography>
        </Box>

        <Box mb={4}>
          <Typography variant="h5" gutterBottom style={{ color: "#0F3F80" }}>
            Article 4 : Conditions d’annulation
          </Typography>
          <Typography>
            Le client peut annuler gratuitement une course jusqu’à 2 heures avant l’heure prévue. En cas d’annulation tardive (moins de 2 heures), 50% du montant de la prestation sera facturé. En cas d’absence du client au point de rendez-vous après 15 minutes d’attente, la course est considérée comme annulée et facturée intégralement.
          </Typography>
        </Box>

        <Box mb={4}>
          <Typography variant="h5" gutterBottom style={{ color: "#0F3F80" }}>
            Article 5 : Obligations du client
          </Typography>
          <Typography>
            Le client s’engage à respecter les règles de sécurité et de courtoisie à bord du véhicule. Il est interdit de fumer, consommer de l’alcool ou des stupéfiants, ou de dégrader le véhicule. Toute dégradation volontaire entraînera une facturation des réparations.
          </Typography>
        </Box>

        <Box mb={4}>
          <Typography variant="h5" gutterBottom style={{ color: "#0F3F80" }}>
            Article 6 : Obligations du chauffeur
          </Typography>
          <Typography>
            Le chauffeur s’engage à effectuer la course dans les meilleures conditions de confort, de ponctualité et de sécurité. Il respecte la réglementation en vigueur liée au transport VTC.
          </Typography>
        </Box>

        <Box mb={4}>
          <Typography variant="h5" gutterBottom style={{ color: "#0F3F80" }}>
            Article 7 : Retard ou impossibilité d’exécution
          </Typography>
          <Typography>
            En cas de retard dû à un événement indépendant de la volonté de la société (embouteillage, conditions météo, accident...), UNION PRESTIGE ne pourra être tenue responsable. Si la prestation ne peut être réalisée, elle sera remboursée intégralement sans pénalité.
          </Typography>
        </Box>

        <Box mb={4}>
          <Typography variant="h5" gutterBottom style={{ color: "#0F3F80" }}>
            Article 8 : Responsabilité
          </Typography>
          <Typography>
            UNION PRESTIGE est assurée pour le transport de personnes à titre onéreux. Sa responsabilité ne saurait être engagée pour les retards imputables au client ou à des cas de force majeure.
          </Typography>
        </Box>

        <Box mb={4}>
          <Typography variant="h5" gutterBottom style={{ color: "#0F3F80" }}>
            Article 9 : Données personnelles
          </Typography>
          <Typography>
            Conformément au RGPD, les données personnelles collectées sont utilisées exclusivement pour la gestion des réservations et ne sont pas communiquées à des tiers. Le client dispose d’un droit d’accès, de rectification, de suppression et d’opposition.
          </Typography>
        </Box>

        <Box mb={4}>
          <Typography variant="h5" gutterBottom style={{ color: "#0F3F80" }}>
            Article 10 : Réclamations
          </Typography>
          <Typography>
            Toute réclamation doit être adressée à la société dans un délai de 7 jours après la prestation par e-mail ou courrier à :<br />
            <strong>UNION PRESTIGE</strong><br />
            23 Allée Virginie, 93320 Les Pavillons-sous-Bois<br />
            Email : [à compléter]
          </Typography>
        </Box>

        <Box mb={4}>
          <Typography variant="h5" gutterBottom style={{ color: "#0F3F80" }}>
            Article 11 : Droit applicable
          </Typography>
          <Typography>
            Les présentes CGV sont soumises au droit français. En cas de litige, les parties privilégieront une résolution amiable. À défaut, le tribunal compétent sera celui du siège social de la société.
          </Typography>
        </Box>

        <Box>
          <Typography variant="h5" gutterBottom style={{ color: "#0F3F80" }}>
            Mentions légales
          </Typography>
          <Typography>
            UNION PRESTIGE - SAS au capital de 500 € - RCS Bobigny n° 934 722 414<br />
            Siège social : 23 Allée Virginie, 93320 Les Pavillons-sous-Bois<br />
            Président : M. SLITI Soufian
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};
