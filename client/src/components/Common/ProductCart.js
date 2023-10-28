import React from 'react';
import { Image, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { handlePrice } from '../../utils/handlePrice';
import { useNavigation } from '@react-navigation/native';

const ProductCart = ({ data }) => {
    const randomCoupon = Math.round(Math.random() * 12) + 1;
    const navigation = useNavigation();
    return (
        <>
            {data ? (
                <>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('ProductInfo', { productID: data._id, randomCoupon: randomCoupon })}
                        style={{
                            width: '48%',
                            marginVertical: 14
                        }}
                    >
                        <View className="w-full h-[100px] rounded-2xl bg-gray-300 relative items-center justify-center mb-2 ">
                            <View className="absolute w-[20%] h-[24%] rounded-tl-2xl rounded-br-2xl bg-green-500 top-0 left-0  flex-row items-center justify-center">
                                <Text className="text-[12px] text-white font-normal">{randomCoupon}%</Text>
                            </View>
                            <Image
                                source={{ uri: `${data.images[0] || data.thumb}` }}
                                style={{
                                    width: '80%',
                                    height: '80%',
                                    resizeMode: 'contain'
                                }}
                            />
                        </View>
                        <View className="ml-2">
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center'
                                }}
                            >
                                <FontAwesome
                                    name="circle"
                                    style={{
                                        fontSize: 12,
                                        color: `${data.quantity ? '#00AC76' : '#C04345'}`
                                    }}
                                />
                                <Text className={`${data.quantity ? 'text-[#00AC76]' : 'text-[#C04345]'} text-[12px]`}>
                                    {data.quantity ? 'Available' : 'Unavailable'}
                                </Text>
                            </View>
                            <Text className="text-[12px] text-black font-semibold ">{data?.title}</Text>
                            <Text className="text-[14px]">{handlePrice(data.price)} VND</Text>
                        </View>
                    </TouchableOpacity>
                </>
            ) : (
                <>
                    <View className="w-full h-full flex-row items-center justify-center">
                        <ActivityIndicator size={60} color="#FF5733" />
                    </View>
                </>
            )}
        </>
    );
};
export default ProductCart;
