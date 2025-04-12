import React, { useEffect, useState } from "react";
import {
  Stack,
  Typography,
  TextField,
  Button,
  useTheme,
  useMediaQuery,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { axiosi } from "../../config/axios";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectProducts } from "../products/ProductSlice";
export const DevisForm = () => {
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
  const products = useSelector(selectProducts); // Fetch products from Redux
  const location = useLocation();
  const selectedProduct = location.state || {}; // Retrieve selected product from navigation

  const [selectedService, setSelectedService] = useState("");

  // Function to handle form submission
  const onSubmit = async (data) => {
    try {
      const response = await axiosi.post("/devis/sendDevis", data);

      if (response.status === 201) {
        toast("Demande envoyée avec succès !");
        reset(); // Clear the form
        navigate("/"); // Redirect if needed
      }
    } catch (error) {
      console.error("Error sending demande:", error);
      toast("Échec de l'envoi de la demande");
    }
  };
  // Set default selected product if available
  useEffect(() => {
    if (selectedProduct?.productTitle) {
      setSelectedService(selectedProduct.productTitle);
    }
  }, [selectedProduct]);
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
        onSubmit={handleSubmit(onSubmit)} // Handle form submission
      >
        <Stack rowGap={3}>
          <Stack flexDirection={"row"}>
            <Stack flex={1}>
              <Typography variant="h6" fontWeight={400} gutterBottom>
                Prénom
              </Typography>
              <TextField
                {...register("name", { required: "Name is required" })}
              />
            </Stack>
            <Stack flex={1}>
              <Typography variant="h6" fontWeight={400} gutterBottom>
                Nom
              </Typography>
              <TextField
                {...register("lastName", { required: "Last name is required" })}
              />
            </Stack>
          </Stack>

          <Stack>
            <Typography variant="h6" fontWeight={400} gutterBottom>
              Email
            </Typography>
            <TextField
              {...register("email", { required: "Email is required" })}
            />
          </Stack>
          <FormControl fullWidth>
            <Typography variant="h6" fontWeight={400} gutterBottom>
              Service
            </Typography>
            <Select
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              {...register("service")}
            >
              {products.map((product) => (
                <MenuItem key={product.id} value={product.title}>
                  {product.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Stack>
            <Typography variant="h6" fontWeight={400} gutterBottom>
              Message
            </Typography>
            <TextField
              multiline
              rows={4}
              {...register("message", { required: "Message is required" })}
            />
          </Stack>
        </Stack>

        {/* Action Buttons */}
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
