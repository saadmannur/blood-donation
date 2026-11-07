export class ApiError extends Error {
    constructor(message, status) {
        super(message);
        this.name = "ApiError";
        this.status = status;
    }
}

// Shob API call ei function diye jabe. Error hole ApiError throw kore (status shoho).
export async function api(url, { method = "GET", body } = {}) {
    const res = await fetch(url, {
        method,
        headers: body ? { "Content-Type": "application/json" } : undefined,
        body: body ? JSON.stringify(body) : undefined,
        credentials: "same-origin",
        cache: "no-store",
    });

    let data = null;
    try {
        data = await res.json();
    } catch {
        // empty body
    }

    if (!res.ok) {
        throw new ApiError(data?.message || data?.error || `Request failed (${res.status})`, res.status);
    }
    return data;
}

export const asArray = (value) => (Array.isArray(value) ? value : []);
