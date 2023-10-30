import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput, ActivityIndicator } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Toast from 'react-native-toast-message';
import userApi from '../../apis/user';
import { useDispatch } from 'react-redux';
import { authActions } from '../../views/auth/AuthSlice';

const ModalCustom = ({ modalVisible, setModalVisible }) => {
    const closeModal = () => {
        setModalVisible(false);
    };
    const dispatch = useDispatch();
    const [address, setAddress] = useState('');
    const [loading, setLoading] = useState(false);

    const handleOverlayPress = () => {
        closeModal();
    };

    const handleUpdateAddress = async () => {
        const response = await userApi.setAddress(address);
        // console.log(response)
        if (response.success === true) {
            dispatch(authActions.setAddress(address));
            setAddress('');
            Toast.show({
                type: 'success',
                text1: 'Thành công',
                text2: 'Cập nhật địa chỉ thành công !'
            });
        } else {
            Toast.show({
                type: 'error',
                text1: 'Thất bại',
                text2: 'Cập nhật địa chỉ thất bại !'
            });
        }
        closeModal();
    };

    return (
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
            <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={handleOverlayPress}>
                <View
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)' // Màu đen nhạt
                    }}
                />
                <View className="bg-white p-[20px] rounded-md w-[90%] relative">
                    <View className="absolute top-2 right-2 bg-gray-300 rounded-lg" onPress={() => closeModal()}>
                        <AntDesign name="close" style={{ fontSize: 25, color: '#000000' }} />
                    </View>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Address</Text>
                    <Text>Cập nhật địa chỉ của bạn để tiến hành mua hàng !!</Text>
                    <View className="border mt-3 rounded-sm">
                        <TextInput className="py-1 px-2 " value={address} onChangeText={setAddress} placeholder="Đông Anh Hà Nội"></TextInput>
                    </View>
                    <View className="relative h-[40px]">
                        <TouchableOpacity className="absolute right-0 w-1/4 flex-row items-center justify-center" onPress={handleUpdateAddress}>
                            <Text style={{ backgroundColor: 'red', color: 'white', padding: 10, borderRadius: 5, marginTop: 10 }}>Cập nhật</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
            {loading && (
                <View
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)' // Màu đen nhạt
                    }}
                    className="flex-col items-center justify-center"
                >
                    <ActivityIndicator size="large" color="#FF5733" />
                </View>
            )}
        </Modal>
    );
};

export default ModalCustom;
