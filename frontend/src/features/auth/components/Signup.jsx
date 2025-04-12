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
  signupAsync,
  selectSignupStatus,
  selectSignupError,
  clearSignupError,
  resetSignupStatus,
} from "../AuthSlice";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { login } from "../../../assets";

export const Signup = () => {
  const dispatch = useDispatch();
  const status = useSelector(selectSignupStatus);
  const error = useSelector(selectSignupError);
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
    if (loggedInUser && !loggedInUser?.isVerified) {
      navigate("/verify-otp");
    } else if (loggedInUser) {
      navigate("/");
    }
  }, [loggedInUser]);

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  useEffect(() => {
    if (status === "fullfilled") {
      toast.success("Bienvenue ! Vérifiez votre e-mail!");
      reset();
    }
    return () => {
      dispatch(clearSignupError());
      dispatch(resetSignupStatus());
    };
  }, [status]);

  const handleSignup = (data) => {
    const cred = { ...data };
    delete cred.confirmPassword;
    dispatch(signupAsync(cred));
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
      {!is600 && (
        <Box
          flex={1}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <img
            style={{ width: "50%", height: "50%", borderRadius: "50%" }}
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
          Inscription
        </Typography>

        <Stack
          spacing={2}
          component="form"
          noValidate
          onSubmit={handleSubmit(handleSignup)}
        >
          <TextField
            fullWidth
            {...register("name", { required: "Nom d'utilisateur requis" })}
            placeholder="Nom d'utilisateur"
          />
          {errors.name && (
            <FormHelperText error>{errors.name.message}</FormHelperText>
          )}

          <TextField
            fullWidth
            {...register("email", {
              required: "Email requis",
              pattern: { value: /.+@.+\..+/, message: "Email invalide" },
            })}
            placeholder="Email"
          />
          {errors.email && (
            <FormHelperText error>{errors.email.message}</FormHelperText>
          )}

          <TextField
            type="password"
            fullWidth
            {...register("password", { required: "Mot de passe requis" })}
            placeholder="Mot de passe"
          />
          {errors.password && (
            <FormHelperText error>{errors.password.message}</FormHelperText>
          )}

          <TextField
            type="password"
            fullWidth
            {...register("confirmPassword", {
              required: "Confirmation requise",
              validate: (value, fromValues) =>
                value === fromValues.password ||
                "Les mots de passe ne correspondent pas",
            })}
            placeholder="Confirmer le mot de passe"
          />
          {errors.confirmPassword && (
            <FormHelperText error>
              {errors.confirmPassword.message}
            </FormHelperText>
          )}

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 1 }}>
            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "#047d61",
                color: "white",
                fontWeight: 600,
              }}
              disabled={status === "pending"}
            >
              S'inscrire
            </Button>
          </motion.div>
        </Stack>

        <Stack spacing={1} textAlign="center">
          <Typography
            component={Link}
            to="/login"
            sx={{
              textDecoration: "none",
              color: "#0F3F80",
              fontSize: "0.9rem",
            }}
          >
            Déjà membre ? <b>Connexion</b>
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};
