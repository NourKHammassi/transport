import {
  Button,
  Grid,
  Stack,
  Typography,
  Pagination,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ProductCard } from "../../products/components/ProductCard";
import { ITEMS_PER_PAGE } from "../../../constants";
import {
  fetchProductsAsync,
  deleteProductByIdAsync,
  undeleteProductByIdAsync,
  selectProducts,
  selectProductTotalResults,
} from "../../products/ProductSlice";
import { selectCategories } from "../../categories/CategoriesSlice";
import { selectBrands } from "../../brands/BrandSlice";

export const AdminDashBoard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(600));

  const products = useSelector(selectProducts);
  const totalResults = useSelector(selectProductTotalResults);

  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const finalFilters = {
      ...filters,
      pagination: { page, limit: ITEMS_PER_PAGE },
      sort,
    };
    dispatch(fetchProductsAsync(finalFilters));
  }, [filters, sort, page]);

  const handleProductDelete = (productId) =>
    dispatch(deleteProductByIdAsync(productId));
  const handleProductUnDelete = (productId) =>
    dispatch(undeleteProductByIdAsync(productId));

  return (
    <Stack spacing={5} mt={isMobile ? 2 : 5} mb={"3rem"}>
      <Grid
        container
        spacing={2}
        justifyContent="space-evenly"
        alignItems="center"
      >
        {products.map((product) => (
          <Stack key={product._id}>
            <ProductCard
              id={product._id}
              title={product.title}
              description={product.description}
              thumbnail={product.thumbnail}
              isAdminCard={true}
              sx={{ opacity: product.isDeleted ? 0.7 : 1 }}
            />
            <Stack
              direction="row"
              justifyContent="flex-end"
              spacing={2}
              sx={{ padding: "0 16px" }}
            >
              <Button
                component={Link}
                to={`/admin/product-update/${product._id}`}
                variant="contained"
                sx={{
                  backgroundColor: "#C27B06",
                  "&:hover": { backgroundColor: "#a86205" },
                }}
              >
                Modifier
              </Button>

              {product.isDeleted ? (
                <Button
                  onClick={() => handleProductUnDelete(product._id)}
                  sx={{
                    borderColor: "#047d61",
                    borderWidth: "1px",
                    borderStyle: "solid",
                    color: "#047d61",
                    backgroundColor: "white",
                    "&:hover": {
                      borderColor: "#12997B",
                      color: "#12997B",
                    },
                  }}
                >
                  Restaurer
                </Button>
              ) : (
                <Button
                  onClick={() => handleProductDelete(product._id)}
                  color="error"
                  variant="outlined"
                >
                  Supprimer
                </Button>
              )}
            </Stack>
          </Stack>
        ))}
      </Grid>

      <Stack alignItems="center" spacing={2} sx={{ padding: isMobile ? 1 : 0 }}>
        <Pagination
          size={isMobile ? "medium" : "large"}
          page={page}
          onChange={(e, page) => setPage(page)}
          count={Math.ceil(totalResults / ITEMS_PER_PAGE)}
          variant="outlined"
          shape="rounded"
        />
        <Typography textAlign="center">
          Affichage de {(page - 1) * ITEMS_PER_PAGE + 1} à{" "}
          {Math.min(page * ITEMS_PER_PAGE, totalResults)} sur {totalResults}{" "}
          résultats
        </Typography>
      </Stack>
    </Stack>
  );
};
