import { subYears } from 'date-fns';

export const CurrencyData = [
    {
        label: '1 GBP £',
        eur: 1.1863,
        jpy: 189.43,
        gbp: 1.0,
        usd: 1.315,
    },
    {
        label: '1 EUR €',
        eur: 1.0,
        jpy: 159.65,
        gbp: 0.8427,
        usd: 1.1082,
    },
    {
        label: '1 USD $',
        eur: 0.9021,
        jpy: 144.05,
        gbp: 0.7606,
        usd: 1.0,
    },
    {
        label: '1 AUD A$',
        eur: 0.6065,
        jpy: 96.84,
        gbp: 0.5112,
        usd: 0.6723,
    },
    {
        label: '1 CAD C$',
        eur: 0.5123,
        jpy: 101.57,
        gbp: 0.7811,
        usd: 0.5199,
    },
    {
        label: '1 CHF Rp.',
        eur: 0.8995,
        jpy: 197.17,
        gbp: 1.1306,
        usd: 1.6518,
    },
    {
        label: '1 INR R',
        eur: 0.0147,
        jpy: 0.1898,
        gbp: 0.0101,
        usd: 0.0142,
    },
];

export const CommoditiesData = [
    {
        commodity: 'Coffee (Arabica)',
        currencySymbol: 'USc',
        lastPrice: 246.1,
        todayChange: -0.55,
        todayChangePercent: -0.22,
    },
    {
        commodity: 'Natural Gas',
        currencySymbol: 'USD',
        lastPrice: 2.15,
        todayChange: -0.048,
        todayChangePercent: -2.18,
    },
    {
        commodity: 'Corn',
        currencySymbol: 'USc',
        lastPrice: 391.25,
        todayChange: 6,
        todayChangePercent: 1.56,
    },
    {
        commodity: 'Brent Crude Oil',
        currencySymbol: 'USD',
        lastPrice: 72.83,
        todayChange: -0.89,
        todayChangePercent: -1.21,
    },
    {
        commodity: 'COMEX Gold',
        currencySymbol: 'USD',
        lastPrice: 2483.5,
        todayChange: -3.6,
        todayChangePercent: -0.14,
    },
    {
        commodity: 'Soybeans',
        currencySymbol: 'USc',
        lastPrice: 0.95,
        todayChange: 0.0031,
        todayChangePercent: 1.3,
    },
];

export const StockPriceData = generateTrendBasedStockData(
    subYears(new Date(), 5),
    new Date()
);

function generateTrendBasedStockData(startDate, endDate) {
    let currentDate = new Date(startDate);
    const data = [];
    let lastClosePrice = 100; // Starting price

    while (currentDate <= new Date(endDate)) {
        // 70% chance of uptrend, 30% chance of downtrend
        const trendDirection = Math.random() < 0.51 ? 1 : -1;
        const volatility = +(Math.random() * 5).toFixed(2); // Random volatility between 0 and 5
        const open = +(
            lastClosePrice +
            (Math.random() * 2 - 1) * volatility
        ).toFixed(2); // Slight variation from last close
        const close = +(
            open +
            trendDirection * (Math.random() * volatility)
        ).toFixed(2);
        const high = Math.max(open, close) + +(Math.random() * 2).toFixed(2); // High above open/close
        const low = Math.min(open, close) - +(Math.random() * 2).toFixed(2); // Low below open/close
        const volume = Math.floor(Math.random() * (1000000 - 100000) + 100000); // Random volume

        data.push({
            date: currentDate.toISOString().split('T')[0],
            open,
            close,
            low: +low.toFixed(2),
            high: +high.toFixed(2),
            volume,
            price: +((open + close) / 2).toFixed(2),
        });

        lastClosePrice = close; // Set the next day's starting point based on today's close

        currentDate.setDate(currentDate.getDate() + 1);
    }

    return data;
}
