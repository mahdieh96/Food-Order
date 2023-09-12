import { useState, useCallback } from "react";
export const useHttp = () => {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = useCallback(async (applyData, requestConfig) => {
    setIsLoading(true);

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
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  return [error, isLoading, fetchData];
};
