import { useEffect, useState } from 'react';

// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

export default function App() {
  const [value, setValue] = useState('');
  const [cur1, setCur1] = useState('USD');
  const [cur2, setCur2] = useState('USD');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    function () {
      async function convert() {
        setIsLoading(true);
        const response = await fetch(
          `https://api.frankfurter.app/latest?amount=${value}&from=${cur1}&to=${cur2}`
        );
        const data = await response.json();
        if (data.rates) {
          const conv = data.rates[cur2];
          setResult(conv.toFixed(2));
        }
        setIsLoading(false);
        // console.log(data?.rates[cur1]);
        // if (data?.rates[cur1]) setResult(data?.rates[cur1]);
      }
      if (cur1 === cur2) return setResult(value);
      convert();
    },
    [value, cur1, cur2]
  );
  return (
    <div>
      <input
        value={value}
        type='text'
        onChange={(e) => {
          const res = e.target.value;
          if (res.match(/[1-9]+/)) setValue(Number(res));
          else {
            setValue('');
          }
        }}
        disabled={isLoading}
      />
      <CurrencyChoice
        key={Date.now()}
        value={cur1}
        onSetCurrency={setCur1}
        isLoading={isLoading}
      />
      <CurrencyChoice
        key={Date.now() + 1}
        value={cur2}
        onSetCurrency={setCur2}
        isLoading={isLoading}
      />
      <p>{result ? `${result} ${cur2}` : 'enter an amount'}</p>
    </div>
  );
}

function CurrencyChoice({ value, onSetCurrency, isLoading }) {
  return (
    <select
      value={value}
      onChange={(e) => onSetCurrency(e.target.value)}
      disabled={isLoading}
    >
      <option value='USD'>USD</option>
      <option value='EUR'>EUR</option>
      <option value='CAD'>CAD</option>
      <option value='INR'>INR</option>
    </select>
  );
}
