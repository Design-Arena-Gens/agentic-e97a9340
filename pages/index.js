import { useState } from 'react';
import Head from 'next/head';

export default function HesapMakinesi() {
  const [display, setDisplay] = useState('0');
  const [prevValue, setPrevValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputDigit = (digit) => {
    if (waitingForOperand) {
      setDisplay(String(digit));
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? String(digit) : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setPrevValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const performOperation = (nextOperation) => {
    const inputValue = parseFloat(display);

    if (prevValue === null) {
      setPrevValue(inputValue);
    } else if (operation) {
      const currentValue = prevValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPrevValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue, secondValue, operation) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        return firstValue / secondValue;
      case '=':
        return secondValue;
      default:
        return secondValue;
    }
  };

  const toggleSign = () => {
    const value = parseFloat(display);
    setDisplay(String(value * -1));
  };

  const inputPercent = () => {
    const value = parseFloat(display);
    setDisplay(String(value / 100));
  };

  return (
    <>
      <Head>
        <title>Hesap Makinesi</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="container">
        <div className="calculator">
          <div className="display">{display}</div>

          <div className="buttons">
            <button className="btn function" onClick={clear}>AC</button>
            <button className="btn function" onClick={toggleSign}>+/-</button>
            <button className="btn function" onClick={inputPercent}>%</button>
            <button className="btn operator" onClick={() => performOperation('÷')}>÷</button>

            <button className="btn" onClick={() => inputDigit(7)}>7</button>
            <button className="btn" onClick={() => inputDigit(8)}>8</button>
            <button className="btn" onClick={() => inputDigit(9)}>9</button>
            <button className="btn operator" onClick={() => performOperation('×')}>×</button>

            <button className="btn" onClick={() => inputDigit(4)}>4</button>
            <button className="btn" onClick={() => inputDigit(5)}>5</button>
            <button className="btn" onClick={() => inputDigit(6)}>6</button>
            <button className="btn operator" onClick={() => performOperation('-')}>-</button>

            <button className="btn" onClick={() => inputDigit(1)}>1</button>
            <button className="btn" onClick={() => inputDigit(2)}>2</button>
            <button className="btn" onClick={() => inputDigit(3)}>3</button>
            <button className="btn operator" onClick={() => performOperation('+')}>+</button>

            <button className="btn zero" onClick={() => inputDigit(0)}>0</button>
            <button className="btn" onClick={inputDecimal}>.</button>
            <button className="btn operator" onClick={() => performOperation('=')}>=</button>
          </div>
        </div>

        <style jsx>{`
          .container {
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
          }

          .calculator {
            background: #1a1a1a;
            border-radius: 20px;
            padding: 20px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            width: 320px;
          }

          .display {
            background: #2d2d2d;
            color: #fff;
            font-size: 48px;
            text-align: right;
            padding: 30px 20px;
            border-radius: 10px;
            margin-bottom: 20px;
            min-height: 80px;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            word-wrap: break-word;
            word-break: break-all;
          }

          .buttons {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 10px;
          }

          .btn {
            background: #505050;
            color: #fff;
            border: none;
            border-radius: 10px;
            font-size: 24px;
            padding: 20px;
            cursor: pointer;
            transition: all 0.2s;
            font-weight: 500;
          }

          .btn:hover {
            background: #606060;
            transform: scale(1.05);
          }

          .btn:active {
            transform: scale(0.95);
          }

          .btn.function {
            background: #a5a5a5;
            color: #1a1a1a;
          }

          .btn.function:hover {
            background: #b5b5b5;
          }

          .btn.operator {
            background: #ff9500;
          }

          .btn.operator:hover {
            background: #ffaa33;
          }

          .btn.zero {
            grid-column: span 2;
          }
        `}</style>

        <style jsx global>{`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          body {
            margin: 0;
            padding: 0;
          }
        `}</style>
      </div>
    </>
  );
}
