import qs from 'query-string'

export const formatUrl = (url, pathParams, queryParams) => {
    let filledUrl = url;

    if (!url || typeof url !== 'string') {
        throw new Error(`url ${url} should be a string`)
    }

    if (pathParams && url.includes('/:')) {
        filledUrl = url.replace(/:(\w+)/ig, (_, key) => pathParams[key])
    }

    if (queryParams) {
        filledUrl = `${filledUrl}?${qs.stringify(queryParams)}`
    }

    return filledUrl
}

export const trimUrlSlash = (url) => url.replace(/([^:]\/)\/+/g, "$1")

export const getValidUrl = (url = "") => {
    let newUrl = window.decodeURIComponent(url);

    newUrl = newUrl.trim().replace(/\s/g, "");

    if (newUrl === "" || ['undefined', 'null'].includes(newUrl)) {
        return ""
    }

    if (/^(:\/\/)/.test(newUrl)) {
        return `http${newUrl}`;
    }

    if (!/^(f|ht)tps?:\/\//i.test(newUrl)) {
        return `http://${newUrl}`;
    }

    return newUrl;
};

export const parseJwtPayload = (token) => {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (error) {
        return null;
    }
};
