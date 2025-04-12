import {
  Button,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
  Pagination,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductsAsync,
  selectProducts,
  selectProductTotalResults,
} from "../ProductSlice";
import { ProductCard } from "./ProductCard";
import { ITEMS_PER_PAGE } from "../../../constants";

export const ProductList = () => {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState(null);
  const theme = useTheme();

  const is500 = useMediaQuery(theme.breakpoints.down(500));

  const products = useSelector(selectProducts);
  const totalResults = useSelector(selectProductTotalResults);

  const dispatch = useDispatch();

  useEffect(() => {
    const filters = { pagination: { page: page, limit: ITEMS_PER_PAGE }, sort };
    dispatch(fetchProductsAsync(filters));
  }, [page, sort]);

  return (
    <>
      <Stack mb={"3rem"}>
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product._id}>
              <ProductCard
                id={product._id}
                title={product.title}
                description={product.description}
                thumbnail={product.thumbnail}
                layout="column" // Affichage en colonne
              />
            </Grid>
          ))}
        </Grid>

        {/* Pagination */}
        <Stack alignSelf="flex-end" mr={5} rowGap={2} p={is500 ? 1 : 0}>
          <Pagination
            size={is500 ? "medium" : "large"}
            page={page}
            onChange={(e, page) => setPage(page)}
            count={Math.ceil(totalResults / ITEMS_PER_PAGE)}
            variant="outlined"
            shape="rounded"
          />
          <Typography textAlign={"center"}>
            Showing {(page - 1) * ITEMS_PER_PAGE + 1} to{" "}
            {page * ITEMS_PER_PAGE > totalResults
              ? totalResults
              : page * ITEMS_PER_PAGE}{" "}
            of {totalResults} results
          </Typography>
        </Stack>
      </Stack>
    </>
  );
};
