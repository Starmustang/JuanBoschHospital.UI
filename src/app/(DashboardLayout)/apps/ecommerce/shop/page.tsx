"use client"

import React from 'react';
import Box from '@mui/material/Box';
import PageContainer from '@/app/components/container/PageContainer';
import ProductList from '@/app/components/apps/ecommerce/productGrid/ProductList';
import ProductSidebar from '@/app/components/apps/ecommerce/productGrid/ProductSidebar';
import AppCard from '@/app/components/shared/AppCard';
import { ProductProvider } from '@/app/context/Ecommercecontext/index'

const Ecommerce = () => {
  const [isMobileSidebarOpen, setMobileSidebarOpen] = React.useState(true);

  return (
    <ProductProvider>
      <PageContainer title="Shop" description="this is Shop">
        <AppCard>
          {/* ------------------------------------------- */}
          {/* Left part */}
          {/* ------------------------------------------- */}
          <ProductSidebar
            isMobileSidebarOpen={isMobileSidebarOpen}
            onSidebarClose={() => setMobileSidebarOpen(false)}
          />
          {/* ------------------------------------------- */}
          {/* Right part */}
          {/* ------------------------------------------- */}
          <Box p={3} flexGrow={1}>
            <ProductList onClick={() => setMobileSidebarOpen(!isMobileSidebarOpen)} />
          </Box>
        </AppCard>
      </PageContainer>
    </ProductProvider>
  );
};

export default Ecommerce;
