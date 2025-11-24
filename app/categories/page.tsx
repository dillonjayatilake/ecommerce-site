import { getCategories, getProducts } from '@/lib/db';
import Link from 'next/link';

export default async function CategoriesPage() {
  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts()
  ]);

  // Count products per category
  const categoryCounts = categories.map(category => ({
    ...category,
    productCount: products.filter(product => product.category === category.slug).length
  }));

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Shop by Category</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Browse our wide selection of products organized by category. Find exactly what you're looking for.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categoryCounts.map((category) => (
          <Link
            key={category.id}
            href={`/categories/${category.slug}`} // This should match the dynamic route
            className="group"
          >
            <div className="bg-white rounded-lg shadow-md p-8 text-center hover:shadow-lg transition-all duration-300 border border-gray-100 group-hover:border-blue-200">
              <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition-colors">
                <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              
              <h2 className="text-2xl font-semibold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
                {category.name}
              </h2>
              
              {category.description && (
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {category.description}
                </p>
              )}
              
              <div className="bg-gray-100 rounded-full px-4 py-2 inline-block">
                <span className="text-sm font-medium text-gray-700">
                  {category.productCount} {category.productCount === 1 ? 'product' : 'products'}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {categories.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No categories found.</p>
        </div>
      )}
    </div>
  );
}