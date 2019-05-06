import React from 'react';
import { View, StyleSheet, ActivityIndicator, Modal, Text } from 'react-native';
import Spinkit from 'react-native-spinkit';

const Spinner = (props) => {
    return (
        <Modal 
        animationType="none"
        supportedOrientations={['landscape', 'portrait']}
        transparent
        visible={true}>
            <View style={[
            styles.container,
            { backgroundColor: 'rgba(0, 0, 0, 0.25)' }
            ]} key={`spinner_${Date.now()}`}>
                <View style={styles.background}>
                    <Spinkit style={styles.spinner} isVisible={true}  size={37} type={'FadingCircleAlt'} color={props.color}/>
                    {/* <View style={styles.textContainer}>
                        <Text style={styles.textContent}>Loading..</Text>
                    </View> */}
                </View>
            </View>
            
      </Modal>
    );
};
export default Spinner;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'transparent',
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0
    },
    background: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    spinner: {
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
      },
    textContainer: {
      flex: 1,
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute'
    },
    textContent: {
      top: 80,
      height: 50,
      fontSize: 20,
      fontWeight: 'bold'
    }
});

