import { differenceInHours } from 'date-fns';

export const getTopGainers = async () => {
    try {
        let cacheTimestamp = localStorage.getItem('marketLensTopGainersTime');
        let cacheData = localStorage.getItem('marketLensTopGainersData');

        if (cacheTimestamp !== null) {
            cacheTimestamp = JSON.parse(cacheTimestamp);
        }

        if (cacheData !== null) {
            cacheData = JSON.parse(cacheData);
        }

        if (
            cacheData !== null &&
            cacheTimestamp !== null &&
            !dataIsADayOld(cacheTimestamp, new Date())
        ) {
            return cacheData;
        }

        const url = `https://financialmodelingprep.com/api/v3/stock_market/gainers?apikey=${
            import.meta.env.VITE_FMP_API_KEY
        }`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(
                `Unsuccessful getTopGainers request. Status: ${response.status} - ${response.statusText}`
            );
        }

        const result = await response.json();

        localStorage.setItem(
            'marketLensTopGainersTime',
            JSON.stringify(new Date())
        );

        if (result !== null && result !== undefined) {
            localStorage.setItem(
                'marketLensTopGainersData',
                JSON.stringify(result)
            );
        }

        return result.data;
    } catch (error) {
        console.error('Error in getTopGainers:', error);
        throw error;
    }
};

export const getTopLosers = async () => {
    try {
        let cacheTimestamp = localStorage.getItem('marketLensTopLosersTime');
        let cacheData = localStorage.getItem('marketLensTopLosersData');

        if (cacheTimestamp !== null) {
            cacheTimestamp = JSON.parse(cacheTimestamp);
        }

        if (cacheData !== null) {
            cacheData = JSON.parse(cacheData);
        }

        if (
            cacheData !== null &&
            cacheTimestamp !== null &&
            !dataIsADayOld(cacheTimestamp, new Date())
        ) {
            return cacheData;
        }

        const url = `https://financialmodelingprep.com/api/v3/stock_market/losers?apikey=${
            import.meta.env.VITE_FMP_API_KEY
        }`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(
                `Unsuccessful getTopLosers request. Status: ${response.status} - ${response.statusText}`
            );
        }

        const result = await response.json();

        localStorage.setItem(
            'marketLensTopLosersTime',
            JSON.stringify(new Date())
        );

        if (result !== null && result !== undefined) {
            localStorage.setItem(
                'marketLensTopLosersData',
                JSON.stringify(result)
            );
        }

        return result.data;
    } catch (error) {
        console.error('Error in getTopLosers:', error);
        throw error;
    }
};

export const getIndexCarouselData = async () => {
    // TODO - find a free API that gets some actual data as this is hard to find for free. For now I am faking this data.
    return [
        {
            index: 'FTSE 100',
            change: -12.79,
            changePercent: -0.15,
            values: [8272.11, 8269.8, 8311.09, 8410.61, 8363.84],
        },
        {
            index: 'S&P 500 INDEX',
            change: 56.44,
            changePercent: 1.01,
            values: [5290.51, 5309.09, 5310.58, 5321.92, 5648.4],
        },
        {
            index: 'Dow Jones',
            change: 228.03,
            changePercent: 0.55,
            values: [40505.69, 41161.43, 41465.15, 41478.27, 41563.08],
        },
    ];
};

function dataIsADayOld(startTime, endTime) {
    const hoursDifference = differenceInHours(endTime, startTime);
    return hoursDifference >= 24;
}
