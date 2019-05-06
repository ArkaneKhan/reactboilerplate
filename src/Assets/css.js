import { StyleSheet } from 'react-native';
import { colors } from './colors';

export const css = StyleSheet.create({
  dropShadow: {
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowColor: colors.black,
    elevation: 5
  },
  paginationActive: {
    width: 40,
    height: 7,
    borderRadius: 7,
    backgroundColor: colors.lightBlue,
  },
  paginationNonActive: {
    width: 7,
    height: 7,
    borderRadius: 10,
    backgroundColor: colors.darkGrey
  }
})

export const headerStyle = (userType) => {
  let color, backgroundColor, contentStyle
  if (userType === 1) {
    color = colors.lightBlack
    backgroundColor = colors.white
    contentStyle = 'light-content'

  } else {
    color = colors.white
    backgroundColor = colors.themeColor
    contentStyle = 'dark-content'
  }
  return { color, backgroundColor }
}