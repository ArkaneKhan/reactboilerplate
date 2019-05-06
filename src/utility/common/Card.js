import React from 'react';
import { View, StyleSheet } from 'react-native';
// import Colors from './Colors';

const Card = (props) => {
    return (
        <View style={[styles.containerCard, props.styles]} >
            {props.children}
        </View>
    );
};
const styles = StyleSheet.create({
    containerCard: {
        flexDirection: 'column',
        borderRadius: 10,
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 8,
        shadowColor: '#000',
        elevation: 10,
        margin: 15,
        backgroundColor: '#fff',
    }
});
export { Card };
