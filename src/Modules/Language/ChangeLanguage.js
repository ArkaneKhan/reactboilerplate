import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, Image, ActivityIndicator } from 'react-native';
import { Statusbar } from '../../ReuseableComponents';
import { heightRatio } from '../../utility/utility';
import { connect } from 'react-redux';
import { changeLanguage } from '../../Store/Action';
import { AppConstants } from '../../AppConstants';
import { Images, UIFont, fonts, fontSize, colors, headerStyle } from '../../Assets';

let navStyle = '';

class ChangeLanguage extends Component {

  static navigationOptions = ({ navigation }) => {
    navStyle = headerStyle(navigation.getParam('userType', null))
    return {
      headerStyle: { backgroundColor: navStyle.backgroundColor, borderBottomWidth: 0, elevation: 0 },
      headerTitleStyle: { color: navStyle.color },
      headerLeft: (
        <TouchableOpacity
          onPress={() => navigation.pop()}>
          <Image style={[styles.iconHome, { tintColor: navStyle.color }]} resizeMode='contain' source={Images.icBack} />
        </TouchableOpacity>
      ),
    }
  };

  render() {
    const { language } = this.props
    return (
      <View style={styles.container}>
        <Statusbar color={navStyle.backgroundColor} contentStyle={navStyle.contentStyle} />
        {this.props.loading === false ?
          <View style={{ marginTop: 15, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 18, marginBottom: 30 }}>{AppConstants.chooseLanguage}</Text>
            <TouchableOpacity style={styles.btnStyle} onPress={() => this.setLanguage('en')}>
              <Text style={{ ...UIFont.font(fonts.regular, fontSize.large, language === 'en' ? colors.themeColor : colors.placeholderColor) }}>
                English
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnStyle} title="French" onPress={() => this.setLanguage('es')} >
              <Text style={{ ...UIFont.font(fonts.regular, fontSize.large, language === 'es' ? colors.themeColor : colors.placeholderColor) }}>
                Español
              </Text>
            </TouchableOpacity>
          </View>

          :
          <View style={{ flex: 1, backgroundColor: colors.bgGrey, alignItems: 'center', justifyContent: 'center', marginHorizontal: 25 }}>
            <ActivityIndicator size={'large'} color={colors.themeColor} />
            <Text style={{ textAlign: 'center', ...UIFont.font(fonts.regular, fontSize.medium, colors.lightBlack) }}>{AppConstants.changeLanguageMessage}</Text>
          </View>
        }
      </View>
    );
  }

  setLanguage(language) {
    if (this.props.language !== language) {
      this.props.changeLanguage(language, false, true)
    }
  }
}

const mapStateToProp = state => {
  return {
    loading: state.signIn.loading,
    language: state.signIn.language
  };
};
export default connect(mapStateToProp,
  { changeLanguage }
)(ChangeLanguage)

const styles = StyleSheet.create({

  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.bgGrey
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  btnStyle: {
    backgroundColor: colors.bgGrey,
    padding: 15
  },
  iconHome: {
    marginHorizontal: 15,
    width: 26,
    height: 26,
  },
});
