import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  addProductAsync,
  resetProductAddStatus,
  selectProductAddStatus,
  updateProductByIdAsync,
} from "../../products/ProductSlice";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
  Badge,
  IconButton,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { selectBrands } from "../../brands/BrandSlice";
import { selectCategories } from "../../categories/CategoriesSlice";
import { toast } from "react-toastify";
import Resizer from "react-image-file-resizer";
import { axiosi } from "../../../config/axios";
import CloseIcon from "@mui/icons-material/Close";

export const AddProduct = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [imageInputs, setImageInputs] = useState([0]);
  const [image, setImage] = useState([]);
  const [thumbnail, setThumbnail] = useState({});
  const [previewImages, setPreviewImages] = useState({});
  const [previewThumbnail, setPreviewThumbnail] = useState();
  const dispatch = useDispatch();
  const brands = useSelector(selectBrands);
  const categories = useSelector(selectCategories);
  const productAddStatus = useSelector(selectProductAddStatus);
  const navigate = useNavigate();
  const theme = useTheme();
  const is1100 = useMediaQuery(theme.breakpoints.down(1100));
  const is480 = useMediaQuery(theme.breakpoints.down(480));

  useEffect(() => {
    console.log("Product Add Status:", productAddStatus);
    if (productAddStatus === "fullfilled") {
      reset();
      toast.success("Nouveau service ajouté");
      navigate("/admin/dashboard");
    } else if (productAddStatus === "rejected") {
      toast.error("Erreur lors de l'ajout du service.");
    }
  }, [productAddStatus]);

  useEffect(() => {
    return () => {
      dispatch(resetProductAddStatus());
    };
  }, []);

  const handleImage = (e, index) => {
    let file = e.target.files[0];
    setPreviewImages((prev) => ({
      ...prev,
      [index]: window.URL.createObjectURL(file),
    }));
    //resize
    Resizer.imageFileResizer(file, 720, 500, "JPEG", 60, 0, async (uri) => {
      try {
        let { data } = await axiosi.post("/products/upload-image", {
          image: uri,
        });
        setImage((prevImages) => [...prevImages, data]);
        toast("Image téléchargée avec succès");
      } catch (err) {
        console.log(err);
        toast("Échec du téléchargement de l'image");
      }
    });
  };
  const addImageInput = () => {
    setImageInputs((prev) => [...prev, prev.length]);
  };
  const handleImageRemove = async (imageToRemove) => {
    console.log("Removing image:", imageToRemove);

    try {
      const res = await axiosi.post("/products/remove-image", {
        image: imageToRemove,
      });

      if (res.data.ok) {
        // Remove the image from the `image` array
        setImage((prevImages) =>
          prevImages.filter((img) => img.Key !== imageToRemove.Key)
        );

        // Remove the corresponding preview from `previewImages`
        setPreviewImages((prev) => {
          const updatedPreviews = { ...prev };
          const keyToRemove = Object.keys(updatedPreviews).find(
            (key) => updatedPreviews[key] === imageToRemove.url
          );

          if (keyToRemove) {
            delete updatedPreviews[keyToRemove];
          }

          return { ...updatedPreviews }; // Ensure a new object is returned to trigger re-render
        });
        toast("Image supprimée avec succès");
      }
    } catch (err) {
      console.log(err);
      toast("Échec de la suppression de l'image");
    }
  };

  const handleThumbnailRemove = async () => {
    console.log("remove image");
    try {
      const res = await axiosi.post("/products/remove-thumbnail", {
        thumbnail,
      });
      setThumbnail({});
      setPreviewThumbnail("");
      toast("Miniature supprimée");
      console.log("success");
    } catch (err) {
      console.log(err);
      toast("Échec de la suppression de la miniature");
    }
  };
  const handleThumbnail = (e) => {
    let file = e.target.files[0];
    setPreviewThumbnail(window.URL.createObjectURL(file));

    //resize
    Resizer.imageFileResizer(file, 720, 500, "JPEG", 60, 0, async (uri) => {
      try {
        let { data } = await axiosi.post("/products/upload-thumbnail", {
          thumbnail: uri,
        });
        setThumbnail(data);
        toast("Miniature téléchargée avec succès");
      } catch (err) {
        console.log(err);
        toast("Échec du téléchargement de la miniature");
      }
    });
  };

  const handleAddProduct = (data) => {
    console.log("Form Data:", data);

    const newProduct = {
      ...data,
      images: image,
      thumbnail,
    };
    // delete newProduct.image0;
    // delete newProduct.image1;
    // delete newProduct.image2;
    // delete newProduct.image3;

    dispatch(addProductAsync(newProduct));
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
        onSubmit={handleSubmit(handleAddProduct)}
      >
        {/* Zone de saisie */}
        <Stack rowGap={3}>
          <Stack>
            <Typography variant="h6" fontWeight={400} gutterBottom>
              Nom du service
            </Typography>
            <TextField
              {...register("title", { required: "Le titre est requis" })}
            />
          </Stack>

          <Stack>
            <Typography variant="h6" fontWeight={400} gutterBottom>
              Description
            </Typography>
            <TextField
              multiline
              rows={4}
              {...register("description", {
                required: "La description est requise",
              })}
            />
          </Stack>
          <Stack
            spacing={2}
            p={3}
            alignItems="center"
            sx={{
              border: "2px dashed #ccc",
              borderRadius: "8px",
              textAlign: "center",
              backgroundColor: "#f9f9f9",
              transition: "all 0.3s",
              "&:hover": { borderColor: "#007bff", backgroundColor: "#f0f8ff" },
            }}
          >
            <Typography variant="h6" fontWeight={500} gutterBottom>
              Image
            </Typography>

            {!previewThumbnail && (
              <label
                htmlFor="imageUpload"
                className="cursor-pointer text-blue-600 underline hover:text-blue-800"
              >
                Cliquer pour télécharger l'image principale
              </label>
            )}

            <input
              id="imageUpload"
              type="file"
              accept="image/*"
              onChange={handleThumbnail}
              style={{ display: "none" }}
            />
            {previewThumbnail && (
              <div style={{ position: "relative" }}>
                <img
                  width={200}
                  src={previewThumbnail}
                  className="rounded shadow-md"
                  alt="Image principale"
                />
                <IconButton
                  onClick={handleThumbnailRemove}
                  sx={{
                    position: "absolute",
                    top: "5px",
                    right: "5px",
                    backgroundColor: "rgba(255, 0, 0, 0.6)",
                    "&:hover": { backgroundColor: "rgba(255, 0, 0, 0.8)" },
                  }}
                >
                  <CloseIcon sx={{ color: "white" }} />
                </IconButton>
              </div>
            )}
          </Stack>

          <Stack
            spacing={2}
            p={3}
            sx={{ border: "1px solid #ccc", borderRadius: 2 }}
          >
            <Typography variant="h6" fontWeight={500} gutterBottom>
              Images du service
            </Typography>

            {imageInputs.map((index) => (
              <Stack key={index} spacing={1} alignItems="center">
                {!previewImages[index] && (
                  <label
                    htmlFor={`imageUpload-${index}`}
                    className="cursor-pointer text-blue-600 underline"
                  >
                    Cliquer pour télécharger une image
                  </label>
                )}

                <input
                  id={`imageUpload-${index}`}
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImage(e, index)}
                  style={{ display: "none" }}
                />

                {previewImages[index] && (
                  <div style={{ position: "relative" }}>
                    <img
                      width={200}
                      src={previewImages[index]}
                      className="rounded shadow-md"
                      alt={`Aperçu ${index}`}
                    />
                    <IconButton
                      onClick={() => handleImageRemove(image[index])} // Passer l'image
                      sx={{
                        position: "absolute",
                        top: "5px",
                        right: "5px",
                        backgroundColor: "rgba(255, 0, 0, 0.6)",
                        "&:hover": { backgroundColor: "rgba(255, 0, 0, 0.8)" },
                      }}
                    >
                      <CloseIcon sx={{ color: "white" }} />
                    </IconButton>
                  </div>
                )}
              </Stack>
            ))}

            <Button variant="contained" color="primary" onClick={addImageInput}>
              Ajouter plus d'images
            </Button>
          </Stack>
        </Stack>

        {/* Zone d'action */}
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
              backgroundColor: "#C27B06",
              "&:hover": {
                backgroundColor: "#a86205", // Changement de couleur au survol
              },
            }}
          >
            Ajouter le service
          </Button>
          <Button
            size={is480 ? "medium" : "large"}
            sx={{
              borderColor: "#C27B06",
              borderWidth: "1px", // Set the border width to 1px
              borderStyle: "solid", // Ensure the border is solid
              color: "#C27B06", // Text color
              backgroundColor: "white", // Background color
              "&:hover": {
                borderColor: "#a86205", // Change border color on hover
                color: "#a86205", // Change text color on hover
              },
            }}
            component={Link}
            to={"/admin/dashboard"}
          >
            Annuler
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};
