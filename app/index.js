import React from "react";
import ReactDOM from "react-dom";
import { relative } from "path";
import PropTypes from "prop-types";
// import { Router, Route } from "react-router-dom";
import createHistory from "history/createBrowserHistory";


ReactDOM.render(
   <h1 id="title">
      Hello World!
      <br />
      Hello!!!!
   </h1>,
   document.getElementById("div1")
);
ReactDOM.render(
   <ul id="front-end">
      <li>HTML</li>
      <li>CSS</li>
      <li>JS</li>
   </ul>,
   document.getElementById("div2"),
   () => console.log("List added")
);

// JSX, Element-------------------------------------------------------------------------------------
// Напишите функцию createReactTable(data, container), которая:
// • Принимает двумерный массив data размером 2х2 и на его основе создает React элемент table;
// • Принимает элемент DOM container, в который надо добавить элемент table.

let styleTd = { border: "1px solid black", padding: "10px", width: "20px", textAlign: "center" };

function createReactTable(data, container) {
   ReactDOM.render(
      <table id="table" style={{ border: "1px solid black" }} >
         <tbody>
            <tr>
               <td style={styleTd}>
                  {data[0][0]}
               </td>
               <td style={styleTd}>
                  {data[0][1]}
               </td>
            </tr>
            <tr>
               <td style={styleTd}>
                  {data[1][0]}
               </td>
               <td style={styleTd}>
                  {data[1][1]}
               </td>
            </tr>
         </tbody>
      </table>,
      document.getElementById(container)
   );
};

createReactTable([[1, 2], [3, 4]], "div3");

// Component--------------------------------------------------------------------------------------------
// Создайте следующую иерархию компонент:
// App
// Header
//    Navigation
// Content
// Aside
// Footer
// Содержимое компонент – произвольное.

function App() {
   return (
      <div>
         <Header />
         <Content />
         <Aside />
         <Footer />
      </div>
   )
}
function Header() {
   return (
      <header style={{ backgroundColor: "red" }}>
         Header
      <Nav />
      </header>
   )
}
function Nav() {
   return (
      <nav>
         <ul>
            <li style={{ display: "inline", marginRight: "10px" }}>Main</li>
            <li style={{ display: "inline", marginRight: "10px" }}>About</li>
            <li style={{ display: "inline", marginRight: "10px" }}>Contacts</li>
         </ul>
      </nav>
   );
}
function Content() {
   return (
      <content style={{ backgroundColor: "green", display: "block" }}>
         Content
   </content>
   );
}
function Aside() {
   return (
      <aside style={{ backgroundColor: "yellow" }}>
         Aside
   </aside>
   )
}
function Footer() {
   return (
      <footer style={{ backgroundColor: "gray" }}>
         Footer
   </footer>
   )
}
ReactDOM.render(
   <App />,
   document.getElementById("div4")
);

// Props ------------------------------------------------------------------------------------------
// Создайте компонент Table, который через props data принимает двумерный массив размером 2х2 и на его основе создает React элемент table.
// По умолчанию, data равна {{1.1, 1.2}, {2.1, 2.2}}.
// Для data необходимо задать проверку типов.

class Table extends React.Component {
   render() {
      return <table>
         <tbody>
            <tr>
               <td style={styleTd}>
                  {this.props.data[0][0]}
               </td>
               <td style={styleTd}>
                  {this.props.data[0][1]}
               </td>
            </tr>
            <tr>
               <td style={styleTd}>
                  {this.props.data[1][0]}
               </td>
               <td style={styleTd}>
                  {this.props.data[1][1]}
               </td>
            </tr>
         </tbody>
      </table>
   }
   static get propTypes() {
      return {
         data: PropTypes.array
      };
   }
   static get defaultProps() {
      return {
         data: [[1.1, 1.2], [2.1, 2.2]]
      }
   };
}
ReactDOM.render(
   <Table data={[[9, 8], [7, 6]]} />,
   document.getElementById("div5")
);

// State ------------------------------------------------------------------------------------------
// Создайте компонент AnimationText, который через props text принимает строку и возвращает элемент, который визуализирует данную строку.
// Компонент перерисовывает строку text каждую секунду с разным размером шрифта (CSS свойство: font-size).
// Размер шрифта должен быть в пределах от 10 до 20 px.

