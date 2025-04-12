import {
  Avatar,
  Button,
  Paper,
  Stack,
  Typography,
  useTheme,
  TextField,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserInfo } from "../UserSlice";
import {
  addAddressAsync,
  resetAddressAddStatus,
  resetAddressDeleteStatus,
  resetAddressUpdateStatus,
  selectAddressAddStatus,
  selectAddressDeleteStatus,
  selectAddressErrors,
  selectAddressStatus,
  selectAddressUpdateStatus,
  selectAddresses,
} from "../../address/AddressSlice";
import { Address } from "../../address/components/Address";
import { useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import { toast } from "react-toastify";

export const UserProfile = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const status = useSelector(selectAddressStatus);
  const userInfo = useSelector(selectUserInfo);
  const addresses = useSelector(selectAddresses);
  const theme = useTheme();
  const [addAddress, setAddAddress] = useState(false);

  const addressAddStatus = useSelector(selectAddressAddStatus);
  const addressUpdateStatus = useSelector(selectAddressUpdateStatus);
  const addressDeleteStatus = useSelector(selectAddressDeleteStatus);

  const is900 = useMediaQuery(theme.breakpoints.down(900));
  const is480 = useMediaQuery(theme.breakpoints.down(480));

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);

  useEffect(() => {
    if (addressAddStatus === "fulfilled") {
      toast.success("Address added");
    } else if (addressAddStatus === "rejected") {
      toast.error("Error adding address, please try again later");
    }
  }, [addressAddStatus]);

  useEffect(() => {
    if (addressUpdateStatus === "fulfilled") {
      toast.success("Address updated");
    } else if (addressUpdateStatus === "rejected") {
      toast.error("Error updating address, please try again later");
    }
  }, [addressUpdateStatus]);

  useEffect(() => {
    if (addressDeleteStatus === "fulfilled") {
      toast.success("Address deleted");
    } else if (addressDeleteStatus === "rejected") {
      toast.error("Error deleting address, please try again later");
    }
  }, [addressDeleteStatus]);

  useEffect(() => {
    return () => {
      dispatch(resetAddressAddStatus());
      dispatch(resetAddressUpdateStatus());
      dispatch(resetAddressDeleteStatus());
    };
  }, []);

  const handleAddAddress = (data) => {
    const address = { ...data, user: userInfo._id };
    dispatch(addAddressAsync(address));
    setAddAddress(false);
    reset();
  };

  return (
    <Stack
      height={"calc(100vh - 4rem)"}
      justifyContent={"flex-start"}
      alignItems={"center"}
    >
      <Stack
        component={is480 ? "" : Paper}
        elevation={1}
        width={is900 ? "100%" : "50rem"}
        p={2}
        mt={is480 ? 0 : 5}
        rowGap={2}
      >
        {/* Détails de l'utilisateur - [nom, email] */}
        <Stack
          bgcolor={theme.palette.primary.light}
          color={theme.palette.primary.main}
          p={2}
          rowGap={1}
          borderRadius={".6rem"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Avatar
            src="none"
            alt={userInfo?.name}
            sx={{ width: 70, height: 70 }}
          ></Avatar>
          <Typography>{userInfo?.name}</Typography>
          <Typography>{userInfo?.email}</Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};
