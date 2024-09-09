import { differenceInHours } from 'date-fns';

export async function getProfile(symbol) {
    try {
        let cacheTimestamp = localStorage.getItem(
            `marketLens${symbol}ProfileTime`
        );
        let cacheData = localStorage.getItem(`marketLens${symbol}ProfileData`);

        if (cacheTimestamp !== null) {
            cacheTimestamp = JSON.parse(cacheTimestamp);
        }

        if (cacheData !== null) {
            cacheData = JSON.parse(cacheData);
        }

        if (
            cacheData !== null &&
            cacheTimestamp !== null &&
            !dataIsXHoursOld(cacheTimestamp, new Date(), 24)
        ) {
            return cacheData;
        }

        const url = `https://financialmodelingprep.com/api/v3/profile/${symbol}?apikey=${
            import.meta.env.VITE_FMP_API_KEY
        }`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(
                `Unsuccessful getProfile request. Status: ${response.status} - ${response.statusText}`
            );
        }

        const result = await response.json();

        localStorage.setItem(
            `marketLens${symbol}ProfileTime`,
            JSON.stringify(new Date())
        );

        if (result !== null && result !== undefined) {
            localStorage.setItem(
                `marketLens${symbol}ProfileData`,
                JSON.stringify(result)
            );
            return result;
        }
    } catch (error) {
        console.error('Error in getProfile:', error);
        throw error;
    }
}

function dataIsXHoursOld(startTime, endTime, days) {
    const hoursDifference = differenceInHours(endTime, startTime);
    return hoursDifference >= days;
}
