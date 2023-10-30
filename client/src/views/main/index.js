import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import productApi from '../../apis/product';
import ProductInfo from '../../components/Common/ProductInfo';
import AppLayout from '../../components/Layouts/AppLayout';
import { setAccessories, setLaptop, setSmartPhone, setTablet } from '../../features/Product/productSlice';
import LoginPage from '../auth/pages/LoginPage';
import RegisterPage from '../auth/pages/RegisterPage';
import PostInfo from '../Post/Components/PostInfo';
import ListProducts from '../productList/index';
import EditProfile from '../Profile/EditProfile';
import ProductItem from '../Profile/Components/ProductItem';

export default function Main() {
    const dispatch = useDispatch();

    const Stack = createStackNavigator();
    const fetchData = async () => {
        try {
            const [smart, accessories, laptop, tablet] = await Promise.all([
                productApi.getProductSmart(),
                productApi.getProductAccessories(),
                productApi.getProductLaptop(),
                productApi.getProductTablet()
            ]);
            dispatch(setAccessories(accessories));
            dispatch(setLaptop(laptop));
            dispatch(setSmartPhone(smart));
            dispatch(setTablet(tablet));
        } catch (err) {
            console.error(err);
        }
    };
    useEffect(() => {
        
        fetchData();
    }, []);
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false
                    }}
                >
                    <Stack.Screen name="AppLayout" component={AppLayout} />
                    <Stack.Screen name="ProductInfo" component={ProductInfo} />
                    <Stack.Screen name="PostInfo" component={PostInfo} />
                    <Stack.Screen name="ListProducts" component={ListProducts} />
                    <Stack.Screen name="Register" component={RegisterPage} />
                    <Stack.Screen name="Login" component={LoginPage} />
                    <Stack.Screen name="EditProfile" component={EditProfile} />
                    <Stack.Screen name="ProductItem" component={ProductItem} />
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaView>
    );
}
