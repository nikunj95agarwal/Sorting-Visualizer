import React, { Component } from "react";
// .. COMPONENTS .. //
import Header from "./Components/Headers/Header.jsx";
import ButtonsBar from "./Components/ButtonsBar/ButtonsBar.jsx";
import ArrayBar from "./Components/ArrayBar/ArrayBar.jsx";
import RangeSlider from "./Components/RangeSliders/RangeSlider.jsx";
// .. HELPER FUNCTIONS .. //
import { randomIntFromInterval, playAudio } from "./HelperFunctions.js";
// .. ALGORITHMS .. //
import BubbleSort from "./SortingAlgorithms/BubbleSort/BubbleSort.js";
import SelectionSort from "./SortingAlgorithms/SelectionSort/SelectionSort.js";
import InsertionSort from "./SortingAlgorithms/InsertionSort/InsertionSort.js";
// .. STYLE .. //
import "./SortingVisualizer.css";
// .. SOUNDS .. //
import ResetEffect from "./sounds/ResetEffect.mp3";
import Footer from "./Components/Footer/Footer.jsx";


export default class SortingVisualizer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
      animationSpeed: 50,
      numberOfArrayBars: 10,
    };

    this.generateNewArray = this.generateNewArray.bind(this);
    this.bubbleSort = this.bubbleSort.bind(this);
    this.selectionSort = this.selectionSort.bind(this);
    this.insertionSort = this.insertionSort.bind(this);
    this.onChangeArrayBarRangeSlider = this.onChangeArrayBarRangeSlider.bind(
      this
    );
    this.onChangeAnimationSpeedRangeSlider = this.onChangeAnimationSpeedRangeSlider.bind(
      this
    );
  }

  componentDidMount() {
    this.generateNewArray();
  }

  generateNewArray() {
    const array = [];
    for (let i = 0; i < this.state.numberOfArrayBars; i++) {
      array.push(randomIntFromInterval(5, 70));
    }
    playAudio(ResetEffect);
    this.setState({ array: array });
  }

  onChangeArrayBarRangeSlider = (event, value) => {
    this.setState({ numberOfArrayBars: value });
    this.generateNewArray();
  };

  onChangeAnimationSpeedRangeSlider = (event, value) => {
    this.setState({ animationSpeed: value });
  };

  bubbleSort = () => {
    BubbleSort(this.state.array, this.state.animationSpeed);
  };

  selectionSort = () => {
    SelectionSort(this.state.array, this.state.animationSpeed);
  };

  insertionSort = () => {
    InsertionSort(this.state.array, this.state.animationSpeed);
  };

  render() {
    return (
      <div className="main-container">
        <Header />
        <ButtonsBar
          generateNewArray={this.generateNewArray}
          bubbleSort={this.bubbleSort}
          selectionSort={this.selectionSort}
          insertionSort={this.insertionSort}
        />
        <ArrayBar array={this.state.array} />
        <RangeSlider
          numberOfArrayBars={this.state.numberOfArrayBars}
          animationSpeed={this.state.animationSpeed}
          onChangeArrayBarRangeSlider={this.onChangeArrayBarRangeSlider}
          onChangeAnimationSpeedRangeSlider={this.onChangeAnimationSpeedRangeSlider}
        />
        <Footer />
      </div>
    );
  }
}
