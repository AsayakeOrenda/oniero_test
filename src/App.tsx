import { useState, useEffect } from 'react';
import LoanUserInputs from './components/LoanInputs.tsx'
import LoanCalcResults from './components/LoanCalculationResults.tsx'
import LoanCalcHistory from './components/LoanCalculationHistory.tsx'
import { runCalculation } from './lib/calculations.ts';
import { OriginalLoanInputs, Result } from './lib/types.ts';

function App() {

  let initInput: OriginalLoanInputs = {
    loanAmount: 1000,
    currency: "GBP",
    startDate: Date.now(),
    endDate: '',
    baseInterestRate: 0,
    margin: 0,
  };

  let initOutput: Result | undefined;
  
  const [inputResultData, setResultData] = useState(initInput || undefined);
  const [showResults, setShowResults] = useState(true);
  const [inputUIMessage, setinputUIMessage] = useState('');
  const [calculatedResultData, setCalcResultsData] = useState(initOutput);


  //? Could await result data & history here if user-data existed
  useEffect(() => {
    let calculatedDataset: Result | undefined;
    if(!inputUIMessage) { 
      calculatedDataset = runCalculation(inputResultData);
      setCalcResultsData(calculatedDataset);
    }

  }, [inputResultData]);


  return (
    <div className='mt-4 ml-auto mr-auto mb-[15vh] max-w-11/12 md:p-2'>
      <h1 className='text-3xl mb-[5vh] text-[var(--brand-secondary)]'>Loan Calculator</h1>
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-2">
        <LoanUserInputs loanAmount={inputResultData.loanAmount}  setResultData={setResultData}  setinputUIMessage={setinputUIMessage} inputUIMessage={inputUIMessage} setShowResults={setShowResults}/>

        <div className='bg-[var(--brand-secondary-90)] rounded-xs text-white'>
        { showResults ? <LoanCalcResults setShowResults={setShowResults} calculatedResultData={calculatedResultData} setCalcResultsData={setCalcResultsData}/>
          : <LoanCalcHistory title="Select a previous calculation from the list below" setShowResults={setShowResults}/>
        }
        </div>

      </div>
    </div>
  );
}

export default App;
