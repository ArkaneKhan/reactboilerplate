import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { Images, UIFont, fonts, fontSize, colors, css } from '../../../Assets';
import { AppConstants } from '../../../AppConstants';
import Scheduled from './Scheduled';
import Completed from './Completed';
import { Statusbar } from '../../../ReuseableComponents';

// import { connect } from 'react-redux';
// import {getServiceProviders} from '../../../Store/Action';

class MyBookings extends Component {

  state = {
    tab: 1,
  }

  render() {
    return (
      <View style={styles.container}>
        <Statusbar color={colors.white} contentStyle={'dark-content'} />
        <View style={styles.tabContainer}>
          <TouchableOpacity
            onPress={() => this.setState({ tab: 1 })}
            style={[styles.tab, { borderBottomColor: this.state.tab === 1 ? colors.themeColor : colors.placeholderColor }]}>
            <Text style={[styles.tabText, { color: this.state.tab === 1 ? colors.themeColor : colors.placeholderColor }]}>{AppConstants.schedule}</Text>
          </TouchableOpacity >
          <TouchableOpacity
            onPress={() => this.setState({ tab: 2 })}
            style={[styles.tab, { borderBottomColor: this.state.tab === 2 ? colors.themeColor : colors.placeholderColor }]}>
            <Text style={[styles.tabText, { color: this.state.tab === 2 ? colors.themeColor : colors.placeholderColor }]}>{AppConstants.completed}</Text>
          </TouchableOpacity>
        </View>
        {this.state.tab === 1 ?
          <Scheduled />
          :
          <Completed />
        }
      </View>
    );
  }
}

export default MyBookings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgGrey,
  },
  tabContainer: {
    flexDirection: 'row',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 2,
    paddingVertical: 5,
  },
  tabText: {
    ...UIFont.font(fonts.regular, fontSize.large, colors.placeholderColor),
  },
});