class AnimationText extends React.Component {
   constructor(props) {
      super(props);
      this.state = { fontSize: 10 };
   }
   render() {
      setTimeout(() => this.setState(function (prevState, props) {
         if (prevState.fontSize == 20) {
            return { fontSize: 10 }
         } else {
            return { fontSize: ++prevState.fontSize }
         }
      }),
         1000
      );
      return <p style={{ fontSize: this.state.fontSize, height: "50px" }}>{this.props.text}</p>;
   }
}
ReactDOM.render(
   <AnimationText text={"Hello world!"} />,
   document.getElementById("div6")
);

// Component Life Cicle------------------------------------------------------------------------------------------
// Часы

class Clock extends React.Component {
   constructor(props) {
      super(props);
      this.state = { date: new Date() };
   }
   componentDidMount() {
      this.timerId = setInterval(
         () => this.tick(),
         1000
      );
   }
   componentWillUnmount() {
      clearInterval(this.timerId);
   }
   tick() {
      this.setState({ date: new Date() });
   }
   render() {
      return <div style={{ marginBottom: "20px" }}>Время {this.state.date.toLocaleTimeString()}</div>;
   }
}
ReactDOM.render(
   <Clock />,
   document.getElementById("div7")
);
// Events ------------------------------------------------------------------------------------------
// Создайте компонент, который содержит две кнопки и место для вывода числа.
// При клике на одну из кнопок – число в поле должно уменьшаться на единицу, при клике на другу кнопку – увеличиваться на единицу.
// Изначально число имеет значение 0.

class Increment extends React.Component {
   constructor(props) {
      super(props);
      this.state = { number: 0 };
      this.next = this.next.bind(this);
      this.previous = this.previous.bind(this);
   }
   next() {
      this.setState(
         (prevState, props) => ({
            number: ++prevState.number
         })
      );
   }
   previous() {
      this.setState(
         (prevState, props) => ({
            number: --prevState.number
         })
      );
   }
   render() {
      return (
         <div style={{ marginBottom: "20px" }}>
            <button type="button" onClick={this.next}>+</button>
            <b>Число: {this.state.number}</b>
            <button type="button" onClick={this.previous}>-</button>
         </div>
      );
   }
}
ReactDOM.render(
   <Increment />,
   document.getElementById("div8")
);

// Events ------------------------------------------------------------------------------------------
// Создайте компонент, который выводит произвольную строку текста и три кнопки.
// При клике по кнопкам должен меняться цвет текста.

class ChangeColor extends React.Component {
   constructor(props) {
      super(props);
      this.state = { color: "black" };
      this.change = this.change.bind(this);
   }
   change(event) {
      console.dir(event.target.innerText);
      switch (event.target.innerText) {
         case "RED": this.setState(
            { color: "red" });
            break;
         case "GREEN": this.setState(
            { color: "green" });
            break;
         case "YELLOW": this.setState(
            { color: "yellow" });
            break;
         default: this.setState(
            { color: "black" });
            break;
      }
   }
   render() {
      return (
         <div style={{ marginBottom: "20px" }}>
            <p style={{ color: this.state.color }}>Text Text Text</p>
            <button type="button" onClick={this.change}>RED</button>
            <button type="button" onClick={this.change}>GREEN</button>
            <button type="button" onClick={this.change}>YELLOW</button>
            <button type="button" onClick={this.change}>Cancel</button>
         </div>
      );
   }
}
ReactDOM.render(
   <ChangeColor />,
   document.getElementById("div9")
);

// Form ------------------------------------------------------------------------------------------

class WelcomeForm extends React.Component {
   constructor(props) {
      super(props);
      this.state = { name: "" };
      this.onChange = this.onChange.bind(this);
      this.sayHello = this.sayHello.bind(this);
   }
   onChange(event) {
      this.setState({ name: event.target.value });
   }
   sayHello() {
      console.log(`Hello ${this.state.name}!`);
   }
   render() {
      return (
         <form style={{ marginBottom: "20px" }}>
            <label htmlFor="name">Name:</label>
            <input type="text" name="name" value={this.state.name} onChange={this.onChange} />
            <button type="button" onClick={this.sayHello}>Say hello</button>
            <p>{this.state.name}</p>
         </form>
      );
   }
}
ReactDOM.render(
   <WelcomeForm />,
   document.getElementById("div10")
);

