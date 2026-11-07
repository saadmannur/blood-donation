"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { api } from "@/lib/api";

// GET data load korar hook. reload() dile spinner na dekhiye silently refresh kore.
export function useApi(url) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(Boolean(url));

    const reqId = useRef(0);
    const hasData = useRef(false);

    const load = useCallback(async () => {
        if (!url) return;
        const id = ++reqId.current;

        if (!hasData.current) setLoading(true);
        setError(null);
        setStatus(null);

        try {
            const result = await api(url);
            if (id !== reqId.current) return; // purono response ignore
            hasData.current = true;
            setData(result);
        } catch (e) {
            if (id !== reqId.current) return;
            hasData.current = false;
            setData(null);
            setError(e.message);
            setStatus(e.status ?? null);
        } finally {
            if (id === reqId.current) setLoading(false);
        }
    }, [url]);

    useEffect(() => {
        load();
    }, [load]);

    return { data, error, status, loading, reload: load, setData };
}
