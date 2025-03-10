import {FC, ReactElement} from 'react';
import DisplayResult from './DisplayResult';
import {formatPrettyFloat, formatAsCurrency, formatAsDate} from '../lib/utils';
import { availableCurrencies, Result } from '../lib/types';

type Props = {
    setShowResults: Function,
    calculatedResultData: Result | undefined,
    setCalcResultsData: Function,
}

const LoanCalcResults: FC<Props> = ({setShowResults, calculatedResultData, setCalcResultsData}):ReactElement => {

    return (
    <div className="p-1" data-testid="results-display">
        <div className="flex justify-between">
            <p className="p-2 pl-4 text-lg font-semibold" >
                Your Loan Results
            </p>
            <button className="p-2 text-lg hover:bg-[var(--brand-primary)] cursor-pointer"
                onClick={ () => setShowResults(false)}>
                Results History
            </button>
        </div>
        <div className="w-full flex flex-col gap-2 ml-auto mr-auto px-4 p-4">
        { !calculatedResultData ? <p className='text-gray-50'> No results.<br/> Fill out the form to calculate your results.</p>
            : <>
            <DisplayResult id={"res-daily-interest"} title="Daily Interest (excluding margin)" result={calculatedResultData?.dailyInterest} resultFormatter={() => formatAsCurrency(formatPrettyFloat(calculatedResultData?.dailyInterest.toString()), availableCurrencies[calculatedResultData?.currency].symbol)}/>
            <DisplayResult id={"res-daily-interest-accrued"} title="Daily Interest Accrued" result={calculatedResultData?.dailyInterestAccrued} resultFormatter={() => formatAsCurrency(formatPrettyFloat(calculatedResultData?.dailyInterestAccrued.toString()), availableCurrencies[calculatedResultData?.currency].symbol)} />
            <DisplayResult id={"res-accrual-date"} title="Accrual Date" result={calculatedResultData.accrualDate} resultFormatter={formatAsDate} />
            <DisplayResult id={"res-days-elapsed"} title="Days Elapsed" result={calculatedResultData?.daysElapsed} />
            <DisplayResult id={"res-total-interest"} title="Total Interest" result={calculatedResultData?.totalInterest} resultFormatter={() => formatAsCurrency(formatPrettyFloat(calculatedResultData?.totalInterest.toString()), availableCurrencies[calculatedResultData?.currency].symbol)} />
            {/* <DisplayResult id={"res-total-remaining"} title="Total Loan to Repay" result={new Date("2024-04-01")} resultFormatter={formatAsDate} /> */}
            {/* <DisplayResult id={"res-amount-paid-percent"} title="Percentage Paid" result={10} resultFormatter={formatAsPercentage} /> */}
            </>
            }
        </div>
    </div>
    
    );
    
};

export default LoanCalcResults;
