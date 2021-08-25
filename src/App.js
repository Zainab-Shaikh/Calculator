import { useState } from "react";
import "./App.css";
import Button from "./components/Button";
import style from "./style.module.css";
let openBracket = 0;
let closingBracket = 0;
function App() {
  let number = [
    // { first: "AC", second: "Del", third: "(", fourth: ")" },
    { first: "7", second: "8", third: "9", fourth: "/" },
    { first: "4", second: "5", third: "6", fourth: "*" },
    { first: "1", second: "2", third: "3", fourth: "-" },
    { first: "0", second: ".", third: "=", fourth: "+" },
  ];

  let [lowerNum, setLowerNum] = useState([]);
  let [upperNum, setUpperNum] = useState("");
  function display(elem) {
    if (elem === "AC") {
      setLowerNum((lowerNum = []));
      setUpperNum((upperNum = []));
      openBracket = 0;
      closingBracket = 0;
    } else if (elem === "Del") {
      if (lowerNum.length === 0 && upperNum.length !== 0) {
        if (
          upperNum[upperNum.length - 1] === "+" ||
          upperNum[upperNum.length - 1] === "-" ||
          upperNum[upperNum.length - 1] === "*" ||
          upperNum[upperNum.length - 1] === "/"
        ) {
          setUpperNum((upperNum = upperNum.slice(0, -1)));
          setLowerNum((lowerNum = upperNum));
          setUpperNum((upperNum = []));
        }
      } else {
        if (lowerNum[lowerNum.length - 1] === "(") {
          openBracket--;
        }
        if (lowerNum[lowerNum.length - 1] === ")") {
          closingBracket--;
        }
        setLowerNum((lowerNum = lowerNum.slice(0, -1)));
      }
    } else if (
      (elem === "+" || elem === "-" || elem === "*" || elem === "/") &&
      lowerNum.length !== 0
    ) {
      setUpperNum((upperNum = [...upperNum, lowerNum, elem]));
      setUpperNum((upperNum = upperNum.flat()));
      console.log(upperNum);
      setLowerNum((lowerNum = []));
    } else if (elem in ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]) {
      console.log(elem);
      setLowerNum([...lowerNum, elem]);
    } else if (elem === "." && !lowerNum.includes(".")) {
      setLowerNum([...lowerNum, elem]);
    } else if (elem === "(" && isNaN(lowerNum[lowerNum.length - 1])) {
      openBracket++;
      console.log(openBracket);
      setLowerNum((lowerNum = [...lowerNum, elem]));
    } else if (elem === ")" && !isNaN(lowerNum[lowerNum.length - 1])) {
      closingBracket++;
      setLowerNum((lowerNum = [...lowerNum, elem]));
    } else if (
      elem === "=" &&
      lowerNum.length !== 0 &&
      upperNum !== [] &&
      openBracket === closingBracket
    ) {
      console.log(openBracket);
      console.log(closingBracket);
      let expression = [];
      expression = upperNum;
      expression.push(lowerNum.join(""));
      let new_expression = expression.join("");
      console.log(new_expression);
      let result = eval(new_expression);
      result = result.toString();
      setLowerNum((lowerNum = Array.from(result)));
      setUpperNum((upperNum = []));
      console.log(result);
      console.log(lowerNum);
      expression = [];
    }
  }

  return (
    <section className={style.calc}>
      <p className={style.uppernum}>{upperNum}</p>
      <p className={style.lowernum}>{lowerNum}</p>
      <section>
        <Button
          text="AC"
          clickMe={() => display("AC")}
          className={style.firstRow}
        />
        <Button
          text="Del"
          clickMe={() => display("Del")}
          className={style.firstRow}
        />
        <Button
          text="("
          clickMe={() => display("(")}
          className={style.firstRow}
        />
        <Button
          text=")"
          clickMe={() => display(")")}
          className={style.firstRow}
        />
      </section>
      {number.map((element, index) => (
        <section key={index}>
          <Button text={element.first} clickMe={() => display(element.first)} />
          <Button
            text={element.second}
            clickMe={() => display(element.second)}
          />
          <Button text={element.third} clickMe={() => display(element.third)} />
          <Button
            text={element.fourth}
            clickMe={() => display(element.fourth)}
            className={style.fourth}
          />
        </section>
      ))}
    </section>
  );
}

export default App;
