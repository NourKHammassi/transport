import React from "react";
import { Container, Typography, Box, Paper, Link } from "@mui/material";

export const Mentions = () => {
    return (
        <Container maxWidth="md" sx={{ py: 6 }}>
            <Typography variant="h3" align="center" gutterBottom sx={{ color: "#0F3F80" }}>
                Mentions Légales
            </Typography>

            <Paper elevation={3} sx={{ p: 4, mt: 4, borderRadius: 2 }}>
                {/* Mentions légales */}
                <Box mb={4}>
                    <Typography variant="h5" gutterBottom sx={{ color: "#0F3F80" }}>
                        Informations générales
                    </Typography>
                    <Typography>
                        <strong>Raison sociale :</strong> L'UNION PRESTIGE<br />
                        <strong>Forme juridique :</strong> Société par Actions Simplifiée (SAS)<br />
                        <strong>Capital social :</strong> 500 €<br />
                        <strong>RCS :</strong> Bobigny n° 934 722 414<br />
                        <strong>Date d’immatriculation :</strong> 05 novembre 2024<br />
                        <strong>Siège social :</strong> 23 Allée Virginie, 93320 Les Pavillons-sous-Bois, France<br />
                        <strong>Président :</strong> M. SLITI Soufian, né le 08/01/1980 à Tunis (Tunisie), de nationalité tunisienne<br />
                        <strong>Activité principale :</strong> Transport de personnes avec voiture de tourisme (VTC)<br />
                        <strong>Numéro de TVA intracommunautaire :</strong> FR74934722414<br />
                        <strong>Adresse e-mail :</strong> contact@unionprestige.site<br />
                        <strong>Téléphone :</strong> 07 80 90 86 34<br />
                        <strong>Site internet :</strong>{" "}
                        <Link href="https://unionprestige.site" target="_blank" rel="noopener">
                            https://unionprestige.site
                        </Link><br />
                        <strong>Conditions générales de vente :</strong>{" "}
                        <Link href="https://unionprestige.site/conditions" target="_blank" rel="noopener">
                            https://unionprestige.site/conditions
                        </Link>
                    </Typography>
                </Box>

                {/* Hébergeur */}
                <Box mb={4}>
                    <Typography variant="h5" gutterBottom sx={{ color: "#0F3F80" }}>
                        Hébergeur du site
                    </Typography>
                    <Typography>
                        <strong>Nom :</strong> Namecheap, Inc.<br />
                        <strong>Adresse :</strong> 4600 East Washington Street, Suite 300, Phoenix, AZ 85034, États-Unis<br />
                        <strong>Site internet :</strong>{" "}
                        <Link href="https://www.namecheap.com" target="_blank" rel="noopener">
                            https://www.namecheap.com
                        </Link><br />
                        <strong>Politique de confidentialité :</strong>{" "}
                        <Link href="https://www.namecheap.com/legal/general/privacy-policy/" target="_blank" rel="noopener">
                            https://www.namecheap.com/legal/general/privacy-policy/
                        </Link><br />
                        <strong>Conditions générales d’utilisation :</strong>{" "}
                        <Link href="https://www.namecheap.com/legal/hosting/tos/" target="_blank" rel="noopener">
                            https://www.namecheap.com/legal/hosting/tos/
                        </Link>
                    </Typography>
                </Box>

                {/* Données personnelles */}
                <Box mb={4}>
                    <Typography variant="h5" gutterBottom sx={{ color: "#0F3F80" }}>
                        Données personnelles
                    </Typography>
                    <Typography>
                        Conformément au Règlement Général sur la Protection des Données (RGPD), les données personnelles collectées sont utilisées exclusivement pour la gestion des réservations et ne sont pas communiquées à des tiers. Le client dispose d’un droit d’accès, de rectification, de suppression et d’opposition aux données le concernant.
                    </Typography>
                </Box>

                {/* Propriété intellectuelle */}
                <Box mb={4}>
                    <Typography variant="h5" gutterBottom sx={{ color: "#0F3F80" }}>
                        Propriété intellectuelle
                    </Typography>
                    <Typography>
                        L'ensemble du contenu du site{" "}
                        <Link href="https://unionprestige.site" target="_blank" rel="noopener">
                            https://unionprestige.site
                        </Link>{" "}
                        incluant, de façon non limitative, les graphismes, images, textes, vidéos, animations, sons, logos, gifs et icônes ainsi que leur mise en forme sont la propriété exclusive de L'UNION PRESTIGE, à l'exception des marques, logos ou contenus appartenant à d'autres sociétés partenaires ou auteurs.
                    </Typography>
                </Box>

                {/* Responsabilité */}
                <Box mb={4}>
                    <Typography variant="h5" gutterBottom sx={{ color: "#0F3F80" }}>
                        Responsabilité
                    </Typography>
                    <Typography>
                        L'UNION PRESTIGE met en œuvre tous les moyens dont elle dispose pour assurer une information fiable et une mise à jour fiable de son site internet. Toutefois, des erreurs ou omissions peuvent survenir. L'utilisateur devra donc s'assurer de l'exactitude des informations auprès de L'UNION PRESTIGE, et signaler toutes modifications du site qu'il jugerait utile. L'UNION PRESTIGE n'est en aucun cas responsable de l'utilisation faite de ces informations, et de tout préjudice direct ou indirect pouvant en découler.
                    </Typography>
                </Box>

                {/* Droit applicable */}
                <Box>
                    <Typography variant="h5" gutterBottom sx={{ color: "#0F3F80" }}>
                        Droit applicable
                    </Typography>
                    <Typography>
                        Les présentes mentions légales sont soumises au droit français. En cas de litige, les parties privilégieront une résolution amiable. À défaut, le tribunal compétent sera celui du siège social de la société.
                    </Typography>
                </Box>
            </Paper>
        </Container>
    );
};
