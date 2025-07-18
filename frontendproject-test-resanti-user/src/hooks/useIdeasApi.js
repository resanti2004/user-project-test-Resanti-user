import { useState, useCallback } from "react";
import axios from "axios";

const useIdeasApi = () => {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortBy, setSortBy] = useState("-published_at");

  // Tentukan base URL berdasarkan lingkungan
  const API_BASE_URL =
    process.env.NODE_ENV === "production"
      ? "https://suitmedia-backend.suitdev.com"
      : "/api";

  const fetchIdeas = useCallback(
    async (page = 1, size = 10, sort = "-published_at") => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(`${API_BASE_URL}/ideas`, {
          params: {
            "page[number]": page,
            "page[size]": size,
            append: ["small_image", "medium_image"],
            sort: sort,
          },
          paramsSerializer: (params) => {
            const searchParams = new URLSearchParams();
            Object.entries(params).forEach(([key, value]) => {
              if (key === "append" && Array.isArray(value)) {
                value.forEach((item) => searchParams.append("append[]", item));
              } else if (Array.isArray(value)) {
                value.forEach((item) => searchParams.append(key, item));
              } else {
                searchParams.append(key, value);
              }
            });
            return searchParams.toString();
          },
        });

        const { data, meta } = response.data;
        setIdeas(data);
        setTotalPages(meta?.last_page || 1);
        setCurrentPage(page);
        setItemsPerPage(size);
        setSortBy(sort);
      } catch (err) {
        setError("Failed to fetch ideas. Please try again later.");
        console.error("API Error:", err);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    ideas,
    loading,
    error,
    totalPages,
    currentPage,
    itemsPerPage,
    sortBy,
    fetchIdeas,
    setCurrentPage,
    setItemsPerPage,
    setSortBy,
  };
};

export default useIdeasApi;
