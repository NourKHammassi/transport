import React from "react";
import {
  Stack,
  Typography,
  TextField,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { axiosi } from "../../config/axios";
import { toast } from "react-toastify";

export const ContactForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const theme = useTheme();
  const is1100 = useMediaQuery(theme.breakpoints.down(1100));
  const is480 = useMediaQuery(theme.breakpoints.down(480));

  // Function to handle form submission
  const onSubmit = async (data) => {
    try {
      const response = await axiosi.post("/messages/send", data);

      if (response.status === 201) {
        toast("Message envoyé avec succès !");
        reset(); // Clear the form
        navigate("/"); // Redirect if needed
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast("Échec de l'envoi du message");
    }
  };

  return (
    <Stack
      p={"0 16px"}
      justifyContent={"center"}
      alignItems={"center"}
      flexDirection={"row"}
    >
      <Stack
        width={is1100 ? "100%" : "60rem"}
        rowGap={4}
        mt={is480 ? 4 : 6}
        mb={6}
        component={"form"}
        noValidate
        onSubmit={handleSubmit(onSubmit)} // Gestion de la soumission du formulaire
      >
        {/* Informations de contact */}
        <Typography mt={2} textAlign="center">
          <h4>
            Besoin d’un renseignement ou d’un devis ? Contactez-nous dès
            maintenant :
          </h4>
          <br />
          📞 +33 7 53 21 95 58
          <br />
          📍 16 rue Marx Dormoy, 75018 Paris
          <br />
          📧 contact@clim75.fr{" "}
        </Typography>

        <Stack rowGap={3}>
          <Stack flexDirection={"row"}>
            <Stack flex={1}>
              <Typography variant="h6" fontWeight={400} gutterBottom>
                Prénom
              </Typography>
              <TextField
                {...register("name", { required: "Le prénom est requis" })}
              />
            </Stack>
            <Stack flex={1}>
              <Typography variant="h6" fontWeight={400} gutterBottom>
                Nom
              </Typography>
              <TextField
                {...register("lastName", { required: "Le nom est requis" })}
              />
            </Stack>
          </Stack>

          <Stack>
            <Typography variant="h6" fontWeight={400} gutterBottom>
              Email
            </Typography>
            <TextField
              {...register("email", { required: "L'email est requis" })}
            />
          </Stack>

          <Stack>
            <Typography variant="h6" fontWeight={400} gutterBottom>
              Message
            </Typography>
            <TextField
              multiline
              rows={4}
              {...register("message", { required: "Le message est requis" })}
            />
          </Stack>
        </Stack>

        {/* Boutons d'action */}
        <Stack
          flexDirection={"row"}
          alignSelf={"flex-end"}
          columnGap={is480 ? 1 : 2}
        >
          <Button
            size={is480 ? "medium" : "large"}
            variant="contained"
            type="submit"
            sx={{
              backgroundColor: "#047d61",
              "&:hover": {
                backgroundColor: "#12997B", // Changement de couleur au survol
              },
            }}
          >
            Envoyer
          </Button>
          <Button
            size={is480 ? "medium" : "large"}
            sx={{
              borderColor: "#047d61",
              borderWidth: "1px", // Set the border width to 1px
              borderStyle: "solid", // Ensure the border is solid
              color: "#047d61", // Text color
              backgroundColor: "white", // Background color
              "&:hover": {
                borderColor: "#12997B", // Change border color on hover
                color: "#12997B", // Change text color on hover
              },
            }}
            component={Link}
            to={"/"}
          >
            Annuler
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};
