import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import Profile from '../../views/Profile/index';
import Cart from '../../views/cart/index';
import Home from '../../views/home/index';
import Search from '../../views/search/index';
import { BagBold, SearchBold, SearchOutline, BagOutline, MessageBold, MessageOutline, ShopBold, ShopOutline, UserBold, UserOutline } from '../Icons';
const Tab = createBottomTabNavigator();

const icon = () => {
    return <View></View>;
};

const iconComponents = {
    Home: { focused: ShopBold, unfocused: ShopOutline },
    Cart: { focused: BagBold, unfocused: BagOutline },
    Search: { focused: SearchBold, unfocused: SearchOutline },
    Profile: { focused: UserBold, unfocused: UserOutline }
};
function Navbar() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarHideOnKeyboard: true,
                tabBarIcon: ({ color, focused, size }) => {
                    const IconComponent = focused ? iconComponents[route.name].focused : iconComponents[route.name].unfocused;
                    return <IconComponent color={color} size={size} />;
                },
                tabBarStyle: {
                    height: 55,
                    paddingTop: 10
                }
            })}
        >
            <Tab.Screen
                name="Home"
                options={({ navigation }) => ({
                    tabBarLabelStyle: {
                        fontWeight: navigation.isFocused() ? '600' : '400',
                        fontSize: 14,
                        marginTop: 6,
                        paddingBottom: 4
                    },
                    headerShown: false
                })}
                component={Home}
            />

            <Tab.Screen
                name="Search"
                options={({ navigation }) => ({
                    tabBarLabelStyle: {
                        fontWeight: navigation.isFocused() ? '700' : '400',
                        fontSize: 14,
                        marginTop: 6,
                        paddingBottom: 4
                    },
                    headerShown: false
                })}
                component={Search}
            />
            <Tab.Screen
                name="Cart"
                options={({ navigation }) => ({
                    tabBarLabelStyle: {
                        fontWeight: navigation.isFocused() ? '600' : '400',
                        fontSize: 14,
                        marginTop: 6,
                        paddingBottom: 4
                    },
                    headerShown: false
                })}
                component={Cart}
            />

            <Tab.Screen
                name="Profile"
                options={({ navigation }) => ({
                    tabBarLabelStyle: {
                        fontWeight: navigation.isFocused() ? '600' : '400',
                        fontSize: 14,
                        marginTop: 6,
                        paddingBottom: 4
                    },
                    headerShown: false
                })}
                component={Profile}
            />
        </Tab.Navigator>
    );
}

export default Navbar;
