import React from 'react';
import { Text, View,ImageBackground,StyleSheet } from 'react-native';
import {Images} from '../Assets';
import {Statusbar} from '../ReuseableComponents';

export const LoadingView = (props) => (
    // <ImageBackground style={styles.imgBg} resizeMode='cover' source={Images.splash}>
    // <Statusbar hidden={true}/>
    // </ImageBackground>
    <Text>ASDASDAASDASDASDASDASDAD</Text>
);

const styles = StyleSheet.create({
  imgBg:{
    height: '100%',
    width: '100%'
  }
});
