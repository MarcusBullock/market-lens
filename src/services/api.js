export const getTopGainers = async () => {
    const url = `${import.meta.env.VITE_FMP_API_GAINERS_ENDPOINT}apikey=${
        import.meta.env.VITE_FMP_API_KEY
    }`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(
            `Unsuccessful API request. Status: ${response.status} - ${response.statusText}`
        );
    }

    return response.json();
};
