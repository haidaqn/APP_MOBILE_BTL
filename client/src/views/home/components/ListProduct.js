import React from 'react';
import { Text, View } from 'react-native';
import ProductCart from '../../../components/Common/ProductCart';

const ListProduct = ({ data, navigate }) => {
    const handleListProducts = (data, name) => {
        navigate.navigate('ListProducts', { data: data, name: name });
    };

    return (
        <View className="p-1 flex flex-col gap-3">
            {data?.map((item, index) => (
                <View key={item.title} className="">
                    <View className="flex-row justify-between items-center">
                        <View className="flex-row gap-2 items-center">
                            <Text className="text-[18px] font-medium">{item.title}</Text>
                            <Text className="text-[14px] font-normal">{item.product.length}</Text>
                        </View>
                        <Text onPress={() => handleListProducts(item.product, item.title)} className="text-[14px] font-medium text-blueCustom uppercase ">
                            See All
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            justifyContent: 'space-around'
                        }}
                    >
                        {item.product.slice(0, 2).map((item, index) => (
                            <ProductCart data={item} key={index} />
                        ))}
                    </View>
                </View>
            ))}
        </View>
    );
};

export default ListProduct;
