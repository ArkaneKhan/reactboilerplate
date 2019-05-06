import React, { Component } from 'react';
import { Text, View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { UIFont, fonts, fontSize, colors } from '../Assets';
import {AppConstants} from '../AppConstants';

export class TextField extends Component {
  state = {
    borderColor: colors.placeholderColor
  }
  onFocus = () => {
    this.setState({ borderColor: colors.themeColor })
  }
  onBlur = () => {
    this.setState({ borderColor: colors.placeholderColor })
  }

  render() {
    return (
      <View style={[styles.txtInputViewStyle, this.props.txtInputViewStyle]}>
        <TextInput
          style={[styles.txtInputStyle, { borderColor: this.state.borderColor }, this.props.txtInputStyle]}
          value={this.props.value}
          onChangeText={this.props.onChangeText}
          onFocus={this.props.onFocus? this.props.onFocus : this.onFocus}
          onBlur={this.props.onBlur? this.props.onBlur : this.onBlur}
          secureTextEntry={this.props.secureTextEntry}
          placeholder={this.props.placeholder}
          placeholderTextColor={colors.placeholderColor}
          keyboardType={this.props.keyboardType}
          autoCapitalize="none"
          autoCorrect={false}
          maxLength={this.props.maxLength}
          editable={this.props.editable}
        />
        { this.props.onForgotPress &&
          <TouchableOpacity style={styles.forgot} onPress={this.props.onForgotPress}>
            <Text style={styles.forgotText}>{AppConstants.forgot}</Text>
          </TouchableOpacity>
        }

      </View>
    );
  }
}

const styles = StyleSheet.create({
  txtInputViewStyle: {
    marginBottom: 15,
  },
  txtInputStyle: {
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 15,
    height: 40,
    ...UIFont.font(fonts.regular, fontSize.medium, colors.black),
    backgroundColor: colors.white,
  },
  forgot: {
    position: 'absolute',
    right: 10,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  forgotText: {
    ...UIFont.font(fonts.regular, fontSize.medium, colors.placeholderColor)
  }
})
