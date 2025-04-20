"use client"

import PageContainer from '@/app/components/container/PageContainer';
import ProductTableList from '@/app/components/apps/ecommerce/ProductTableList/ProductTableList';
import BlankCard from '@/app/components/shared/BlankCard';
import { ProductProvider } from '@/app/context/Ecommercecontext/index'

const EcomProductList = () => {
  return (
    <ProductProvider>
      <PageContainer title="eCommerce Product List" description="this is eCommerce Product List">
        <BlankCard>
          {/* ------------------------------------------- */}
          {/* Left part */}
          {/* ------------------------------------------- */}
          <ProductTableList />
        </BlankCard>
      </PageContainer>
    </ProductProvider>
  );
};

export default EcomProductList;
