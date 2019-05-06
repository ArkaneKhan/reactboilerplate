import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Modal from "react-native-modal";

export class ModalPopup extends Component {

  render() {
    return (
      <Modal
        backdropOpacity={0.9 || this.props.backdropOpacity}
        backdropColor={this.props.backdropColor}
        onBackdropPress={this.props.onBackdropPress}
        animationType="slideInUp"
        isVisible={this.props.isVisible}>
        {this.props.children}
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
});

