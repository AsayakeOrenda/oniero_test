import {FC, ReactElement} from 'react';
import { ResultHistory, availableCurrencies } from '../lib/types';


type Props = {
    title: string,
    setShowResults: Function,
    resultsHistory?: ResultHistory[],
}

const LoanCalcHistory: FC<Props> = ({title, resultsHistory}):ReactElement => {

    //! TEST DATA
    resultsHistory = [{
        result: {
            dailyInterest: 0,
            dailyInterestAccrued: 0,
            accrualDate: undefined,
            daysElapsed: 0,
            totalInterest: 0,
            currency: "GBP",
        },
        input: {
            loanAmount: 1000,
            currency: "GBP"
        },
    },
    {
        result: {
            dailyInterest: 0,
            dailyInterestAccrued: 0,
            accrualDate: undefined,
            daysElapsed: 0,
            totalInterest: 0,
            currency: "USD"
        },
        input: {
            loanAmount: 2000,
            currency: "USD"
        },
    }
];

const getCurrencySymbol = (iso4217: string | undefined): string => {
    let symbol = ''
    switch (iso4217) {
        case "GBP":
            symbol = availableCurrencies.GBP.symbol;
        break;
        case "USD":
            symbol = availableCurrencies.USD.symbol;
            break;
      default:
        '';
        break;
    }
    return symbol
}
    return (
    <div className="w-full flex flex-col p-2 ml-auto mr-auto lg:max-w-[95%] gap-2]" data-testid="results-history">
        <p className="pb-2 text-brand-primary text-lg" >
        {title}
        </p>
        <div>
            <h2 className='font-semibold mb-2'>Results</h2>
            <div className='flex flex-col gap-2' key="resultsHistory"> 
            { resultsHistory?.length ? 
                resultsHistory.map( (hist, idx) => {
                    // TODO add onclick - display history - fill in input data and show calculation results
                    return (<button className='rounded-sm bg-gray-50 text-black font-semibold text-left px-4 py-3 cursor-pointer hover:shadow hover:bg-white'
                                onClick={() => console.log("Display Result: ", hist)}
                                key={`resultsHistory-${idx}`} >
                            <span>{idx}: { getCurrencySymbol(hist?.input?.currency)}{hist?.input?.loanAmount}</span>
                        </button>)
                    })
                : <p>No result history available</p>
            }
            </div>
        </div>
        <div className='mt-16'> This part is not finished. It shows dummy data only.</div>
    </div>
    );
};

export default LoanCalcHistory;
