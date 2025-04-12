import {
  Paper,
  Stack,
  Typography,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export const ProductCard = ({ id, title, description, thumbnail }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Paper
      component={motion.div}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      elevation={2}
      sx={{
        display: "flex",
        flexDirection: "column", // Stack items vertically
        alignItems: "center",
        justifyContent: "space-between", // Space between items to ensure they fit
        width: isMobile ? "100%" : "350px", // Increased width for larger screens, full width for mobile
        height: "400px", // Fixed height for the card
        padding: 2,
        gap: 2,
        cursor: "pointer",
        overflow: "hidden", // Prevent content from overflowing the card
        mb: 3,
      }}
    >
      {/* Product Image */}
      <Stack
        sx={{
          width: "100%",
          height: "170px", // Fixed height for the image
          overflow: "hidden", // Prevent overflow
        }}
        onClick={() => navigate(`/product-details/${id}`)}
      >
        <img
          src={thumbnail.Location}
          alt={title}
          style={{
            width: "100%", // Image fills the width of the container
            height: "100%", // Image fills the height of the container
            objectFit: "contain", // Ensures the image fits within the container
          }}
        />
      </Stack>

      {/* Product Details */}
      <Stack
        flex={1}
        spacing={1}
        sx={{
          width: "100%",
          overflow: "hidden", // Prevent overflowing text
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            textAlign: "center",
            color: "#0F3F80",
            whiteSpace: "nowrap", // Prevent text overflow
            textOverflow: "ellipsis", // Add ellipsis if title is too long
            overflow: "hidden",
          }}
        >
          {title}
        </Typography>

        <Typography
          sx={{
            textAlign: "center",
            overflow: "hidden", // Ensure description doesn't overflow
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2, // Limit the description to 2 lines
          }}
        >
          {description}
        </Typography>

        {/* Add to Cart Button */}
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#047d61",
            "&:hover": {
              backgroundColor: "#12997B", // Change color on hover
            },
            borderRadius: "20px", // Rounded corners
            padding: "8px 16px",
            textTransform: "none",
            width: "100%", // Full width for button
            marginTop: "auto", // Push button to the bottom
          }}
          onClick={() =>
            navigate("/demanderDevis", {
              state: { productId: id, productTitle: title },
            })
          }
        >
          Demander un devis
        </Button>
      </Stack>
    </Paper>
  );
};
