import { getCategoryBySlug, getCategories } from '@/lib/categories-service'; // Changed import
import {  getProductsByCategory } from '@/lib/products-service'; 
import { notFound } from 'next/navigation';
import ProductGrid from '@/components/product/ProductGrid';
import Link from 'next/link'; // Added Link import

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  // Await params
  const { slug } = await params;

  const [category, products, categories] = await Promise.all([
    getCategoryBySlug(slug),
    getProductsByCategory(slug),
    getCategories()
  ]);

  if (!category) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="lg:w-1/4">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
            <h2 className="text-xl font-semibold mb-4">Categories</h2>
            <div className="space-y-2">
              {categories.map((cat) => (
                <Link // Changed from <a> to <Link>
                  key={cat.id}
                  href={`/categories/${cat.slug}`}
                  className={`block py-2 px-3 rounded-lg transition-colors ${
                    cat.slug === slug // Changed from params.slug to slug
                      ? 'bg-blue-50 text-blue-600 font-semibold'
                      : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                  }`}
                >
                  {cat.name}
                </Link> // Changed from </a> to </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Products */}
        <div className="lg:w-3/4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{category.name}</h1>
            {category.description && (
              <p className="text-gray-600 text-lg">{category.description}</p>
            )}
            <p className="text-gray-500 mt-2">{products.length} products found</p>
          </div>

          <ProductGrid products={products} />

          {products.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No products found in this category.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}