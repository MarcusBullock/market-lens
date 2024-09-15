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
            const history = generateFakeStockHistory(cacheData[0].price);
            return [cacheData, history];
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
            const history = generateFakeStockHistory(result.price);
            return [result, history];
        }
    } catch (error) {
        console.error('Error in getProfile:', error);
        throw error;
    }
}
export function generateFakeStockHistory(endPrice) {
    if (endPrice !== null && endPrice !== undefined) {
        const data = [];
        const numberOfDays = 365 * 5; // 5 years
        const startDate = new Date();
        const endDate = new Date(
            startDate.getTime() - numberOfDays * 24 * 60 * 60 * 1000
        ); // Date 5 years ago

        // Initialize starting price close to the endPrice
        let currentPrice = Math.max(
            endPrice * 0.5 + Math.random() * (endPrice * 0.5),
            1
        );

        for (let i = 0; i < numberOfDays; i++) {
            const open = currentPrice;
            // Introduce smaller, realistic daily changes
            const randomChange = (Math.random() - 0.5) * 0.2; // Smaller random change between -0.1 and 0.1

            // Ensure the price never goes below 0
            currentPrice = Math.max(currentPrice + randomChange, 0.01);

            const close = currentPrice;
            const high = Math.max(open, close) + Math.random() * 0.1; // Randomly higher than both open and close, but smaller range
            const low = Math.max(
                Math.min(open, close) - Math.random() * 0.1,
                0.01
            ); // Randomly lower than both, but never below 0.01
            const volume = Math.floor(Math.random() * 10000) + 1000; // Random volume between 1000 and 11000

            data.push({
                open,
                close,
                high,
                low,
                price: close,
                volume,
                date: new Date(
                    endDate.getTime() + i * 24 * 60 * 60 * 1000
                ).toISOString(),
            });
        }

        // Adjust the final day's data to end closer to the endPrice
        const lastDay = new Date(
            endDate.getTime() + (numberOfDays - 1) * 24 * 60 * 60 * 1000
        );
        data.push({
            open: currentPrice,
            close: endPrice,
            high: Math.max(currentPrice, endPrice) + Math.random() * 0.1,
            low: Math.min(currentPrice, endPrice) - Math.random() * 0.1,
            price: endPrice,
            volume: Math.floor(Math.random() * 10000) + 1000,
            date: lastDay.toISOString(),
        });

        return data;
    }
}

function dataIsXHoursOld(startTime, endTime, days) {
    const hoursDifference = differenceInHours(endTime, startTime);
    return hoursDifference >= days;
}
