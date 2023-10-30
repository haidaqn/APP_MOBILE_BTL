import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { handlePrice } from '../../../utils/handlePrice';
import Entypo from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';

const ProductItem = ({ route }) => {
    const { data } = route.params;
    const navigation = useNavigation();

    return (
        <View className="w-full h-full flex-col pt-4 px-4 items-center">
            <View className="relative">
                <Text className="text-xl font-medium ">Chi tiết đơn hàng</Text>
                <View className="w-full flex-row justify-between absolute top-[-10px] left-[-113px] z-10 ">
                    <TouchableOpacity onPress={() => navigation.goBack('EditProfile')}>
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
            <ScrollView className="mt-3">
                {data?.products?.map((item, index) => (
                    <View key={index} className="p-5 rounded-lg border w-full mb-4">
                        <Text className="text-lg font-medium mb-2">{item.product_id.title}</Text>
                        <View className="flex-row justify-between gap-20">
                            <Image source={{ uri: item.product_id.images[0] }} style={{ width: 125, height: 125 }} />
                            <View>
                                <Text className="textx-lg font-medium mb-2">{handlePrice(item.product_id.price)} VND</Text>
                                <Text>Số lượng : {item.count}</Text>
                            </View>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

export default ProductItem;
