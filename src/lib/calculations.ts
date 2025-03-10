import { CurrencyID, OriginalLoanInputs, Result } from './types';
import { percentageToDecimal } from './utils';


/**
 * calculate simple interest: the interest paid or received over a certain period (term) is a fixed % of the principal (original amount) borrowed/lent
 * @param {number} principle - principle amount that was borrowed or lent
 * @param rate - interest rate as decimal
 * @param term - term of loan in years
 * @returns {number}
 */
export const calculateSimpleInterest = (principle: number, rate: number, term: number): number  => {
    return principle * rate * term;
}

// year period can differ with loan type?
export const dailySimpleInterest = (totalInterestForPeriod: number, yearPeriod = 365 ) => {
    return totalInterestForPeriod / yearPeriod;
};

export const dailySimpleInterestDue = (dailyInterestRate: number, daysElapsed: number ) => {
    return dailyInterestRate * daysElapsed;
};

const generateTotalDaysInPeriod = (startDate: Date, endDate: Date = new Date()) => {
    const timeDiff: number  = (new Date(endDate).getTime() - new Date(startDate).getTime());
    const daysDiff = timeDiff / (1000 * 60 * 60 * 24);
    return Math.round(daysDiff);
};

interface DailyBreakdown {
    idxDay: number;
    date: number; //utc
    interestToDate: number;
}

export const calculateResultsPerDay = (startDate: Date, totalLoanPeriod: number, simpleInterestAmount: number): DailyBreakdown[] => {
    //loop through days in period
    // calculate simple interest
    // return interest, int with margin, date 
    const output = [];
    const dailyInterest = dailySimpleInterest(simpleInterestAmount);
    const dayInMilliSec = 86400000;

    for(let i = 0; i < totalLoanPeriod; i++) {
        //console.debug("Day: ", i+1, "\nDate: ", new Date(startDate).getTime() - (dayInMilliSec * i), "\nInterest Accrued", dailySimpleInterestDue(dailyInterest, i), "\nInterest Accrued + margin");
        output.push({idxDay: i+1, date: new Date(startDate).getTime() - (dayInMilliSec * i), interestToDate: dailySimpleInterestDue(dailyInterest, i+1)})
    }

    return output;
}

export const runCalculation = (inputData: OriginalLoanInputs): Result | undefined => {    
    const loanStartDate = new Date(inputData.startDate as number);
    const loanEndDate = new Date(inputData.endDate as number);
    const today = new Date(Date.now());

    const totalDays = generateTotalDaysInPeriod(loanStartDate, loanEndDate);

    if(!totalDays) return undefined;

    // Calculate Days Elapsed:
    const daysElapsed = generateTotalDaysInPeriod(new Date(inputData.startDate as number));

    const simpleInterestAmount = calculateSimpleInterest(inputData?.loanAmount, percentageToDecimal(inputData?.baseInterestRate as number), totalDays );
    const simpleInterestPerDay = dailySimpleInterest(simpleInterestAmount);
    const simpleInterestAccruedToDate = dailySimpleInterestDue(simpleInterestPerDay, daysElapsed)

    //TODO Data output is suppose to be per day
    const resultPerDay = calculateResultsPerDay(inputData.startDate as Date, totalDays, simpleInterestAmount);
    console.info("resultsPerDay", resultPerDay);

    const dailyInterestExl = simpleInterestPerDay; 
    if(!dailyInterestExl && dailyInterestExl !=0) return undefined;

    const dailyInterestAccrued = simpleInterestAccruedToDate;
    if(!dailyInterestAccrued && dailyInterestAccrued !=0) return undefined;

    const totalInterestFullPeriod = simpleInterestAmount;
    if(!totalInterestFullPeriod && dailyInterestExl !=0) return undefined;



    return {
        dailyInterest: dailyInterestExl,
        dailyInterestAccrued: dailyInterestAccrued,
        accrualDate: today, //TODO calculate this date?  Or is this an input var?
        daysElapsed: daysElapsed,
        totalInterest: totalInterestFullPeriod,
        currency: inputData?.currency as CurrencyID,
    };
}

