import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Banner from "./components/Banner";
import PostCard from "./components/PostCard";
import SortDropdown from "./components/SortDropdown";
import ItemsPerPageDropdown from "./components/ItemsPerPageDropdown";
import Pagination from "./components/Pagination";
import useIdeasApi from "./hooks/useIdeasApi";
import useUrlState from "./hooks/useUrlState";
import "./font.css";

const App = () => {
  const [activeMenu, setActiveMenu] = useState("Ideas");
  const { urlParams, updateUrlParams } = useUrlState();
  const {
    ideas,
    loading,
    error,
    totalPages,
    currentPage,
    itemsPerPage,
    sortBy,
    fetchIdeas,
  } = useIdeasApi();

  useEffect(() => {
    fetchIdeas(urlParams.page, urlParams.size, urlParams.sort);
  }, [urlParams, fetchIdeas]);

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
    console.log(`Navigating to ${menu}`);
  };

  const handleSortChange = (newSort) => {
    updateUrlParams({ sort: newSort, page: 1 });
  };

  const handleItemsPerPageChange = (newSize) => {
    updateUrlParams({ size: newSize, page: 1 });
  };

  const handlePageChange = (newPage) => {
    updateUrlParams({ page: newPage });
  };

  return (
    <div className="min-h-screen">
      <Header activeMenu={activeMenu} onMenuClick={handleMenuClick} />
      <Banner />

      <main className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 space-y-4 lg:space-y-0">
          <div className="text-sm text-gray-600">
            Showing {(currentPage - 1) * itemsPerPage + 1} -{" "}
            {Math.min(currentPage * itemsPerPage, ideas.length)} of{" "}
            {ideas.length}
          </div>

          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <ItemsPerPageDropdown
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
            />
            <SortDropdown value={sortBy} onChange={handleSortChange} />
          </div>
        </div>

        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {!loading && !error && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {ideas.map((idea) => (
                <PostCard key={idea.id} idea={idea} />
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </main>
    </div>
  );
};

export default App;
