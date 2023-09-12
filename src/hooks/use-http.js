import { useState, useCallback } from "react";
export const useHttp = () => {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = useCallback(async (applyData, requestConfig) => {
    setIsLoading(true);
    setError(false);
    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : "GET",
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
        headers: requestConfig.headers ? requestConfig.headers : {},
      });
      if (!response.ok) throw new Error("sth went wrong");

      const data = await response.json();
      applyData(data);
    } catch (error) {
      setError(true);
    }
    setIsLoading(false);
  }, []);

  return [error, isLoading, fetchData];
};
