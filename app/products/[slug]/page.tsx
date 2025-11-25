import { getProductBySlug, getProducts } from '@/lib/products-service-mongo';
import { notFound } from 'next/navigation';
import ProductImages from '@/components/product/ProductImages';
import AddToCart from '@/components/cart/AddToCart';
import ProductGrid from '@/components/product/ProductGrid';
import Link from 'next/link';

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  // Await the params first
  const { slug } = await params;
  
  const product = await getProductBySlug(slug);
  
  if (!product) {
    notFound();
  }

  const allProducts = await getProducts();
  // Filter related products (products from same category, excluding current product)
  const relatedProducts = allProducts.filter(p => 
    p.categoryId === product.categoryId && p.id !== product.id
  ).slice(0, 4);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Product Images */}
        <div>
          <ProductImages images={product.images || []} productName={product.name} />
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="ml-2 text-gray-600">(24 reviews)</span>
              </div>
              <span className={`text-sm px-2 py-1 rounded ${
                product.inventory > 10 ? 'bg-green-100 text-green-800' : 
                product.inventory > 0 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
              }`}>
                {product.inventory > 10 ? 'In Stock' : product.inventory > 0 ? 'Low Stock' : 'Out of Stock'}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-4xl font-bold text-gray-800">${product.price}</span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-2xl text-gray-500 line-through">${product.originalPrice}</span>
            )}
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                Save ${(product.originalPrice - product.price).toFixed(2)}
              </span>
            )}
          </div>

          <p className="text-gray-600 text-lg leading-relaxed">{product.description}</p>

          <AddToCart product={product} />

          <div className="border-t pt-6">
            <div className="space-y-4">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-600">Free shipping on orders over $50</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-600">30-day money back guarantee</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-600">Secure payment processing</span>
              </div>
            </div>
          </div>

          {/* Category Link */}
          <div className="border-t pt-6">
            <p className="text-gray-600">
              Category:{' '}
              <Link 
                href={product.categorySlug ? `/categories/${product.categorySlug}` : '/categories'}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                {product.categoryName ?? 'Uncategorized'}
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-8">Related Products</h2>
          <ProductGrid products={relatedProducts} />
        </section>
      )}
    </div>
  );
}