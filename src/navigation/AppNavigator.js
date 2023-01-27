import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//import { useTheme } from '@react-navigation/native';
import React from 'react';
import { TabBarIcon } from '@/components';
import { COLORS, NAVIGATION } from '@/constants';
import { HomeNavigator } from '@/navigation/HomeNavigator';
import { ProfileNavigator } from '@/navigation/ProfileNavigator';
import { CartNavigator } from '@/navigation/CartNavigator';
import { SettingsNavigator } from '@/navigation/SettingsNavigator';
import { JFreshCartNavigator} from '@/navigation/JFreshCartNavigator';
import { useSelector, useDispatch } from "react-redux";

const Tab = createBottomTabNavigator();

export function AppNavigator() {
  const { cartData = {} } = useSelector((state) => state.user);
  const { jFreshData = {} } = useSelector((state) => state.user);
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => <TabBarIcon color={color} routeName={route.name} />,
      })}
      initialRouteName={NAVIGATION.home}
      tabBarOptions={{
        activeTintColor: COLORS.PRIMARY,
        inactiveTintColor: COLORS.ARROW,
        showLabel: false,
        style: {
          // height:70,
          paddingTop: 0,
        }
      }}
    >
      <Tab.Screen name={NAVIGATION.home} component={HomeNavigator} />
      <Tab.Screen name={NAVIGATION.profile} component={ProfileNavigator} />
      <Tab.Screen name={NAVIGATION.cart} component={CartNavigator} options={{ tabBarBadge: cartData?.totalQuantity, tabBarBadgeStyle: { color: "white", backgroundColor: cartData?.totalQuantity > 0 ? COLORS.PRIMARY : COLORS.WHITE, fontSize: 10 } }} />
      <Tab.Screen name={NAVIGATION.jFreshCart} component={JFreshCartNavigator} options={{ tabBarBadge: jFreshData?.totalQuantity, tabBarBadgeStyle: { color: "white", backgroundColor: jFreshData?.totalQuantity > 0 ? COLORS.PRIMARY : COLORS.WHITE, fontSize: 10 } }} />
      <Tab.Screen name={NAVIGATION.settings} component={SettingsNavigator} />
    </Tab.Navigator>
  );
}
