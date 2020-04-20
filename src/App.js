import React from "react";
import "./styles.css";
import Pucks from "./components/pucks";
import Surface from "./components/surface";
import Dice from "./components/dice";
import Counter from "./components/counter";
import GlobalCounter from "./components/gcounter";
import toBoard from "./engine/toBoard";
import { validMoves } from "./engine/moves";
import { StateProvider } from "./state";

const jlog = o => console.log(JSON.stringify(o));

const boardStart = toBoard("1w2,6b5,8b3,12w5,13b5,17w3,19w5,24b2/w/1,2");
//jlog(toBoard("1w2,6b5,8b3,12w5,13b5,17w3,19w5,24b2/w/1,2"));

export default function App() {
  const state = {
    counter: 0,
    // dice: [1, 5],
    // player: 0, // 0 for white, 1 for black
    // points: [[],[]],
    ...boardStart
    //player: 0
  };

  const reducer = (state, update) => {
    if (typeof update === "function") return { ...state, ...update(state) };
    switch (update.type) {
      case "inc":
        return { ...state, counter: state.counter + update.value };
      default:
        return state;
    }
  };

  const boardClick = e => {
    //e.stopPropagation();
    //e.preventDefault();
    let { left, top, bottom, right } = e.target.getBoundingClientRect();
    const { clientX, clientY } = e;
    [left, top, bottom, right] = [left, top, bottom, right].map(v =>
      Math.floor(v)
    );
    jlog({ left, top, bottom, right, clientX, clientY });
    jlog([clientX - left, clientY - top]);
  };
  //jlog(validMoves(state));
  return (
    <StateProvider initialState={state} reducer={reducer}>
      <div className="App">
        <div key="head">
          <h1>Backgammon - a work in progress</h1>
        </div>
        <div className="board" key="board" onClick={e => boardClick(e)}>
          <Surface />
          <Pucks points={state.points} player={state.player} />
          <Dice values={state.dice} />
        </div>
        <Counter />
        <GlobalCounter />
        <GlobalCounter />
      </div>
    </StateProvider>
  );
}
