
const Home = () => {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 min-h-screen pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center py-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Welcome to ShopHub</h1>
          <p className="text-xl text-gray-600 mb-8">Discover amazing products at unbeatable prices</p>
          <a href="/products" className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
            Shop Now
          </a>
        </div>
      </div>
      </div>
  );
};

export default Home;