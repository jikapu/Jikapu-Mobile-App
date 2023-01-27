import PropTypes from 'prop-types';
import React from 'react';
import { Image } from 'react-native';
import { home, settings,profile,cart,shoppingBag } from '@/assets';
import { NAVIGATION } from '@/constants';

const tabIcon = {
  [NAVIGATION.home]: home,
  [NAVIGATION.profile]: profile,
  [NAVIGATION.jFreshCart]:cart ,
  [NAVIGATION.cart]:shoppingBag,
  [NAVIGATION.settings]: settings,
};

export function TabBarIcon({ color, routeName }) {
  return (
    <Image
      accessibilityIgnoresInvertColors
      source={tabIcon[routeName]}
      style={{ tintColor: color }}
    />
  );
}

TabBarIcon.propTypes = {
  color: PropTypes.string.isRequired,
  routeName: PropTypes.string.isRequired,
};
