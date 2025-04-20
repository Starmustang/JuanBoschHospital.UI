import React, { useEffect, useContext } from "react";
import { filter, orderBy } from "lodash";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";
import Grid from "@mui/material/Grid2";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { Theme } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import Link from "next/link";
import { CustomizerContext } from '@/app/context/customizerContext';

import { ProductContext } from "@/app/context/Ecommercecontext/index";

import ProductSearch from "./ProductSearch";
import {
  IconBasket,
  IconHeart,
  IconMenu2,
  IconStarFilled,
} from "@tabler/icons-react";
import AlertCart from "../productCart/AlertCart";
import { ProductType } from "../../../../(DashboardLayout)/types/apps/eCommerce";
import Image from "next/image";

interface Props {
  onClick: (event: React.SyntheticEvent | Event) => void;
}

const ProductList2 = ({ onClick }: Props) => {

  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("lg"));
  const { filteredAndSortedProducts, addToCart, filterReset } =
    useContext(ProductContext);
  const { isBorderRadius } = useContext(CustomizerContext);


  const br = `${isBorderRadius}px`;



  // for alert when added something to cart
  const [cartalert, setCartalert] = React.useState(false);

  const handleClick = () => {
    setCartalert(true);
  };

  const handleClose = (reason: string) => {
    if (reason === "clickaway") {
      return;
    }
    setCartalert(false);
  };

  // skeleton
  const [isLoading, setLoading] = React.useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    (<Box>
      {/* ------------------------------------------- */}
      {/* Header Detail page */}
      {/* ------------------------------------------- */}
      <Stack direction="row" justifyContent="space-between" pb={3}>
        {lgUp ? (
          <Typography variant="h5">{filteredAndSortedProducts.length} Products</Typography>
        ) : (
          <Fab onClick={onClick} color="primary" size="small">
            <IconMenu2 width="16" />
          </Fab>
        )}
        <Box>
          <ProductSearch />
        </Box>
      </Stack>
      {/* ------------------------------------------- */}
      {/* Page Listing product */}
      {/* ------------------------------------------- */}
      <Grid container spacing={3}>
        {filteredAndSortedProducts.length > 0 ? (
          <>
            {filteredAndSortedProducts.map((product) => (
              <Grid
                display="flex"
                alignItems="stretch"
                key={product.id}
                size={{
                  xs: 12,
                  lg: 3,
                  md: 4,
                  sm: 6
                }}>
                {/* ------------------------------------------- */}
                {/* Product Card */}
                {/* ------------------------------------------- */}
                {isLoading ? (
                  <>
                    <Skeleton
                      variant="rectangular"
                      width={270}
                      height={300}
                      sx={{
                        borderRadius: (theme) => theme.shape.borderRadius / 20,
                      }}
                    ></Skeleton>
                  </>
                ) : (
                  <Box
                    position="relative"
                    overflow="hidden"
                    width="100%"
                    sx={{
                      borderRadius: 0,
                      "&:hover .wishList": {
                        right: "0 !important",
                        visibility: "visible",
                      },
                    }}
                  >
                    <Typography
                      component={Link}
                      href={`/apps/ecommerce/detail2/${product.id}`}
                    >
                      <Avatar
                        src={product.photo}
                        alt="img"
                        sx={{
                          width: "100%",
                          height: "256px",
                          borderRadius: br,
                        }}
                      />
                    </Typography>
                    <Box
                      className="wishList"
                      sx={{
                        position: "absolute",
                        top: "37%",
                        right: "-100px",
                        transition: "all .3s ease-in-out",
                        visibility: "hidden",
                      }}
                    >
                      <Stack
                        direction="row"
                        spacing={2}
                        sx={{
                          bottom: "75px",
                          right: "15px",
                          position: "absolute",
                        }}
                      >
                        <Tooltip title="Add To Favourites">
                          <Fab
                            color="inherit"
                            onClick={() => {
                              addToCart(product.id);
                              handleClick()
                            }}
                            sx={{
                              height: "36px",
                              width: "36px",
                              backgroundColor: (theme: any) => theme.palette.mode === "light" ? "white" : "#111C2D",
                              "&:hover": {
                                backgroundColor: (theme: any) => theme.palette.mode === "light" ? "white" : "#111C2D",
                              },
                            }}
                          >
                            <IconHeart size="20" />
                          </Fab>
                        </Tooltip>
                        <Tooltip title="Add To Cart">
                          <Fab
                            color="inherit"
                            onClick={() => {
                              addToCart(product.id);
                              handleClick();
                            }}
                            sx={{
                              height: "36px",
                              width: "36px",
                              backgroundColor: (theme: any) => theme.palette.mode === "light" ? "white" : "#111C2D",
                              "&:hover": {
                                backgroundColor: (theme: any) => theme.palette.mode === "light" ? "white" : "#111C2D",
                              },
                            }}
                          >
                            <IconBasket size="20" />
                          </Fab>
                        </Tooltip>
                      </Stack>
                    </Box>

                    <Typography variant="h6" my={1}>
                      {product.title}
                    </Typography>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Box
                        color="warning.main"
                        display="flex"
                        alignItems="center"
                      >
                        <IconStarFilled width={16} />
                      </Box>
                      <Typography variant="h6" color="textSecondary">
                        4.8
                      </Typography>
                      <Typography color="textSecondary">
                        ({product.rating})
                      </Typography>
                    </Stack>
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                      mt={1}
                    >
                      <Stack direction="row" alignItems="center">
                        <Typography variant="h6">${product.price}</Typography>
                        <Typography color="textSecondary" ml={1}>
                          ${product.salesPrice}
                        </Typography>
                      </Stack>
                    </Stack>
                  </Box>
                )}
                <AlertCart
                  handleClose={handleClose}
                  openCartAlert={cartalert}
                />
                {/* ------------------------------------------- */}
                {/* Product Card */}
                {/* ------------------------------------------- */}
              </Grid>
            ))}
          </>
        ) : (
          <>
            <Grid
              size={{
                xs: 12,
                lg: 12,
                md: 12,
                sm: 12
              }}>
              <Box textAlign="center" mt={6}>
                <Image
                  src="/images/products/empty-shopping-cart.svg"
                  alt="cart"
                  width={200}
                  height={200}
                />
                <Typography variant="h2">There is no Product</Typography>
                <Typography variant="h6" mb={3}>
                  The Product you are searching is no longer available.
                </Typography>
                <Button
                  variant="contained"
                  onClick={filterReset}
                >
                  Try Again
                </Button>
              </Box>
            </Grid>
          </>
        )}
      </Grid>
    </Box >)
  );
};

export default ProductList2;
