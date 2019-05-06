import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import { Statusbar } from '../../ReuseableComponents';
import { Images } from '../../Assets';
import { heightRatio } from '../../utility/utility';
import { connect } from 'react-redux';
import { changeLanguage } from '../../Store/Action';
import { updateAppConstants } from '../../AppConstants';
import { setLocale } from '../../Modules/Localization/i18n'
import SplashScreen from 'react-native-splash-screen'

class Language extends Component {

  componentDidMount() {
    SplashScreen.hide();
  }
  
  render() {
    return (
      <ImageBackground source={Images.bg} style={styles.bgImage}>
        <Statusbar color={'transparent'} contentStyle={"dark-content"} hidden={true} />
        <View style={{ marginTop: heightRatio(300) }}></View>
        <Text style={{ fontSize: 18, marginBottom: 30 }}>Choose Language</Text>
        <TouchableOpacity style={styles.btnStyle} onPress={() => this.setLanguage('en')}>
          <Text style={{ color: '#0075be', fontSize: 18 }}>English</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnStyle} title="French" onPress={() => this.setLanguage('es')} >
          <Text style={{ color: '#0075be', fontSize: 18 }}>Spanish</Text>
        </TouchableOpacity>
      </ImageBackground>
    );
  }

  setLanguage(language) {
    setLocale(language);
    updateAppConstants()
    this.props.changeLanguage(language, true)
  }
}

const mapStateToProp = state => {
  return {
    user: state.signIn.user,
    language: state.signIn.language,
    logout: state.signIn.logout,
  };
};
export default connect(mapStateToProp,
  { changeLanguage }
)(Language)

const styles = StyleSheet.create({
  bgImage: {
    height: '100%',
    width: '100%',
    alignItems: 'center'

  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  },
  btnStyle: {
    backgroundColor: '#fff',
    padding: 15
  }
});
