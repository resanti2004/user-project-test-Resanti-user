import { useState, useCallback } from "react";

const useUrlState = () => {
  const [urlParams, setUrlParams] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return {
      page: parseInt(params.get("page")) || 1,
      size: parseInt(params.get("size")) || 10,
      sort: params.get("sort") || "-published_at",
    };
  });

  const updateUrlParams = useCallback((newParams) => {
    const params = new URLSearchParams(window.location.search);
    Object.entries(newParams).forEach(([key, value]) => {
      params.set(key, value);
    });

    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState({}, "", newUrl);
    setUrlParams((prev) => ({ ...prev, ...newParams }));
  }, []);

  return { urlParams, updateUrlParams };
};

export default useUrlState;
