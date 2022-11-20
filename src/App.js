import { useEffect, useState } from "react";

function App() {
  const [endValue, setEndValue] = useState(undefined);
  const [duration, setDuration] = useState(undefined);
  const [showDecimal, setShowDecimal] = useState(false);

  function nbrElmSpdDec(endNbr, elm, speed, decimal) {
    let inc = endNbr / (speed / 10);
    function incNbrRec(i, endNbr, elm) {
      if (i + inc < endNbr) {
        if (decimal) {
          elm.innerHTML = Math.ceil(i * 100) / 100;
        } else {
          elm.innerHTML = Math.round((i * 100) / 100);
        }

        setTimeout(function () {
          incNbrRec(i + inc, endNbr, elm);
        }, 1);
      } else if (i != endNbr && i + inc >= endNbr) {
        elm.innerHTML = endNbr;
      }
    }
    incNbrRec(inc, endNbr, elm);
  }

  const valueChange = (e) => {
    setEndValue(e.target.value);
  };
  const durationChange = (e) => {
    setDuration(e.target.value * 1000);
  };

  useEffect(() => {
    document
      .getElementById("durationInput")
      .addEventListener("input", durationChange);
    document
      .getElementById("valueInput")
      .addEventListener("input", valueChange);

    return () => {
      document
        .getElementById("valueInput")
        .removeEventListener("input", valueChange);
      document
        .getElementById("durationInput")
        .removeEventListener("input", durationChange);
    };
  });

  return (
    <div className="bg-slate-600 h-screen w-screen">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
        <div
          id="numberElement"
          className="text-[10rem]  font-bold text-white flex flex-row"
        >
          --
        </div>
        <div className="flex flex-row gap-4 items-center">
          <div className="flex flex-col gap-2">
            <h1 className="text-base font-bold text-white">End Value</h1>
            <input
              id="valueInput"
              type="number"
              className="text-5xl bg-slate-600 text-white border-2 border-white rounded-lg px-4 w-[200px]"
            />
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-base font-bold text-white">
              {"Duration (seconds)"}
            </h1>
            <input
              id="durationInput"
              type="number"
              className="text-5xl bg-slate-600 text-white border-2 border-white rounded-lg px-4 w-[150px]"
            />
          </div>
        </div>
        <div className="flex flex-row w-fit gap-6 mt-3">
          <button
            id="decimal"
            onClick={() => {
              setShowDecimal(true);
              document.getElementById("decimal").classList.add("bg-slate-900");
              document
                .getElementById("noDecimal")
                .classList.remove("bg-slate-900");
            }}
            className="text-base font-bold text-white bg-slate-600 p-2 rounded-lg border-2 border-white hover:bg-slate-800"
          >
            Decimal
          </button>

          <button
            id="noDecimal"
            onClick={() => {
              setShowDecimal(false);
              document
                .getElementById("noDecimal")
                .classList.add("bg-slate-900");
              document
                .getElementById("decimal")
                .classList.remove("bg-slate-900");
            }}
            className="text-base font-bold text-white bg-slate-900 border-2 border-white p-2 rounded-lg hover:bg-slate-700"
          >
            No Decimal
          </button>
        </div>
        <button
          onClick={() => {
            nbrElmSpdDec(
              endValue,
              document.getElementById("numberElement"),
              duration,
              showDecimal
            );
          }}
          className="p-3 bg-slate-900 text-white rounded-xl text-6xl mt-6"
        >
          Start
        </button>
      </div>
    </div>
  );
}

export default App;
