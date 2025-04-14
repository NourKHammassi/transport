import {
  Box,
  FormHelperText,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
  Button,
} from "@mui/material";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  selectLoggedInUser,
  loginAsync,
  selectLoginStatus,
  selectLoginError,
  clearLoginError,
  resetLoginStatus,
} from "../AuthSlice";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { login } from "../../../assets";

export const Login = () => {
  const dispatch = useDispatch();
  const status = useSelector(selectLoginStatus);
  const error = useSelector(selectLoginError);
  const loggedInUser = useSelector(selectLoggedInUser);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const theme = useTheme();
  const is600 = useMediaQuery(theme.breakpoints.down(600));

  useEffect(() => {
    if (loggedInUser && loggedInUser?.isVerified) {
      navigate("/");
    } else if (loggedInUser && !loggedInUser?.isVerified) {
      navigate("/verify-otp");
    }
  }, [loggedInUser]);

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  useEffect(() => {
    if (status === "fullfilled" && loggedInUser?.isVerified === true) {
      toast.success("Connexion réussie");
      reset();
    }
    return () => {
      dispatch(clearLoginError());
      dispatch(resetLoginStatus());
    };
  }, [status]);

  const handleLogin = (data) => {
    dispatch(loginAsync(data));
  };

  return (
    <Stack
      width={"100vw"}
      height={"100vh"}
      flexDirection={"row"}
      alignItems={"center"}
      justifyContent={"center"}
      sx={{ backgroundColor: "#f5f5f5" }}
    >
      {/* Espace pour l'image */}
      {!is600 && (
        <Box
          flex={1}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <img
            style={{ width: "50%", height: "50%", borderRadius: "10%" }}
            src={login}
          />
        </Box>
      )}

      <Stack
        flex={1}
        spacing={3}
        maxWidth={400}
        padding={4}
        borderRadius={2}
        sx={{
          backgroundColor: "white",
          boxShadow: "2px 2px 10px rgba(0,0,0,0.1)",
          marginRight: "100px",
        }}
      >
        <Typography
          variant="h4"
          fontWeight={600}
          color="#0F3F80"
          textAlign="center"
        >
          Connexion
        </Typography>

        <Stack
          spacing={2}
          component="form"
          noValidate
          onSubmit={handleSubmit(handleLogin)}
        >
          <TextField
            fullWidth
            {...register("email", {
              required: "L'email est requis",
              pattern: {
                value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                message: "Veuillez entrer un email valide",
              },
            })}
            placeholder="Email"
          />
          {errors.email && (
            <FormHelperText error>{errors.email.message}</FormHelperText>
          )}

          <TextField
            type="password"
            fullWidth
            {...register("password", {
              required: "Le mot de passe est requis",
            })}
            placeholder="Mot de passe"
          />
          {errors.password && (
            <FormHelperText error>{errors.password.message}</FormHelperText>
          )}

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 1 }}>
            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "#C27B06",
                color: "white",
                fontWeight: 600,
              }}
              disabled={status === "pending"}
            >
              Se connecter
            </Button>
          </motion.div>
        </Stack>

        <Stack spacing={1} textAlign="center">
          <Typography
            component={Link}
            to="/forgot-password"
            sx={{
              textDecoration: "none",
              color: "#C24E06",
              fontSize: "0.9rem",
            }}
          >
            Mot de passe oublié ?
          </Typography>
          <Typography
            component={Link}
            to="/signup"
            sx={{
              textDecoration: "none",
              color: "#0F3F80",
              fontSize: "0.9rem",
            }}
          >
            Vous n'avez pas de compte ? <b>S'inscrire</b>
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};
