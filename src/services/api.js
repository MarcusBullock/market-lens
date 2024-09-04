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
            !dataIsXHoursOld(cacheTimestamp, new Date(), 24)
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
            return result.data;
        }
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
            !dataIsXHoursOld(cacheTimestamp, new Date(), 24)
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
            return result.data;
        }
    } catch (error) {
        console.error('Error in getTopLosers:', error);
        throw error;
    }
};

export const getIndexCarouselData = async () => {
    // TODO - find a free API that gets some actual data as this is hard to find for free. For now I am faking this data.
    return [
        {
            index: 'FTSE 100 Index',
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
        {
            index: 'NASDAQ NMS COMPOSITE INDEX',
            change: 197.19,
            changePercent: 1.13,
            values: [12152.16, 15792.99, 14346.62, 15713.12, 17713.62],
        },
        {
            index: 'Bloomberg Commodity Index',
            change: -0.917,
            changePercent: -0.95,
            values: [91.11, 92.22, 93.33, 94.14, 95.17],
        },
        {
            index: 'NYSE COMPOSITE',
            change: 142.69,
            changePercent: 0.75,
            values: [18292.88, 18882.11, 19001.91, 19200.01, 19292.23],
        },
        {
            index: 'US 10 year Treasury',
            change: -0.004,
            changePercent: -0.09,
            values: [2.99, 3.31, 3.5, 3.67, 3.91],
        },
        {
            index: 'UK Pound Sterling/US Dollar FX Spot Rate',
            change: -0.003,
            changePercent: -0.22,
            values: [1.1, 1.2, 1.2125, 1.2122, 1.3122],
        },
        {
            index: 'FTSE 250 MID INDEX',
            change: -58.15,
            changePercent: -0.28,
            values: [19992.88, 20822.46, 20867.34, 20900.09, 20922.36],
        },
        {
            index: 'DEUTSCHE BORSE DAX INDEX',
            change: -432.91,
            changePercent: -2.29,
            values: [18457.31, 18359.11, 18291.29, 18393.33, 18497.94],
        },
        {
            index: 'CAC 40 INDEX',
            change: 5.47,
            changePercent: 0.2,
            values: [7666.88, 7636.46, 7616.34, 7636.09, 7646.36],
        },
        {
            index: 'INDIA INDEX SVC',
            change: -58.15,
            changePercent: -0.28,
            values: [19992.88, 20822.46, 20867.34, 20900.09, 20922.36],
        },
        {
            index: 'CNX Nifty Index',
            change: 42.8,
            changePercent: 0.17,
            values: [25218.81, 25228.13, 25648.64, 25681.11, 25278.77],
        },
        {
            index: 'SHANGHAI SE COMPOSITE INDEX',
            change: -199.15,
            changePercent: -0.29,
            values: [2934.44, 2902.23, 2911.11, 2902.18, 2802.98],
        },
        {
            index: 'Hang Seng',
            change: -40.48,
            changePercent: -0.23,
            values: [17999.49, 17872.49, 17879.49, 17719.49, 17651.49],
        },
    ];
};

export async function getNews() {
    try {
        let cacheTimestamp = localStorage.getItem('marketLensNewsTime');
        let cacheData = localStorage.getItem('marketLensNewsData');

        if (cacheTimestamp !== null) {
            cacheTimestamp = JSON.parse(cacheTimestamp);
        }

        if (cacheData !== null) {
            cacheData = JSON.parse(cacheData);
        }

        if (
            cacheData !== null &&
            cacheTimestamp !== null &&
            !dataIsXHoursOld(cacheTimestamp, new Date(), 48)
        ) {
            return cacheData;
        }

        const url = `https://financialmodelingprep.com/api/v3/fmp/articles?page=0&size=5&apikey=${
            import.meta.env.VITE_FMP_API_KEY
        }`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(
                `Unsuccessful getNews request. Status: ${response.status} - ${response.statusText}`
            );
        }

        const result = await response.json();

        localStorage.setItem('marketLensNewsTime', JSON.stringify(new Date()));

        if (result !== null && result !== undefined) {
            localStorage.setItem('marketLensNewsData', JSON.stringify(result));
            return result.slice(0, 10);
        }
    } catch (error) {
        console.error('Error in getTopLosers:', error);
        throw error;
    }
}

export async function getSectorPerformance() {
    try {
        let cacheTimestamp = localStorage.getItem(
            'marketLensSectorPerformanceTime'
        );
        let cacheData = localStorage.getItem('marketLensSectorPerformanceData');

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

        const url = `https://financialmodelingprep.com/api/v3/sectors-performance?apikey=${
            import.meta.env.VITE_FMP_API_KEY
        }`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(
                `Unsuccessful getSectorPerformance request. Status: ${response.status} - ${response.statusText}`
            );
        }

        const result = await response.json();

        localStorage.setItem(
            'marketLensSectorPerformanceTime',
            JSON.stringify(new Date())
        );

        if (result !== null && result !== undefined) {
            localStorage.setItem(
                'marketLensSectorPerformanceData',
                JSON.stringify(result)
            );
            return result;
        }
    } catch (error) {
        console.error('Error in getSectorPerformance:', error);
        throw error;
    }
}

function dataIsXHoursOld(startTime, endTime, days) {
    const hoursDifference = differenceInHours(endTime, startTime);
    return hoursDifference >= days;
}
