import {FC, ReactElement, useState, useEffect} from 'react';
import { availableCurrencies, OriginalLoanInputs } from '../lib/types'

type Props =  OriginalLoanInputs & {
    setResultData: Function;
    inputUIMessage: string;
    setinputUIMessage: Function;
    setShowResults: Function;
}

//? all values must be passed in as props (but can be optional) as will need to load results histories.
//? Pass in sensible defaults where appropriate to aid usability 

const LoanInputs: FC<Props> = ({setResultData, inputUIMessage, setinputUIMessage, setShowResults, loanAmount, currency, startDate, endDate, baseInterestRate, margin}):ReactElement => {

    const [inputAmount, setAmount] = useState(loanAmount || 0);
    const [inputCurrency, setCurrency] = useState(currency || "GBP");
    const [currencySymbol, setCurrencySymbol] = useState("£");
    const [inputStartDate, setStartDate] = useState(startDate || Date.now() || '');
    const [inputEndDate, setEndDate] = useState(endDate || '');
    const [inputBaseInterestRate, setBaseInterestRate] = useState(baseInterestRate?.toString() || "0.00");
    const [inputMargin, setMargin] = useState(margin?.toString() || "0.00");

    useEffect(() => {
        switch (inputCurrency) {
            case "GBP":
                setCurrencySymbol(availableCurrencies.GBP.symbol);
            break;
            case "USD":
                setCurrencySymbol(availableCurrencies.USD.symbol);
                break;
          default:
            setCurrencySymbol(availableCurrencies.USD.symbol);
            break;
        }
      }, [inputCurrency]);


    const calculateResultsHandler = () => {
        // console.debug("inputs", loanAmount, currency, startDate, endDate, baseInterestRate, margin);
        // console.debug("outputs", inputAmount, inputCurrency, inputStartDate, inputEndDate, inputBaseInterestRate, inputMargin);
        let message = '';
        if(!(!!inputAmount && !!inputCurrency && !!inputStartDate && !!inputEndDate && !!parseFloat(inputBaseInterestRate))) {
           message =  "Please fill out all the inputs";

        }
        setinputUIMessage(message);
        // pass data out here
        // allows flex of use - ie this could be call to endpoint (eg to save results) not just update ui client side
        setResultData(() => ({
            loanAmount: inputAmount,
            currency: inputCurrency,
            startDate: inputStartDate,
            endDate: inputEndDate,
            baseInterestRate: inputBaseInterestRate,
            margin: inputMargin,
        }));
    }

    return (
    <div className="flex flex-col gap-4" data-testid="loan-input-container">
        <p className="text-lg pb-2" >
        Enter your loan details below
        </p>
        <div>
            <p className='input__label'>Loan Amount</p>
            <div className="flex gap-2">
                <select className="flex-[0_1_7rem] md:flex-[0_1_5rem]" onChange={(e) => setCurrency(e.target.value)} value={inputCurrency}>
                    <option value="GBP">GBP</option>
                    <option value="USD">USD</option>
                </select>
                {/*TODO add $/£ sign dependant on selection */}
                <div className='w-full md:flex-[0_1_9rem] relative flex items-center'>
                    <p className='p-1'>{currencySymbol}</p>
                    <input
                        autoFocus
                        value={inputAmount}
                        onChange={(e) => {
                            if(!Number.isNaN(+e.target.value)) setAmount(+e.target.value);
                        }}
                        // onBlur={() => console.log('blurred')}
                        className=""
                        inputMode="numeric"
                        pattern="[0-9]"
                        size={5}
                        dir="auto"
                        autoComplete="off"
                        autoCapitalize="off"
                        autoCorrect="off"
                    />
                </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6 lg:gap-2 max-w-lg">
            <label htmlFor="date-start" className='input__label'>Start Date
                <input type="date" id="date-start" name="date-start"
                    value={inputStartDate ? new Date(inputStartDate).toISOString().substring(0,10) : ''}
                    onChange={(e) => {
                        // Allow html5 clear to work
                        e.target.value ? setStartDate(new Date(e.target.value)) : setStartDate("");
                    }} />
            </label>
            <label htmlFor="date-end" className='input__label'>End Date
                <input type="date" id="date-end" name="date-end"
                    value={inputEndDate ? new Date(inputEndDate).toISOString().substring(0,10) : ''}
                    onChange={(e) => {
                        // Allow html5 clear to work
                        e.target.value ? setEndDate(new Date(e.target.value)) : setEndDate("");
                    }} />
            </label>
        </div>
        <div className='grid grid-cols-2 gap-6 lg:gap-2 max-w-lg'>
            <label htmlFor="base-rate" className='input__label relative'>Base Interest Rate
                <input type="number" id="base-rate" name="base-rate"
                    value={inputBaseInterestRate}
                    step={0.01}
                    min={0}
                    max={100}
                    maxLength={3}
                    onChange={(e) => {
                        if(e.target.value?.length < 6 && +e.target.value <= 100) setBaseInterestRate(e.target.value);

                    }} />
                    <span className='input__deco--percent'>%</span>
            </label>
            <label htmlFor="margin" className='input__label relative'>Margin
                <input className='w-full' type="number" id="margin" name="margin"
                    value={inputMargin}
                    step={0.01}
                    min={0}
                    max={100}
                    maxLength={3}
                    onChange={(e) => {
                        if(e.target.value?.length < 6 && +e.target.value <= 100) setMargin(e.target.value);

                    }} />
                    <span className='input__deco--percent'>%</span>
            </label>
        </div>
        <div className='min-h-6 mt-4'>
            { inputUIMessage ? 
                <p className='text-red-500'>{inputUIMessage}</p>
                
                : <></>
            }
        </div>
        <button
            className="bg-[var(--brand-primary)] cursor-pointer hover:opacity-80 text-white font-semibold p-4 md:max-w-2xs"
            onClick={() => {
                calculateResultsHandler();
                setShowResults(true);
            }}>
            Calculate
        </button>
    </div>
    );
};


export default LoanInputs;
