import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { handlePrice } from '../../../utils/handlePrice';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import { useNavigation } from '@react-navigation/native';

export const OrderItem = ({ data, index }) => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity onPress={() => navigation.navigate('ProductItem', { data: data })}>
            <View className="border rounded-md p-2 mb-3">
                <View className="flex-row items-center justify-between mb-1">
                    <Text>Đơn hàng thứ {index + 1}</Text>
                    <View className="gap-1 flex-row items-center">
                        <FontAwesome
                            name="circle"
                            style={{
                                fontSize: 12,
                                color: `${data.status === 'Cancelled' ? '#C04345' : data.status === 'Processing' ? '#88894e' : '#00AC76'}`
                            }}
                        />
                        <Text
                            className={` ${
                                data.status === 'Cancelled' ? 'text-[#C04345]' : data.status === 'Processing' ? 'text-[#88894e]' : 'text-[#00AC76]'
                            } text-[12px]`}
                        >
                            {data.status}
                        </Text>
                    </View>
                </View>
                <View className="flex-row items-center justify-between">
                    <Text>
                        {handlePrice(data.total)} <Text className="font-medium">VND</Text>
                    </Text>
                    <Text>{dayjs(data.createdAt).format('DD-MM-YYYY')}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};
