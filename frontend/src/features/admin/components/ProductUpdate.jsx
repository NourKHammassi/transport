import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  clearSelectedProduct,
  fetchProductByIdAsync,
  resetProductUpdateStatus,
  selectProductUpdateStatus,
  selectSelectedProduct,
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
} from "@mui/material";
import { useForm } from "react-hook-form";
import { selectBrands } from "../../brands/BrandSlice";
import { selectCategories } from "../../categories/CategoriesSlice";
import { toast } from "react-toastify";
import { axiosi } from "../../../config/axios";
import Resizer from "react-image-file-resizer";
import { updateProductById } from "../../products/ProductApi";

export const ProductUpdate = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { id } = useParams();
  const dispatch = useDispatch();
  const selectedProduct = useSelector(selectSelectedProduct);
  const brands = useSelector(selectBrands);
  const categories = useSelector(selectCategories);
  const productUpdateStatus = useSelector(selectProductUpdateStatus);
  const navigate = useNavigate();
  const theme = useTheme();
  const is1100 = useMediaQuery(theme.breakpoints.down(1100));
  const is480 = useMediaQuery(theme.breakpoints.down(480));

  //states to update thumbnail
  const [thumbnail, setThumbnail] = useState({});
  const [previewThumbnail, setPreviewThumbnail] = useState("");
  const fileInputRef = useRef(null);

  //states to update images
  const [productImages, setProductImages] = useState([]);
  const [previewProductImages, setPreviewProductImages] = useState([]);
  const fileInputRefs = useRef(null);

  // Update state of thumbnail when selectedProduct changes
  useEffect(() => {
    if (selectedProduct?.thumbnail) {
      setThumbnail(selectedProduct.thumbnail);
      setPreviewThumbnail(selectedProduct.thumbnail.Location);
    }
    if (selectedProduct?.images?.length) {
      setProductImages(selectedProduct.images);
      setPreviewProductImages(
        selectedProduct.images.map((img) => img.Location)
      );
    }
  }, [selectedProduct]);

  useEffect(() => {
    console.log("thumbnail", thumbnail);
  }, [thumbnail]);
  useEffect(() => {
    console.log("productImages", productImages);
  }, [productImages]);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductByIdAsync(id));
    }
  }, [id]);

  useEffect(() => {
    if (productUpdateStatus === "fullfilled") {
      toast.success("Service mis à jour");
      navigate("/admin/dashboard");
    } else if (productUpdateStatus === "rejected") {
      toast.error("Erreur lors de la mise à jour du service.");
    }
  }, [productUpdateStatus]);

  useEffect(() => {
    return () => {
      dispatch(clearSelectedProduct());
      dispatch(resetProductUpdateStatus());
    };
  }, []);

  const handleProductUpdate = (data) => {
    const productUpdate = {
      ...data,
      _id: selectedProduct._id,
      thumbnail,
      images: productImages,
      //   images: [data?.image0, data?.image1, data?.image2, data?.image3],
    };
    dispatch(updateProductByIdAsync(productUpdate));
  };
  const handleThumbnailRemove = async () => {
    console.log("Removing image...");
    try {
      await axiosi.post("/products/remove-thumbnail", { thumbnail });
      setThumbnail({});
      setPreviewThumbnail("");
      const updatedSelctedProduct = { ...selectedProduct, thumbnail: {} };
      console.log("updatedSelctedProduct", updatedSelctedProduct);
      updateProductById(updatedSelctedProduct);
      toast.success("Miniature supprimée");
      console.log("Thumbnail removed successfully");
    } catch (err) {
      console.log(err);
      toast.error("Échec de la suppression de la miniature");
    }
  };

  const handleThumbnailUpload = (e) => {
    let file = e.target.files[0];
    if (!file) return;

    setPreviewThumbnail(URL.createObjectURL(file));
    // Resize and Upload
    Resizer.imageFileResizer(
      file,
      720,
      500,
      "JPEG",
      60,
      0,
      async (uri) => {
        try {
          let { data } = await axiosi.post("/products/upload-thumbnail", {
            thumbnail: uri,
          });
          setThumbnail(data);
          toast.success("Miniature téléchargée avec succès");
        } catch (err) {
          console.log(err);
          toast.error("Échec du téléchargement de la miniature");
        }
      },
      "base64"
    );
  };

  const handleThumbnailClick = () => {
    handleThumbnailRemove(); // Remove old thumbnail
    fileInputRef.current.click(); // Open file input
  };

  const handleProductImageRemove = async (index) => {
    console.log("index", index);
    console.log("productImages[index]", productImages[index]);
    console.log("Removing image...");

    try {
      await axiosi.post("/products/remove-image", {
        image: productImages[index],
      });

      // Update state
      const updatedImages = [...productImages];
      updatedImages.splice(index, 1);
      setProductImages(updatedImages);

      const updatedPreviews = [...previewProductImages];
      updatedPreviews.splice(index, 1);
      setPreviewProductImages(updatedPreviews);

      // Update selected product and database
      const updatedSelectedProduct = {
        ...selectedProduct,
        images: updatedImages, // Remove only the selected image from DB
      };
      console.log("updatedSelectedProduct", updatedSelectedProduct);
      updateProductById(updatedSelectedProduct);

      toast.success("Image supprimée");
      console.log("Image removed successfully");
    } catch (err) {
      console.log(err);
      toast.error("Échec de la suppression de l'image");
    }
  };
  const handleProductImageUpload = (e) => {
    let files = Array.from(e.target.files);
    console.log("files", files);
    if (!files.length) return;

    files.forEach((file) => {
      let previewUrl = URL.createObjectURL(file);
      setPreviewProductImages((prev) => [...prev, previewUrl]);

      Resizer.imageFileResizer(
        file,
        720,
        500,
        "JPEG",
        60,
        0,
        async (uri) => {
          try {
            let { data } = await axiosi.post("/products/upload-image", {
              image: uri,
            });
            setProductImages((prev) => [...prev, data]);
            toast.success("Image téléchargée avec succès");
          } catch (err) {
            console.log(err);
            toast.error("Échec du téléchargement de l'image");
          }
        },
        "base64"
      );
    });
  };

  const handleProductImageClick = (index) => {
    handleProductImageRemove(index);
    fileInputRefs.current.click(); // Open file input after removing image
  };

  const handleAddMoreImages = () => {
    fileInputRefs.current.click(); // Open file input to add more images
  };

  return (
    <Stack
      p={"0 16px"}
      justifyContent={"center"}
      alignItems={"center"}
      flexDirection={"row"}
    >
      {selectedProduct && (
        <Stack
          width={is1100 ? "100%" : "60rem"}
          rowGap={4}
          mt={is480 ? 4 : 6}
          mb={6}
          component={"form"}
          noValidate
          onSubmit={handleSubmit(handleProductUpdate)}
        >
          {/* Zone des champs */}
          <Stack rowGap={3}>
            <Stack>
              <Typography variant="h6" fontWeight={400} gutterBottom>
                Titre
              </Typography>
              <TextField
                {...register("title", {
                  required: "Le titre est requis",
                  value: selectedProduct.title,
                })}
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
                  value: selectedProduct.description,
                })}
              />
            </Stack>

            <Stack>
              <Typography variant="h6" fontWeight={400} gutterBottom>
                Miniature
              </Typography>
              <img
                src={previewThumbnail}
                width={200}
                style={{ cursor: "pointer" }}
                onClick={handleThumbnailClick}
                alt="Miniature"
              />
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleThumbnailUpload}
              />
            </Stack>
            <Stack>
              <Typography variant="h6" fontWeight={400} gutterBottom>
                Images du produit
              </Typography>

              <Stack rowGap={2}>
                {previewProductImages.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    width={200}
                    style={{ cursor: "pointer" }}
                    onClick={() => handleProductImageClick(index)}
                    alt={`Image du produit ${index + 1}`}
                  />
                ))}
              </Stack>

              <Button
                variant="contained"
                color="primary"
                onClick={handleAddMoreImages}
              >
                Ajouter plus d'images
              </Button>

              <input
                type="file"
                accept="image/*"
                ref={fileInputRefs}
                style={{ display: "none" }}
                multiple
                onChange={handleProductImageUpload}
              />
            </Stack>
          </Stack>

          {/* Zone des actions */}
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
              Mettre à jour
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
              to={"/admin/dashboard"}
            >
              Annuler
            </Button>
          </Stack>
        </Stack>
      )}
    </Stack>
  );
};
