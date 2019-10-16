import React, { Component } from "react";
import "./sortingVisualizer.css";
import * as algo from "../sortingAlgorithms/sortingAlgorithms";

export default class SortingVisualizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      array: [],
      numberOfBars: 40,
      timeInMS: 10
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < this.state.numberOfBars; i++) {
      array.push(getRandomNumber(5, 1000));
    }
    this.setState({ array });
  }

  mergeSort() {
    const animations = algo.mergeSort(this.state.array);
    // console.log(this.state.array);
    // console.log(animations);
    const newAnimations = [];
    for (const animation of animations) {
      // console.log(animation.swap);
      newAnimations.push(animation.comparison);
      newAnimations.push(animation.comparison);
      newAnimations.push(animation.swap);
    }
    // console.log(animations);
    for (let i = 0; i < newAnimations.length; i++) {
      const arrayBars = document.getElementsByClassName("array-bar");
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = newAnimations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? "red" : "aqua";
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * this.state.timeInMS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = newAnimations[i];
          // console.log(newHeight);
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight / 15}vh`;
        }, i * this.state.timeInMS);
      }
    }
  }
  quickSort() {}
  heapSort() {}
  bubbleSort() {}

  // TODO:modify accc to usecase
  testAlgorithms() {
    for (let i = 0; i < 100; i++) {
      const array = [];
      const length = getRandomNumber(1, 1000);
      for (let j = 0; j < length; j++) {
        array.push(getRandomNumber(-1000, 1000));
      }
      const javaScriptSortArray = array.slice().sort((a, b) => a - b);
      algo.mergeSort(array);

      console.log(areArrayEqual(javaScriptSortArray, array));
    }
  }

  changeBars() {
    const input = this.refs.barsInput;
    const value = input.value;
    const cb = () => {
      this.resetArray();
    };
    if (value > 300) {
      this.setState(
        {
          numberOfBars: 300
        },
        cb
      );
    } else {
      if (value < 0) {
        this.setState(
          {
            numberOfBars: 0
          },
          cb
        );
      } else {
        console.log("hii");
        this.setState(
          {
            numberOfBars: value
          },
          cb
        );
      }
    }
  }

  changeTime() {
    const input = this.refs.timeInput;
    const value = input.value;
    if (value < 0) {
      return this.setState({
        timeInMS: 0
      });
    }
    this.setState({
      timeInMS: value
    });
  }

  render() {
    const { array } = this.state;
    return (
      <div className='container'>
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
        <div className='buttons'>
          <button onClick={() => this.resetArray()}>Generate new Array</button>
          <button onClick={() => this.mergeSort()}>Merge Sort</button>
          <button onClick={() => this.quickSort()}>Quick Sort</button>
          <button onClick={() => this.heapSort()}>Heap Sort</button>
          <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
          <button onClick={() => this.testAlgorithms()}>Test algorithms</button>
        </div>
        <div className='inputs'>
          <label>Number Of Bars( 0 - 300 ): </label>
          <input
            type='number'
            onChange={e => this.changeBars()}
            ref='barsInput'
            value={this.state.numberOfBars}
          />
          <br />
          <label>Time in ms( >0 ): </label>
          <input
            type='number'
            onChange={e => this.changeTime()}
            ref='timeInput'
            value={this.state.timeInMS}
          />
        </div>
      </div>
    );
  }
}

function getRandomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function areArrayEqual(arrayOne, arrayTwo) {
  if (arrayOne.length !== arrayTwo.length) return false;
  for (let i = 0; i < arrayOne.length; i++) {
    if (arrayOne[i] !== arrayTwo[i]) {
      console.log(arrayOne[i], "  ", arrayTwo[i]);
      return false;
    }
  }
  return true;
}
