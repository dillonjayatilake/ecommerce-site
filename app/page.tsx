import Link from 'next/link';
import { getFeaturedProducts } from '@/lib/products-service-mongo';
import { getCategories } from '@/lib/categories-service-mongo';
import ProductGrid from '@/components/product/ProductGrid';

export default async function Home() {
  const [featuredProducts, categories] = await Promise.all([
    getFeaturedProducts(),
    getCategories()
  ]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Welcome to Jayatilake Store</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Discover amazing products at great prices. Quality you can trust, service you'll love.
          </p>
          <Link 
            href="/products"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
          >
            Shop Now
          </Link>
        </div>
      </section>

     {/* Categories */}
<section className="py-16 bg-white">
  <div className="container mx-auto px-4">
    <h2 className="text-3xl text-black font-bold text-center mb-12">Shop by Category</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/categories/${category.slug}`}  // Link to individual category
          className="group"
        >
          <div className="bg-gray-100 rounded-lg p-8 text-center hover:bg-blue-50 transition-colors group-hover:shadow-lg">
            <h3 className="text-xl text-blue-600 font-semibold mb-3 group-hover:text-blue-600 transition-colors">
              {category.name}
            </h3>
            <p className="text-gray-600">{category.description}</p>
          </div>
        </Link>
      ))}
    </div>
    {/* Add a link to view all categories */}
    <div className="text-center mt-8">
      <Link 
        href="/categories"
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold inline-block"
      >
        View All Categories
      </Link>
    </div>
  </div>
</section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl  text-blue-600 font-bold text-center mb-12">Featured Products</h2>
          <ProductGrid products={featuredProducts} />
          <div className="text-center mt-8">
            <Link 
              href="/products"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-block"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 className="text-xl  text-black font-semibold mb-2">Secure Payment</h3>
              <p className="text-gray-600">Your payment information is safe with us</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl text-black  font-semibold mb-2">Quality Guarantee</h3>
              <p className="text-gray-600">30-day money back guarantee</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl text-black  font-semibold mb-2">Free Shipping</h3>
              <p className="text-gray-600">Free shipping on orders over $50</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}