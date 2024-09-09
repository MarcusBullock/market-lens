import { useParams } from 'react-router-dom';
import { getProfile } from '../services/stocksApi';
import styles from './Stock.module.scss';
import { useQuery } from '@tanstack/react-query';
import Loading from '../components/generic/Loading';
import StockPriceChart from '../components/stocks/stock/StockPriceChart';
import classNames from 'classnames';
import Metrics from '../components/stocks/stock/Metrics';

function Stock() {
    const { symbol } = useParams();

    const {
        data: profileData,
        isLoading: isProfileLoading,
        isError: isProfileError,
    } = useQuery({
        queryKey: ['getProfile'],
        queryFn: () => getProfile(symbol),
    });

    if (isProfileLoading) {
        return (
            <div className={styles.loading}>
                <Loading text="Loading all global stock data..." />
            </div>
        );
    }

    if (
        isProfileError ||
        profileData == null ||
        (profileData?.length < 1 ?? true)
    ) {
        return (
            <div>
                Sorry I&apos;m on a free API plan and can only do American
                stocks!
            </div>
        );
    }

    const {
        price,
        volAvg,
        changes,
        mktCap,
        range,
        companyName,
        currency,
        exchange,
        exchangeShortName,
        industry,
        website,
        description,
        ceo,
        sector,
        fullTimeEmployees,
        city,
        image,
        isEtf,
        isActivelyTrading,
        isAdr,
        isFund,
    } = profileData[0];

    const previousPrice = price - changes;
    const changesPercent = (changes / previousPrice) * 100;
    // [
    //     {
    //       "symbol": "7129.T",
    //       "price": 1175,
    //       "beta": 0.081,
    //       "volAvg": 5107,
    //       "mktCap": 3039982325,
    //       "lastDiv": 30,
    //       "range": "985.0-1246.0",
    //       "changes": -1,
    //       "companyName": "Miahelsa Holdings Corporation",
    //       "currency": "JPY",
    //       "cik": null,
    //       "isin": "JP3880350008",
    //       "cusip": null,
    //       "exchange": "Tokyo",
    //       "exchangeShortName": "JPX",
    //       "industry": "Healthcare",
    //       "website": "https://www.merhalsa-hd.jp",
    //       "description": "Miahelsa Holdings Corporation engages in the operation of pharmaceutical, childcare, and nursing care businesses in Japan. The company operates dispensing pharmacies and provides home infusion therapy services. It also provides various nursing care services comprising in home care support, home-visit care, outpatient care, cohabitation care for dementia, home-visit nursing, visit bathing, small-scale multifunctional home care, support center, elderly welfare center, elderly with services homes for the elderly, and paid nursing homes with nursing care. In addition, the company operates health up center, welfare schools, nursery schools, and after school clubs. Further, the company is involved in the wholesale of food ingredients for school lunch; and provision of meal delivery services. Miahelsa Holdings Corporation was founded in 1966 and is headquartered in Tokyo, Japan.",
    //       "ceo": "Mr. Isamu  Aoki",
    //       "sector": "Healthcare",
    //       "country": "JP",
    //       "fullTimeEmployees": "1741",
    //       "phone": "81 3 3341 7205",
    //       "address": "3-19 Ichigaya Nakanocho",
    //       "city": "Tokyo",
    //       "state": null,
    //       "zip": "162-0054",
    //       "dcfDiff": null,
    //       "dcf": 0,
    //       "image": "https://financialmodelingprep.com/image-stock/7129.T.png",
    //       "ipoDate": "",
    //       "defaultImage": true,
    //       "isEtf": false,
    //       "isActivelyTrading": true,
    //       "isAdr": false,
    //       "isFund": false
    //     }
    //   ]

    return (
        <div className={styles.stock}>
            <h1>
                {companyName} Common Stock ({symbol})
            </h1>
            <div className={styles.headerRow}>
                <span className={styles.headerPrice}>
                    {price.toLocaleString()}
                </span>
                <span
                    className={classNames(
                        styles.headerChange,
                        changes >= 0 ? styles.green : styles.red
                    )}
                >
                    {changes} ({changesPercent.toFixed(2)}%)
                </span>
            </div>
            <StockPriceChart />
            <Metrics
                price={price}
                volAvg={volAvg}
                mktCap={mktCap}
                range={range}
            />
            <div>{description}</div>
        </div>
    );
}

export default Stock;
