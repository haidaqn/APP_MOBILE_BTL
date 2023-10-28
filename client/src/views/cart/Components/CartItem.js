import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { handlePrice } from '../../../utils/handlePrice';
import { useDispatch } from 'react-redux';
import { deleteCart, removerCart, setAddToCart } from '../../../features/Cart/cartSlice';
import Toast from 'react-native-toast-message';

export default function CartItem({ data, navigation }) {
    const dispatch = useDispatch();

    const handleRemove = () => {
        dispatch(removerCart(data));
        Toast.show({
            type: 'success',
            text1: 'Thông báo',
            text2: 'Xóa sản phẩm thành công 👋'
        });
    };

    const handleDeleteCart = () => {
        data.quantity === 1 ? dispatch(removerCart(data)) : dispatch(deleteCart(data));
    };

    const handleAddToCart = () => {
        dispatch(setAddToCart(data));
    };

    return (
        <TouchableOpacity
            className="w-full h-[140px]"
            onPress={() => navigation.navigate('ProductInfo', { productID: data.id, randomCoupon: Math.round(Math.random() * 10) })}
        >
            <View className="border-b border-gray-300 flex-row">
                <View className="pr-3">
                    <Image source={{ uri: `${data.image}` }} className="flex-1 object-contain w-[95px] z-10" />
                </View>
                <View className="flex-col flex-2 gap-5 w-full">
                    <View className="flex-col gap-1 justify-around">
                        <Text className="text-xl font-medium">{data.nameProduct}</Text>
                        <Text className="">{handlePrice(data.price)} VND</Text>
                    </View>
                    <View className="flex-row justify-between items-center pr-5 pb-3">
                        <View className="flex-row gap-2 items-center">
                            <TouchableOpacity onPress={() => handleDeleteCart()}>
                                <MaterialCommunityIcons
                                    name="minus"
                                    style={{
                                        fontSize: 18,
                                        color: '#777777',
                                        padding: 4,
                                        backgroundColor: '#F0F0F3',
                                        borderRadius: 12
                                    }}
                                />
                            </TouchableOpacity>
                            <Text className="">{data.quantity}</Text>
                            <TouchableOpacity onPress={() => handleAddToCart()}>
                                <MaterialCommunityIcons
                                    name="plus"
                                    style={{
                                        fontSize: 18,
                                        color: '#777777',
                                        padding: 4,
                                        backgroundColor: '#F0F0F3',
                                        borderRadius: 12
                                    }}
                                />
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity onPress={() => handleRemove()}>
                                <MaterialCommunityIcons
                                    name="delete-outline"
                                    style={{
                                        fontSize: 16,
                                        color: '#777777',
                                        backgroundColor: '#F0F0F3',
                                        padding: 8,
                                        borderRadius: 100
                                    }}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}
