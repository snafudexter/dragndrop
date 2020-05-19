import React, { useState, createContext } from 'react';
import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';
import RewardCard from './components/RewardCard'
import Target from './components/Target'
import data from './data'
import './App.css';

export const CardContext = createContext({
  addReward: null,
  removeReward: null,
});

const Row = ({ row }) => {
  return (
    <React.Fragment>
      <th><RewardCard index={row._id + 1} /></th>
      {row.cols.map((item, cIndex) => (
        <td><Target key={cIndex} cIndex={cIndex} item={item} rIndex={row._id + 1} ></Target></td>
      ))}
    </React.Fragment>
  )
}

function App() {

  let ls = localStorage.getItem('data');

  const rRows = ls ? JSON.parse(ls) : data

  const [rows, setRows] = useState(rRows)

  const addReward = (cIndex, rIndex) => {
    const nRows = rows.slice(0)
    nRows[rIndex - 1].cols[cIndex].reward = rIndex
    setRows(nRows)
    localStorage.setItem('data', JSON.stringify(nRows))
  }

  const removeReward = (cIndex, rIndex) => {
    const nRows = rows.slice(0)
    nRows[rIndex - 1].cols[cIndex].reward = null
    setRows(nRows)
    localStorage.setItem('data', JSON.stringify(nRows))
  }


  return (
    <CardContext.Provider value={{ addReward, removeReward }}>
      <DndProvider backend={Backend}>
        <div className="column">
          <table className="table table-responsive">
            <thead>
              <tr>
                <th></th>
                <th><span className="card p-3">C1</span></th>
                <th><span className="card p-3">C2</span></th>
                <th><span className="card p-3">C3</span></th>
                <th><span className="card p-3">C4</span></th>
                <th><span className="card p-3">C5</span></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((item, index) => <tr><Row key={index} row={item} /> </tr>)}
            </tbody>
          </table>
        </div>
      </DndProvider>
    </CardContext.Provider>
  );
}

export default App;
