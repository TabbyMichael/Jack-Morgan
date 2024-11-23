import { notFound } from 'next/navigation';
import { getProductById, merchItems } from '@/lib/merchData';
import ProductDetails from '@/components/product/ProductDetails';

// Generate static params for all product IDs
export async function generateStaticParams() {
  return merchItems.map((product) => ({
    id: product.id.toString(),
  }));
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const productId = parseInt(params.id);
  const product = getProductById(productId);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen pt-20 pb-16">
      <ProductDetails product={product} />
    </div>
  );
}
