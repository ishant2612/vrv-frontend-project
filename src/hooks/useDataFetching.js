import { useState, useEffect, useCallback } from 'react';

export const useDataFetching = (fetchFunction, dependencies = []) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const loadData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await fetchFunction();
            setData(result);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [fetchFunction]);

    useEffect(() => {
        loadData();
    }, [...dependencies]);

    return { data, loading, error, refetch: loadData };
}; 