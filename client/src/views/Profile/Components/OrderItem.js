import React from 'react';
import { View, Text } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { handlePrice } from '../../../utils/handlePrice';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';

export const OrderItem = ({ data, index }) => {
    return (
        <View className="border rounded-md p-2 mb-3">
            <View className="flex-row items-center justify-between mb-1">
                <Text>Đơn hàng thứ {index + 1}</Text>
                <View className="gap-1 flex-row items-center">
                    <FontAwesome
                        name="circle"
                        style={{
                            fontSize: 12,
                            color: `${data.status === 'Processing' ? '#00AC76' : '#C04345'}`
                        }}
                    />
                    <Text className={` ${data.status === 'Processing' ? 'text-[#00AC76]' : 'text-[#C04345]'} text-[12px]`}>{data.status}</Text>
                </View>
            </View>
            <View className="flex-row items-center justify-between">
                <Text>
                    {handlePrice(data.total)} <Text className="font-medium">VND</Text>
                </Text>
                <Text>{dayjs(data.createdAt).format('DD-MM-YYYY')}</Text>
            </View>
        </View>
    );
};