// Form Calculator------------------------------------------------------------------------------------
// Создайте форму для калькулятора. На форме должно быть два поля ввода для чисел и четыре кнопки с операциями (сложение, вычитание, умножение и деление).
// Для полей ввода нужно реализовать валидацию, которая должна сопровождаться соответствующим сообщением об ошибке.

class CalculatorForm extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         operand1: "",
         operand1Valid: true,
         operand2: "",
         operand2Valid: true,
         isHide: true,
         opertaion: "",
      };
      this.onChange1 = this.onChange1.bind(this);
      this.onChange2 = this.onChange2.bind(this)
      this.add = this.add.bind(this);
      this.sub = this.sub.bind(this);
      this.multiply = this.multiply.bind(this);
      this.divide = this.divide.bind(this);
      this.clear = this.clear.bind(this);
   }
   onChange1(event) {
      this.setState({
         operand1: event.target.value,
         operand1Valid: this.operandValid(event.target.value)
      });
   }
   onChange2(event) {
      this.setState({
         operand2: event.target.value,
         operand2Valid: this.operandValid(event.target.value)
      });
   }

   operandValid(operand) {
      if (typeof (Number(operand)) === "number" && !isNaN(Number(operand))) {
         // console.log(true);
         this.setState({
            isHide: true
         });
         return true;
      }
      // console.log(false);
      this.setState({
         isHide: false
      });
      return false;
   };

   add() {
      console.log(`add ${this.state.operand1} + ${this.state.operand2} =
      ${Number(this.state.operand2) + Number(this.state.operand1)}`);
      this.setState({
         opertaion: "+",
      });
   }
   sub() {
      console.log(`sub ${this.state.operand1} - ${this.state.operand2} =
      ${Number(this.state.operand2) - Number(this.state.operand1)}`);
      this.setState({
         opertaion: "-",
      });
   }
   multiply() {
      console.log(`multiply ${this.state.operand1} * ${this.state.operand2} =
      ${Number(this.state.operand2) * Number(this.state.operand1)}`);
      this.setState({
         opertaion: "*",
      });
   }
   divide() {
      console.log(`divide ${this.state.operand1} / ${this.state.operand2} =
      ${Number(this.state.operand2) / Number(this.state.operand1)}`);
      this.setState({
         opertaion: "/",
      });
   }
   clear() {
      this.setState({
         operand1: "",
         operand2: "",
         opertaion: "",
      });
   }
   render() {
      let operand1Color = this.state.operand1Valid === true ? "green" : "red";
      let operand2Color = this.state.operand2Valid === true ? "green" : "red";
      console.log(operand1Color, operand2Color);
      return (
         <form style={{ marginBottom: "20px" }}>
            <label htmlFor="operand1">Operand1:</label>
            <input type="text" operand1="operand1" value={this.state.operand1} onChange={this.onChange1} style={{ borderColor: operand1Color, margin: "5px" }} />
            {!this.state.isHide && <span>Not a Number format data</span>}
            <br />
            <label htmlFor="operand2">Operand2:</label>
            <input type="text" operand2="operand2" value={this.state.operand2} onChange={this.onChange2} style={{ borderColor: operand2Color, margin: "5px" }} />
            {!this.state.isHide && <span>Not a Number format data</span>}
            <br />
            <button type="button" onClick={this.add} style={{ margin: "5px" }}>+</button>
            <button type="button" onClick={this.sub} style={{ margin: "5px" }}>-</button>
            <button type="button" onClick={this.multiply} style={{ margin: "5px" }}>*</button>
            <button type="button" onClick={this.divide} style={{ margin: "5px" }}>/</button>
            <button type="button" onClick={this.clear} style={{ margin: "5px" }}>Clear</button>
            <p style={{ margin: "5px", border: "1px solid black" }} >{this.state.operand1 && this.state.operand2 && <span>{this.state.operand1}{this.state.opertaion}{this.state.operand2}</span>} </p>
         </form>
      );
   }
}
ReactDOM.render(
   <CalculatorForm />,
   document.getElementById("div11")
);

