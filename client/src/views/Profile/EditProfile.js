import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import orderApi from '../../apis/order';
import Entypo from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
import { OrderItem } from './Components/OrderItem';

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
                {data?.map((item, index) => (
                    <OrderItem key={index} data={item} index={index} />
                ))}
            </ScrollView>
        </View>
    );
};

export default EditProfile;
