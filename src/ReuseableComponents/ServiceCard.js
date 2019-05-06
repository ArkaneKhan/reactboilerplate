import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Card, PriceView, BorderButton } from '../ReuseableComponents';
import { Images, UIFont, fonts, fontSize, colors } from '../Assets';
import { widthRatio, heightRatio } from '../utility/utility';
import {AppConstants} from '../AppConstants';

export const ServiceCard = (props) => (
  <Card onPress={props.onPress} cardStyle={props.cardStyle}>
    <View style={[styles.packagesContainer, { marginTop: 15 }]}>
      <Text style={styles.packageName}>{props.packageName}</Text>
      {props.title &&
        <BorderButton
          title={props.title}
          borderColor={props.borderColor}
        />
      }
    </View>
    <View style={styles.packagesContainer}>
      <Text numberOfLines={props.numberOfLines} style={styles.description}>{props.description}</Text>
      <PriceView
        price={props.amount}
        priceViewStyle={{marginBottom : 15}}
      />
    </View>
    {props.children}
  </Card>
);


const styles = StyleSheet.create({
  packagesContainer: {
    flexDirection: 'row',
    marginHorizontal: 10
  },
  packageName: {
    marginRight: 10,
    ...UIFont.font(fonts.regular, fontSize.large, colors.purple)
  },
  description: {
    marginTop: 8,
    marginRight: 10,
    marginBottom: 15,
    flex: 1,
    ...UIFont.font(fonts.regular, fontSize.small, colors.placeholderColor)
  },
});