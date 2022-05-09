import React, { Component } from "react";
import { isInputValid, getError } from "./Utils";
import { INPUT_TYPES, INPUTS } from "./Constants";
import _ from "lodash";

class Form extends Component {
  static INPUTS = INPUTS;
  static INPUT_TYPES = INPUT_TYPES;

  childReferences = {};

  deleteRef = (refToDelete) => {
    const temp = {};
    Object.keys(this.childReferences).map((key) => {
      if (this.childReferences[key]) {
        temp[key] = this.childReferences[key];
      }
    });

    this.childReferences = temp;
  };
  // checkValidation = () => {
  //   let isValid = true;

  //   Object.keys(this.childReferences).map((key) => {
  //     const child = this.childReferences[key];
  //     const { getValue, setError } = child;
  //     const {
  //       type,
  //       byPassValidation,
  //       error,
  //       ConfirmTo = "password",
  //     } = child.props;
  //     if (
  //       getValue &&
  //       !isInputValid(
  //         getValue(),
  //         type,
  //         type === INPUT_TYPES.CONFIRM_PASSWORD
  //           ? this.childReferences[ConfirmTo].getValue()
  //           : "",
  //         !!byPassValidation // if by passing validation prop is active then only checking for empty validation
  //       )
  //     ) {
  //       setError && setError(true, getError(type, getValue(), error));
  //       isValid = false;
  //     }
  //   });
  //   return isValid;
  // };

  checkValidation = () => {
    let isValid = true;
    Object.keys(this.childReferences).map((key) => {
      const child = this.childReferences[key];
      const { getValue, setError } = child;
      const { type, byPassValidation, error } = child.props;
      // console.log(child);
      if (
        getValue &&
        !isInputValid(
          getValue(),
          type,
          type === INPUT_TYPES.CONFIRM_PASSWORD
            ? this.childReferences["password"].getValue()
            : type === INPUT_TYPES.CONFIRM_NEW_PASSWORD
            ? this.childReferences["newPassword"].getValue()
            : "",
          !!byPassValidation // if by passing validation prop is active then only checking for empty validation
        )
      ) {
        setError && setError(true, getError(type, getValue(), error));
        isValid = false;
      }
    });
    return isValid;
  };

  // collecting user entered values from all inputs /
  getValues = () => {
    let data = {};
    Object.keys(this.childReferences).map((key) => {
      const child = this.childReferences[key];
      const { getValue } = child;
      data[child.props.identifier] = getValue();
    });
    return data;
  };

  onSubmitForm = () => {
    return this.checkValidation() ? this.getValues() : undefined;
  };

  prevInputKey = null;
  refCollector = (key) => (ref) => {
    // prevInputKey holds the identifier of previous input so when new item comes for reference collection
    // it adds netInput key in the previous element
    if (this.prevInputKey && this.childReferences[this.prevInputKey]) {
      this.childReferences[this.prevInputKey].nextInput = key;
    }
    this.childReferences[key] = ref;
    this.prevInputKey = key;
  };

  focusByRefCollectorKey = (key) =>
    this.childReferences[key] &&
    this.childReferences[key].focus &&
    this.childReferences[key].focus();

  getInputRef = (key) => this.childReferences[key];

  // handling onSubmit of each input when user moves to next input from keyboard /
  onSubmitEditing = (key) => {
    return (ev) => {
      if (
        !!this.childReferences[key] &&
        !!this.childReferences[key].nextInput
      ) {
        this.focusByRefCollectorKey(this.childReferences[key].nextInput);
      }
    };
  };

  render() {
    return this.props.children(
      this.refCollector,
      this.onSubmitEditing,
      this.focusByRefCollectorKey
    );
  }
}

export default Form;
