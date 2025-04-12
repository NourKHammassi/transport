import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getOrderByUserIdAsync,
  resetOrderFetchStatus,
  selectOrderFetchStatus,
  selectOrders,
} from "../OrderSlice";
import { selectLoggedInUser } from "../../auth/AuthSlice";
import {
  Button,
  IconButton,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
import {
  addToCartAsync,
  resetCartItemAddStatus,
  selectCartItemAddStatus,
  selectCartItems,
} from "../../cart/CartSlice";
import Lottie from "lottie-react";
import { loadingAnimation, noOrdersAnimation } from "../../../assets";
import { toast } from "react-toastify";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { motion } from "framer-motion";

export const UserOrders = () => {
  const dispatch = useDispatch();
  const loggedInUser = useSelector(selectLoggedInUser);
  const orders = useSelector(selectOrders);
  const cartItems = useSelector(selectCartItems);
  const orderFetchStatus = useSelector(selectOrderFetchStatus);

  const theme = useTheme();
  const is1200 = useMediaQuery(theme.breakpoints.down("1200"));
  const is768 = useMediaQuery(theme.breakpoints.down("768"));
  const is660 = useMediaQuery(theme.breakpoints.down(660));
  const is480 = useMediaQuery(theme.breakpoints.down("480"));

  const cartItemAddStatus = useSelector(selectCartItemAddStatus);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);

  useEffect(() => {
    dispatch(getOrderByUserIdAsync(loggedInUser?._id));
  }, [dispatch]);

  useEffect(() => {
    if (cartItemAddStatus === "fulfilled") {
      toast.success("Product added to cart");
    } else if (cartItemAddStatus === "rejected") {
      toast.error("Error adding product to cart, please try again later");
    }
  }, [cartItemAddStatus]);

  useEffect(() => {
    if (orderFetchStatus === "rejected") {
      toast.error("Error fetching orders, please try again later");
    }
  }, [orderFetchStatus]);

  useEffect(() => {
    return () => {
      dispatch(resetOrderFetchStatus());
      dispatch(resetCartItemAddStatus());
    };
  }, []);

  const handleAddToCart = (product) => {
    const item = { user: loggedInUser._id, product: product._id, quantity: 1 };
    dispatch(addToCartAsync(item));
  };

  return (
    <Stack justifyContent={"center"} alignItems={"center"}>
      {orderFetchStatus === "pending" ? (
        <Stack
          width={is480 ? "auto" : "25rem"}
          height={"calc(100vh - 4rem)"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Lottie animationData={loadingAnimation} />
        </Stack>
      ) : (
        <Stack width={is1200 ? "auto" : "60rem"} p={is480 ? 2 : 4} mb={"5rem"}>
          {/* En-tête et navigation */}
          <Stack flexDirection={"row"} columnGap={2}>
            {!is480 && (
              <motion.div
                whileHover={{ x: -5 }}
                style={{ alignSelf: "center" }}
              >
                <IconButton component={Link} to={"/"}>
                  <ArrowBackIcon fontSize="large" />
                </IconButton>
              </motion.div>
            )}

            <Stack rowGap={1}>
              <Typography variant="h4" fontWeight={500}>
                Historique des commandes
              </Typography>
              <Typography
                sx={{ wordWrap: "break-word" }}
                color={"text.secondary"}
              >
                Consultez le statut des commandes récentes, gérez les retours et
                découvrez des produits similaires.
              </Typography>
            </Stack>
          </Stack>

          {/* Commandes */}
          <Stack mt={5} rowGap={5}>
            {/* Liste des commandes */}
            {orders &&
              orders.map((order) => (
                <Stack
                  p={is480 ? 0 : 2}
                  component={is480 ? "" : Paper}
                  elevation={1}
                  rowGap={2}
                >
                  {/* Haut */}
                  <Stack
                    flexDirection={"row"}
                    rowGap={"1rem"}
                    justifyContent={"space-between"}
                    flexWrap={"wrap"}
                  >
                    <Stack
                      flexDirection={"row"}
                      columnGap={4}
                      rowGap={"1rem"}
                      flexWrap={"wrap"}
                    >
                      <Stack>
                        <Typography>Numéro de commande</Typography>
                        <Typography color={"text.secondary"}>
                          {order._id}
                        </Typography>
                      </Stack>

                      <Stack>
                        <Typography>Date de commande</Typography>
                        <Typography color={"text.secondary"}>
                          {new Date(order.createdAt).toDateString()}
                        </Typography>
                      </Stack>

                      <Stack>
                        <Typography>Montant total</Typography>
                        <Typography>€{order.total}</Typography>
                      </Stack>
                    </Stack>

                    <Stack>
                      <Typography>Articles : {order.item.length}</Typography>
                    </Stack>
                  </Stack>

                  {/* Milieu */}
                  <Stack rowGap={2}>
                    {order.item.map((product) => (
                      <Stack
                        mt={2}
                        flexDirection={"row"}
                        rowGap={is768 ? "2rem" : ""}
                        columnGap={4}
                        flexWrap={is768 ? "wrap" : "nowrap"}
                      >
                        <Stack>
                          <img
                            style={{
                              width: "100%",
                              aspectRatio: is480 ? 3 / 2 : 1 / 1,
                              objectFit: "contain",
                            }}
                            src={product.product.images[0]}
                            alt=""
                          />
                        </Stack>

                        <Stack rowGap={1} width={"100%"}>
                          <Stack
                            flexDirection={"row"}
                            justifyContent={"space-between"}
                          >
                            <Stack>
                              <Typography
                                variant="h6"
                                fontSize={"1rem"}
                                fontWeight={500}
                              >
                                {product.product.title}
                              </Typography>
                            </Stack>
                          </Stack>

                          <Typography color={"text.secondary"}>
                            {product.product.description}
                          </Typography>

                          <Stack
                            mt={2}
                            alignSelf={is480 ? "flex-start" : "flex-end"}
                            flexDirection={"row"}
                            columnGap={2}
                          >
                            <Button
                              size="small"
                              component={Link}
                              to={`/product-details/${product.product._id}`}
                              variant="outlined"
                            >
                              Voir le produit
                            </Button>
                            {cartItems.some(
                              (cartItem) =>
                                cartItem.product._id === product.product._id
                            ) ? (
                              <Button
                                size="small"
                                variant="contained"
                                component={Link}
                                to={"/cart"}
                              >
                                Déjà dans le panier
                              </Button>
                            ) : (
                              <Button
                                size="small"
                                variant="contained"
                                onClick={() => handleAddToCart(product.product)}
                              >
                                Acheter à nouveau
                              </Button>
                            )}
                          </Stack>
                        </Stack>
                      </Stack>
                    ))}
                  </Stack>

                  {/* Bas */}
                  <Stack
                    mt={2}
                    flexDirection={"row"}
                    justifyContent={"space-between"}
                  >
                    <Typography mb={2}>Statut : {order.status}</Typography>
                  </Stack>
                </Stack>
              ))}

            {/* Animation si aucune commande */}
            {!orders.length && (
              <Stack
                mt={is480 ? "2rem" : 0}
                mb={"7rem"}
                alignSelf={"center"}
                rowGap={2}
              >
                <Stack
                  width={is660 ? "auto" : "30rem"}
                  height={is660 ? "auto" : "30rem"}
                >
                  <Lottie animationData={noOrdersAnimation} />
                </Stack>

                <Typography
                  textAlign={"center"}
                  alignSelf={"center"}
                  variant="h6"
                >
                  Oh ! On dirait que vous n'avez pas fait d'achats récemment.
                </Typography>
              </Stack>
            )}
          </Stack>
        </Stack>
      )}
    </Stack>
  );
};
