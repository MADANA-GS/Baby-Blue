import React, { useContext, useEffect, useState } from "react";
import { AllContext } from "../Context/AllContext";
import { useParams, useNavigate } from "react-router-dom";
import ProductCard from "../Components/ProductCard";

const Products = () => {
  const { products, subCategories, mainCategories } = useContext(AllContext);
  const { cat } = useParams();
  const navigate = useNavigate();

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [priceSort, setPriceSort] = useState("none");
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Effect to handle URL parameter changes
  useEffect(() => {
    if (cat) {
      if (cat === "all") {
        setCategory([]);
        setSubcategories([]);
      } else if (mainCategories.includes(cat)) {
        setCategory([cat]);
        setSubcategories([]);
      } else if (subCategories.includes(cat)) {
        setSubcategories([cat]);
        setCategory([]);
      }
    } else {
      // Reset filters if no cat in URL
      setCategory([]);
      setSubcategories([]);
    }
  }, [cat, mainCategories, subCategories]);

  // Effect for filtering products with loading state
  useEffect(() => {
    // Set loading state to show transition
    setIsLoading(true);
    
    // Use setTimeout to create a slightly longer delay for smoother transition
    const filterTimeout = setTimeout(() => {
      let filtered = [...products];

      // Filter by category
      if (category.length > 0) {
        filtered = filtered.filter(
          (product) => product.category === category[0]
        );
      }
      
      // Filter by subcategories (multiple)
      if (subcategories.length > 0) {
        filtered = filtered.filter(
          (product) => subcategories.includes(product.subcategory)
        );
      }

      // Apply price sorting
      if (priceSort === "asc") {
        filtered.sort((a, b) => parseFloat(a.discountPrice) - parseFloat(b.discountPrice));
      } else if (priceSort === "desc") {
        filtered.sort((a, b) => parseFloat(b.discountPrice) - parseFloat(a.discountPrice));
      }

      setFilteredProducts(filtered);
      setIsLoading(false);
    }, 450); // Increased to 450ms for smoother transition, but not too slow
    
    return () => clearTimeout(filterTimeout);
  }, [products, category, subcategories, priceSort]);

  // Category click handler
  const handleCategoryClick = (item) => {
    if (category.includes(item)) {
      setCategory([]);
      navigate("/products/all");
    } else {
      setCategory([item]);
      setSubcategories([]); // Clear subcategories when selecting a category
      navigate(`/products/${item}`);
    }
    
    // Don't close filters on mobile after selection - wait for Apply button
  };

  // Subcategory click handler - now supports multiple selections
  const handleSubcategoryClick = (item) => {
    setSubcategories(prev => {
      let newSubcategories;
      if (prev.includes(item)) {
        // Remove subcategory if already selected
        newSubcategories = prev.filter(s => s !== item);
      } else {
        // Add subcategory to selection
        newSubcategories = [...prev, item];
      }
      
      return newSubcategories;
    });
    
    // Don't close filters on mobile after selection - wait for Apply button
  };

  // Handle price sort changes - FIXED: Don't reset category filters
  const handlePriceSortChange = (e) => {
    setPriceSort(e.target.value);
    // No longer resetting category or subcategory filters when changing price sort
  };

  // Toggle filters visibility for mobile
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  // Apply filters (for mobile) - Now updates URL based on current filter state
  const applyFilters = () => {
    // Update URL based on current filters before closing
    if (subcategories.length === 1 && category.length === 0) {
      navigate(`/products/${subcategories[0]}`);
    } else if (category.length === 1) {
      navigate(`/products/${category[0]}`);
    } else if (category.length === 0 && subcategories.length === 0) {
      navigate("/products/all");
    }
    
    // Close the filter panel
    setShowFilters(false);
  };

  // Reset all filters
  const resetAllFilters = () => {
    setCategory([]);
    setSubcategories([]);
    setPriceSort("none");
    navigate("/products/all");
  };

  // Handle removing a single category
  const removeCategory = (cat) => {
    setCategory([]);
    if (subcategories.length === 0) {
      navigate("/products/all");
    }
  };

  // Handle removing a single subcategory
  const removeSubcategory = (subcat) => {
    const newSubcategories = subcategories.filter(s => s !== subcat);
    setSubcategories(newSubcategories);
    
    if (newSubcategories.length === 0 && category.length === 0) {
      navigate("/products/all");
    } else if (newSubcategories.length === 1 && category.length === 0) {
      navigate(`/products/${newSubcategories[0]}`);
    }
  };

  return (
    <div className="w-full relative">
      {/* Fixed position Mobile filter toggle and sort bar */}
      <div className="sticky top-0 z-40 bg-white shadow-md p-3 flex justify-between items-center md:hidden">
        <button 
          onClick={toggleFilters}
          className="flex items-center gap-2 text-gray-800 font-medium bg-gray-100 px-3 py-2 rounded"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
          Filters
        </button>
        
        <div className="flex items-center">
          <select
            id="mobile-sort"
            className="border rounded px-2 py-2 text-sm bg-gray-100 w-40"
            value={priceSort}
            onChange={handlePriceSortChange}
          >
            <option value="none">Sort: Default</option>
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Active filters display */}
      {(category.length > 0 || subcategories.length > 0 || priceSort !== "none") && (
        <div className="px-4 py-2 bg-gray-50 border-b">
          <div className="max-w-7xl mx-auto flex flex-wrap gap-2 items-center">
            <span className="text-sm text-gray-500">Active filters:</span>
            {category.map(cat => (
              <div key={cat} className="bg-white px-3 py-1 text-sm flex items-center border rounded">
                {cat}
                <button onClick={() => removeCategory(cat)} className="ml-2 text-gray-500 hover:text-black">×</button>
              </div>
            ))}
            {subcategories.map(subcat => (
              <div key={subcat} className="bg-white px-3 py-1 text-sm flex items-center border rounded">
                {subcat}
                <button onClick={() => removeSubcategory(subcat)} className="ml-2 text-gray-500 hover:text-black">×</button>
              </div>
            ))}
            {priceSort !== "none" && (
              <div className="bg-white px-3 py-1 text-sm flex items-center border rounded">
                Price: {priceSort === "asc" ? "Low to High" : "High to Low"}
                <button onClick={() => setPriceSort("none")} className="ml-2 text-gray-500 hover:text-black">×</button>
              </div>
            )}
            <button 
              onClick={resetAllFilters}
              className="text-sm text-blue-600 hover:text-blue-800 ml-auto"
            >
              Clear all
            </button>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto flex">
        {/* Sidebar filters - fullscreen slide-in on mobile, sticky on desktop */}
        <div 
          className={`
            ${showFilters ? 'fixed inset-0 z-50' : 'hidden'} 
            md:block md:relative md:z-30 md:w-64 md:flex-shrink-0 md:bg-transparent
          `}
        >
          {/* Mobile filter content with proper scrolling */}
          <div className={`
            bg-white h-full flex flex-col
            md:static md:h-full
          `}>
            {/* Mobile filter header */}
            <div className="flex justify-between items-center p-4 border-b md:hidden">
              <h3 className="font-bold text-lg">Filters</h3>
              <button 
                onClick={toggleFilters}
                className="text-gray-500 hover:text-black p-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          
            {/* Filter content - FIXED: removed scrollbar on desktop view */}
            <div className="filter-container flex-1 p-4 md:sticky md:top-0 md:overflow-visible">
              {/* Remove the scrollbar-hiding style for desktop - this was causing the issue */}
              <style jsx>{`
                @media (max-width: 767px) {
                  .filter-container {
                    overflow-y: auto;
                    scrollbar-width: none; /* Firefox */
                    -ms-overflow-style: none; /* IE and Edge */
                  }
                  .filter-container::-webkit-scrollbar {
                    display: none; /* Chrome, Safari, Opera */
                  }
                }
                @media (min-width: 768px) {
                  .filter-container {
                    max-height: none;
                    overflow: visible;
                  }
                }
              `}</style>
              
              {/* Desktop price sorting */}
              <div className="mb-6 hidden md:block">
                <h4 className="font-semibold mb-2">Sort by Price</h4>
                <select 
                  className="w-full p-2 border bg-white rounded"
                  value={priceSort}
                  onChange={handlePriceSortChange}
                >
                  <option value="none">Default</option>
                  <option value="asc">Price: Low to High</option>
                  <option value="desc">Price: High to Low</option>
                </select>
              </div>
              
              {/* Categories */}
              <div className="mb-6">
                <h4 className="font-semibold mb-3 text-lg">Categories</h4>
                <div className="flex flex-col gap-2">
                  {mainCategories.map((item) => (
                    <button
                      key={item}
                      onClick={() => handleCategoryClick(item)}
                      className={`${
                        category.includes(item)
                          ? "bg-black text-white"
                          : "bg-white text-black hover:bg-gray-100"
                      } p-3 border border-black text-base transition-colors duration-200 rounded relative z-10`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Subcategories */}
              <div className="mb-6">
                <h4 className="font-semibold mb-3 text-lg">Styles</h4>
                <div className="flex flex-col gap-2">
                  {subCategories.map((item) => (
                    <button
                      key={item}
                      onClick={() => handleSubcategoryClick(item)}
                      className={`${
                        subcategories.includes(item)
                          ? "bg-black text-white"
                          : "bg-white text-black hover:bg-gray-100"
                      } p-3 border border-black text-base transition-colors duration-200 rounded relative z-10`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Mobile apply filters button (fixed at bottom) */}
            <div className="p-4 border-t bg-white shadow-inner md:hidden">
              <button 
                onClick={applyFilters}
                className="w-full bg-black text-white p-3 rounded text-lg font-medium"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
        
        {/* Products Grid */}
        <div className="flex-1 p-4">
          {/* Products count */}
          <div className="mb-4">
            <p className="text-gray-500">{filteredProducts.length} products found</p>
          </div>
          
          {/* Loading state with fade transition */}
          <div className={`transition-opacity duration-300 ${isLoading ? 'opacity-50' : 'opacity-100'}`}>
            {isLoading ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                {/* Loading placeholders */}
                {[...Array(8)].map((_, index) => (
                  <div key={index} className="bg-gray-100 rounded aspect-square animate-pulse"></div>
                ))}
              </div>
            ) : (
              /* Products grid with fade-in animation */
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <ProductCard key={product.id} {...product} />
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <p className="text-xl text-gray-500">No products found.</p>
                    <p className="mt-2 text-gray-400">Try changing your filter options.</p>
                    <button 
                      onClick={resetAllFilters} 
                      className="mt-4 bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
                    >
                      Reset Filters
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Mobile filter overlay backdrop */}
      {showFilters && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleFilters}
        ></div>
      )}
    </div>
  );
};

export default Products;