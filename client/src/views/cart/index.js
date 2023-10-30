import { useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import orderApi from '../../apis/order';
import cartImg from '../../assets/cartimg.png';
import ModalCustom from '../../components/Customs/Modal';
import { cleanCart } from '../../features/Cart/cartSlice';
import { handlePrice } from '../../utils/handlePrice';
import CartItem from './Components/CartItem';

export default function Cart({ navigation }) {
    const { dataStore } = useSelector((state) => state.cart);
    const { currentUser } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [modalVisible, setModalVisible] = useState(false);
    const totalPrice = dataStore.reduce((sum, item) => sum + item.quantity * item.price, 0);

    const fetchData = async (data) => {
        const response = await orderApi.createOrder(data);
        if (response.success === true) {
            dispatch(cleanCart());
            setTimeout(() => {
                Toast.show({
                    type: 'success',
                    text1: 'Thành công',
                    text2: 'Đặt hàng thành công!'
                });
            }, 500);
        } else {
            setTimeout(() => {
                Toast.show({
                    type: 'error',
                    text1: 'Thất bại',
                    text2: 'Đặt hàng thất bại!'
                });
            }, 500);
        }
    };

    const handleCheckOut = async () => {
        if (currentUser?.name === undefined) {
            Toast.show({
                type: 'info',
                text1: 'Thông báo',
                text2: 'Bạn chưa đăng nhập !'
            });
            setTimeout(() => {
                navigation.navigate('Login');
            }, 500);
        } else if (currentUser?.address === undefined || currentUser?.address === 'Chưa có địa chỉ') setModalVisible(true);
        else fetchData(dataStore);
    };

    return (
        <View className="bg-white w-full h-full relative">
            {dataStore.length > 0 ? (
                <ScrollView showsVerticalScrollIndicator={false} className="h-full">
                    <ModalCustom setModalVisible={setModalVisible} modalVisible={modalVisible} />
                    <View className="w-full flex-row py-2 justify-center items-center border-b">
                        <Text className="text-2xl font-medium">Order Details</Text>
                    </View>
                    <View className="px-4 mt-2">
                        {dataStore.map((item, index) => (
                            <CartItem key={item.nameProduct + index} data={item} navigation={navigation} />
                        ))}
                    </View>
                    <Text className="pb-1 mt-3 text-[18px] font-medium px-4 ">Delivery Location</Text>
                    <View className="flex-row items-center justify-between px-4 ">
                        <View className="flex-row items-center gap-2 ">
                            <View className="text-[#0043F9] bg-backgroundLight p-3 rounded-lg flex-row justify-center items-center">
                                <Entypo
                                    name="address"
                                    style={{
                                        fontSize: 24,
                                        color: '#0043F9'
                                    }}
                                />
                            </View>
                            <View className="flex-col ">
                                <Text className="text-base font-semibold">{currentUser?.name === undefined ? 'Chưa đăng nhập' : currentUser.name}</Text>
                                <Text className="text-sm text-gray-400">{currentUser?.address === undefined ? 'Chưa có địa chỉ' : currentUser.address}</Text>
                            </View>
                        </View>
                        <MaterialCommunityIcons name="chevron-right" style={{ fontSize: 25, color: '#000000' }} />
                    </View>
                    <Text className="pt-4 pb-1 text-[18px] font-medium px-4 ">Payment Method</Text>
                    <View className="flex-row items-center justify-between px-4 ">
                        <View className="flex-row items-center gap-2">
                            <View className="text-[#0043F9] bg-backgroundLight p-3 rounded-lg flex-row justify-center items-center">
                                <Entypo
                                    name="credit-card"
                                    style={{
                                        fontSize: 24,
                                        color: '#0043F9'
                                    }}
                                />
                            </View>
                            <Text className="text-base font-semibold">Thanh toán khi nhận hàng</Text>
                        </View>
                        <MaterialCommunityIcons name="chevron-right" style={{ fontSize: 25, color: '#000000' }} />
                    </View>
                    <Text className="mt-3 pb-1 text-[18px] font-medium border-t border-gray-300 mx-4">Order Info</Text>
                    <View className="flex-row mt-2 justify-between items-center px-4 ">
                        <Text className="text-gray-400 text-base">Subtotal</Text>
                        <Text className="text-lg font-medium">{handlePrice(totalPrice)} VND</Text>
                    </View>
                    <View className="h-[40px] my-1 w-full justify-center items-center flex-row">
                        <TouchableOpacity
                            onPress={() => handleCheckOut()}
                            className="w-[86%] h-[90%] bg-[#0043F9] rounded-[20px] flex-row items-center justify-center"
                        >
                            <Text className="text-[18px] text-white font-medium">CHECKOUT</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            ) : (
                <View className="w-full flex-col justify-center items-center h-full gap-3">
                    <Image source={cartImg} className="h-[360px] w-[500px] object-cover" />
                    <Text className="text-xl font-medium">Giỏ hàng rỗng!</Text>
                    <Text className="w-[60%] text-center text-gray-500">Thêm các mặt hàng mà bạn yêu thích vào giỏ hàng và đặt hàng tại đây!</Text>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Text className="border border-[#0043F9] text-[#0043F9] uppercase font-medium px-3 py-2">Tiếp tục xem sản phẩm</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}
