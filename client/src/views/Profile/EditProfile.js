import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import orderApi from '../../apis/order';
import Entypo from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
import { OrderItem } from './Components/OrderItem';
import cartImg from '../../assets/cartimg.png';

const EditProfile = () => {
    const [data, setData] = useState([]);
    const navigation = useNavigation();
    const fetchData = async () => {
        const response = await orderApi.getOrderByUser();
        if (response?.success) {
            setData(response.response);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <View className="w-full h-full flex-col pt-4 px-4 items-center">
            <View className="relative">
                <Text className="text-xl font-medium ">Đơn hàng đã đặt</Text>
                <View className="w-full flex-row justify-between absolute top-[-10px] left-[-113px] z-10 ">
                    <TouchableOpacity onPress={() => navigation.goBack('Home')}>
                        <Entypo
                            name="chevron-left"
                            style={{
                                fontSize: 20,
                                padding: 8,
                                borderRadius: 10,
                                backgroundColor: '#adadaf'
                            }}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView className="w-full h-auto mt-2">
                {data.length ? (
                    <>
                        {data?.map((item, index) => (
                            <OrderItem key={index} data={item} index={index} />
                        ))}
                    </>
                ) : (
                    <View className="w-full flex-col justify-center items-center h-full gap-3">
                        <Image source={cartImg} className="h-[360px] w-[500px] object-cover" />
                        <Text className="text-xl font-medium">Bạn chưa mua đơn hàng nào!</Text>
                        <Text className="w-[60%] text-center text-gray-500">Thêm các mặt hàng mà bạn yêu thích vào giỏ hàng và đặt hàng tại đây!</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                            <Text className="border border-[#0043F9] text-[#0043F9] uppercase font-medium px-3 py-2">Tiếp tục xem sản phẩm</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </ScrollView>
        </View>
    );
};

export default EditProfile;
