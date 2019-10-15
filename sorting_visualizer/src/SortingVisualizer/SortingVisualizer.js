import React, { Component } from "react";
import "./sortingVisualizer.css";
import * as algo from "../sortingAlgorithms/sortingAlgorithms";

export default class SortingVisualizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      array: []
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < 300; i++) {
      array.push(getRandomNumber(5, 1000));
    }
    this.setState({ array });
  }

  mergeSort() {
    let arr = this.state.array.slice();
    console.log(arr);
    console.log(algo.mergeSort(arr));
  }
  quickSort() {}
  heapSort() {}
  bubbleSort() {}

  render() {
    const { array } = this.state;
    return (
      <div>
        <div className='array-container'>
          {array.map((value, index) => {
            return (
              <div
                className='array-bar'
                key={index}
                style={{ height: `${value / 15}vh` }}
              ></div>
            );
          })}
        </div>
        <button onClick={() => this.resetArray()}>Generate new Array</button>
        <button onClick={() => this.mergeSort()}>Merge Sort</button>
        <button onClick={() => this.quickSort()}>Quick Sort</button>
        <button onClick={() => this.heapSort()}>Heap Sort</button>
        <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
      </div>
    );
  }
}

function getRandomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