// HideShow------------------------------------------------------------------------------------

class HideShow extends React.Component {
   constructor(props) {
      super(props);
      this.state = { isHide: false };
      setInterval(
         () => this.setState(
            (prevState, props) => ({
               isHide: !prevState.isHide
            })
         ),
         1000
      );
   }
   render() {
      if (this.state.isHide) {
         return null;
      }
      return <div>
         <h1>Hello!</h1>
      </div>
   }
}
ReactDOM.render(
   <HideShow />,
   document.getElementById("div12")
);

// Component list-------------------------------------------------------------------------------------------------------------
// Создайте компонент Table, который через props data (обязательный) принимает двумерный массив произвольной длины
//  и на его основе создает React элемент table.


function TableList(props) {
   let rows = [];
   for (let i = 0; i < props.table.length; i++) {
      let rowID = `row${i}`;
      let cell = [];
      for (let j = 0; j < props.table[i].length; j++) {
         let cellID = `cell${i}-${j}`
         cell.push(<td key={cellID} id={cellID} style={styleTd}>{props.table[i][j]}</td>)
      }
      rows.push(<tr key={i} id={rowID}>{cell}</tr>)
   }
   return (
      <table style={{ border: "1px solid black" }}>
         <tbody>
            {rows}
         </tbody>
      </table>
   );
}
let table = [
   [1, 2, 3, 4, "hello", 6, 7, 8, 9, 10],
   [11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
   [21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
];
ReactDOM.render(
   <TableList table={table} />,
   document.getElementById("div13")
);

// Ref ----------------------------------------------------------------------------

class MyDiv extends React.Component {
   constructor(props) {
      super(props);
   }
   render() {
      return <div>Hello World!</div>;
   }
}
function Hello(props) {
   return (
      <MyDiv ref={(comp) => console.dir(comp)} />
   );
}
ReactDOM.render(
   <Hello />,
   document.getElementById("div14")
);

// Router----------------------------------------------------------------------------
// Создайте три компонента, в первом компоненте сделайте переход на второй, во втором на третий, в третьем на первый.

import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
function Navigation() {
   return (
      <Router>
         <div>
            <ul>
               <li><NavLink exact to="/"
                  className = "link"
                  activeStyle={{
                     color: "green",
                     fontStyle: "italic",
                     fontWeight: "bold"
                  }}
               >Main component</NavLink></li>
               <li><NavLink to="/second"
                  className = "link"
                  activeStyle={{
                     color: "green",
                     fontStyle: "italic",
                     fontWeight: "bold"
                  }}
               >Second component</NavLink></li>
               <li><NavLink to="/third"
                  className = "link"
                  activeStyle={{
                     color: "green",
                     fontStyle: "italic",
                     fontWeight: "bold"
                  }}
               >Third component</NavLink></li>
            </ul>
            <Route exact path="/" component={Main} />
            <Route path="/second" component={Second} />
            <Route path="/third" component={Third} />
         </div>
      </Router>
   )

}
function Main() {
   return <h2>Main page</h2>;
}
function Second() {
   return <h2>Second page</h2>;
}
function Third() {
   return <h2>Third page</h2>;
}
ReactDOM.render(
   <Navigation />,
   document.getElementById("div15")
);

// ------------------------------------------------------------------------------

// import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
// class ParamsRouter extends React.Component {
//    render() {
//       return (
//          <Router>
//             <div>
//                <ul>
//                   <li><Link to="/welcome/Tom">Welcome Tom</Link></li>
//                   <li><Link to="/welcome/Sam">Welcome Sam</Link></li>
//                </ul>
//                <Route path="/welcome/:name" component={Welcome} />
//             </div>
//          </Router>
//       ); } }
//       class Welcome extends React.Component {
//          render() {
//             return <div>Hello {this.props.match.params.name}!</div>;
//          }
//       }
//       ReactDOM.render(
//          <ParamsRouter />,
//          document.getElementById("div16")
//       );