import React, { memo, useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import productApi from '../../apis/product';
import { handlePrice } from '../../utils/handlePrice';
import BannerCustom from '../Customs/BannerCustom';
import Toast from 'react-native-toast-message';
import { setAddToCart } from '../../features/Cart/cartSlice';
import { useDispatch } from 'react-redux';

const ProductInfo = ({ route, navigation }) => {
    const { productID, randomCoupon } = route.params;
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();
    const [productDetail, setProductDetail] = useState(null);

    const handleAddToCart = () => {
        dispatch(
            setAddToCart({
                id: productDetail._id,
                nameProduct: productDetail.title,
                price: productDetail.price,
                quantity: 1,
                image: productDetail.thumb,
                type: false
            })
        );
        Toast.show({
            type: 'success',
            text1: 'Thông báo',
            text2: 'Thêm vào giỏ hàng thành công 👋'
        });
    };

    useEffect(() => {
        try {
            const fetchData = async () => {
                const response = await productApi.getDetailProduct(productID);
                if (response?.success) {
                    setProductDetail(response.product);
                    setIsLoading(false);
                }
            };
            fetchData();
        } catch (err) {
            console.log(err);
        }
    }, [productID]);

    return (
        <View>
            {isLoading ? (
                <View className="w-full h-full flex-row items-center justify-center">
                    <ActivityIndicator size={60} color="#FF5733" />
                </View>
            ) : (
                <View className="w-full h-full bg-white relative">
                    <StatusBar className="bg-[#ffffff]" barStyle="light-content" />
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View className="w-full bg-white rounded-b-lg relative items-center justify-center mb-1">
                            <View className="w-full flex-row justify-between absolute top-3 left-3 z-10 ">
                                <TouchableOpacity onPress={() => navigation.goBack('Home')}>
                                    <Entypo
                                        name="chevron-left"
                                        style={{
                                            fontSize: 18,
                                            padding: 12,
                                            borderRadius: 10,
                                            backgroundColor: '#adadaf'
                                        }}
                                    />
                                </TouchableOpacity>
                            </View>
                            <View className="h-[35vh] bg-gray-300 rounded-b-3xl">
                                <BannerCustom imgs={productDetail?.images} />
                            </View>
                        </View>
                        <View className="p-4">
                            <View className="flex-row gap-1 items-center w-[110px]">
                                <Entypo
                                    name="shopping-cart"
                                    style={{
                                        fontSize: 18,
                                        color: '#0043F9',
                                        marginRight: 6
                                    }}
                                />
                                <Text className="text-[#0043F9] font-medium text-base w-fit">Shopping</Text>
                            </View>
                            <View className="flex-row justify-between items-center">
                                <Text className="text-xl font-medium">
                                    {productDetail.title.length > 26 ? `${productDetail.title.slice(0, 24)}...` : productDetail.title}
                                </Text>
                                <Ionicons
                                    name="link-outline"
                                    style={{
                                        fontSize: 24,
                                        color: '#0043F9',
                                        backgroundColor: '#0043F9' + 10,
                                        padding: 8,
                                        borderRadius: 100
                                    }}
                                />
                            </View>
                            <View className="flex-col gap-[2px]">
                                {productDetail.description.slice(0, 10).map((item) => (
                                    <Text key={item} className="text-[13px] text-gray-500">
                                        {item}
                                    </Text>
                                ))}
                            </View>
                            <View className="mt-2 border-t border-gray-700">
                                <View className="flex-row items-center justify-between">
                                    <Text className="text-xl line-through text-gray-700">{handlePrice(productDetail.price)} VND</Text>
                                    <TouchableOpacity onPress={() => navigation.goBack('Home')}>
                                        <Entypo
                                            name="arrow-right"
                                            style={{
                                                fontSize: 18,
                                                padding: 12,
                                                borderRadius: 10
                                            }}
                                        />
                                    </TouchableOpacity>
                                    <Text className="text-xl">{handlePrice((+productDetail.price * (100 - randomCoupon)) / 100)} VND</Text>
                                </View>
                                <Text className="text-base text-gray-500 mt-[-6px]">Discount: {randomCoupon} %</Text>
                            </View>
                        </View>
                    </ScrollView>
                    <View
                        style={{
                            position: 'absolute',
                            bottom: 10,
                            height: '8%',
                            width: '100%',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <TouchableOpacity
                            onPress={() => (productDetail.quantity ? handleAddToCart() : null)}
                            style={{
                                width: '86%',
                                height: '90%',
                                backgroundColor: '#0043F9',
                                borderRadius: 20,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 12,
                                    fontWeight: '500',
                                    letterSpacing: 1,
                                    color: '#ffffff',
                                    textTransform: 'uppercase'
                                }}
                            >
                                {productDetail.quantity ? 'Add to cart' : 'Not Avialable'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </View>
    );
};
export default memo(ProductInfo);
