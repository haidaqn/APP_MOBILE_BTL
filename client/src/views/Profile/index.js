import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo'; // user,language
import Ionicons from 'react-native-vector-icons/Ionicons'; // notifications
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; // security,help-circle-outline
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; // payment
import { useDispatch, useSelector } from 'react-redux';
import userDefaultImage from '../../assets/user_default.png';
import { authActions } from '../auth/AuthSlice';
import LoginPage from '../auth/pages/LoginPage';

function Profile({ navigation }) {
    const { currentUser } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const handleLogout = () => {
        Toast.show({
            type: 'success',
            text1: 'Thông báo',
            text2: 'Bạn đã đăng xuất thành công 👋'
        });
        dispatch(authActions.logout());
    };

    const handleConfig = () => {
        Toast.show({
            type: 'info',
            text1: 'Thông báo',
            text2: 'Tính năng đang được phát triển 👋'
        });
    };

    return (
        <View className="bg-white w-full h-full">
            {currentUser?.name !== undefined ? (
                <View className="bg-white w-full h-full">
                    <View className="w-full flex-row py-2 justify-center items-center border-b border-gray-300">
                        <Text className="text-2xl font-medium">Profile</Text>
                    </View>
                    <View className="flex-row items-center justify-center mt-8 p-8">
                        <View className="bg-gray-100 h-[470px] w-full rounded-xl relative">
                            <View className="absolute rounded-full top-[-50px] left-[120px] bg-white">
                                <View style={{ borderWidth: 3, borderColor: '#0043F9', borderRadius: 50 }}>
                                    <Image source={userDefaultImage} className="w-[100px] h-[100px] z-10 rounded-full" />
                                </View>
                            </View>
                            <View className="absolute top-14 mt-1 flex-col items-center justify-center w-full">
                                <Text className="text-xl font-medium">{currentUser?.name}</Text>
                                <Text className="text-sm font-normal text-gray-500">{currentUser?.email}</Text>
                                <View className="mt-2 w-[85%]">
                                    <TouchableOpacity
                                        onPress={() => handleConfig()}
                                        className="flex-row items-center justify-between w-full border border-gray-400 py-[2px] rounded-lg mb-2"
                                    >
                                        <View className="my-1 flex-row items-center justify-start">
                                            <AntDesign
                                                name="user"
                                                style={{
                                                    fontSize: 18,
                                                    color: '#777777',
                                                    padding: 12,
                                                    borderRadius: 12
                                                }}
                                            />
                                            <Text className="text-lg font-normal capitalize">edit profile</Text>
                                        </View>
                                        <AntDesign
                                            name="right"
                                            style={{
                                                fontSize: 18,
                                                color: '#777777',
                                                padding: 12,
                                                borderRadius: 12
                                            }}
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('EditProfile')}
                                        className="flex-row items-center justify-between w-full border border-gray-400 py-[2px] rounded-lg mb-2"
                                    >
                                        <View className=" flex-row items-center justify-center">
                                            <MaterialIcons
                                                name="payment"
                                                style={{
                                                    fontSize: 18,
                                                    color: '#777777',
                                                    padding: 12,
                                                    borderRadius: 12
                                                }}
                                            />
                                            <Text className="text-lg font-normal capitalize">Đơn hàng đã đặt</Text>
                                        </View>
                                        <AntDesign
                                            name="right"
                                            style={{
                                                fontSize: 18,
                                                color: '#777777',
                                                padding: 12,
                                                borderRadius: 12
                                            }}
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => handleConfig()}
                                        className="flex-row items-center justify-between w-full border border-gray-400 py-[2px] rounded-lg mb-2"
                                    >
                                        <View className=" flex-row items-center justify-center">
                                            <Ionicons
                                                name="notifications"
                                                style={{
                                                    fontSize: 18,
                                                    color: '#777777',
                                                    padding: 12,
                                                    borderRadius: 12
                                                }}
                                            />
                                            <Text className="text-lg font-normal capitalize">Notification</Text>
                                        </View>
                                        <AntDesign
                                            name="right"
                                            style={{
                                                fontSize: 18,
                                                color: '#777777',
                                                padding: 12,
                                                borderRadius: 12
                                            }}
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => handleConfig()}
                                        className="flex-row items-center justify-between w-full border border-gray-400 py-[2px] rounded-lg mb-2"
                                    >
                                        <View className=" flex-row items-center justify-center">
                                            <MaterialCommunityIcons
                                                name="security"
                                                style={{
                                                    fontSize: 18,
                                                    color: '#777777',
                                                    padding: 12,
                                                    borderRadius: 12
                                                }}
                                            />
                                            <Text className="text-lg font-normal capitalize">Security</Text>
                                        </View>
                                        <AntDesign
                                            name="right"
                                            style={{
                                                fontSize: 18,
                                                color: '#777777',
                                                padding: 12,
                                                borderRadius: 12
                                            }}
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => handleConfig()}
                                        className="flex-row items-center justify-between w-full border border-gray-400 py-[2px] rounded-lg mb-2"
                                    >
                                        <View className=" flex-row items-center justify-center">
                                            <Entypo
                                                name="language"
                                                style={{
                                                    fontSize: 18,
                                                    color: '#777777',
                                                    padding: 12,
                                                    borderRadius: 12
                                                }}
                                            />
                                            <Text className="text-lg font-normal capitalize">Tiếng Việt</Text>
                                        </View>
                                        <AntDesign
                                            name="right"
                                            style={{
                                                fontSize: 18,
                                                color: '#777777',
                                                padding: 12,
                                                borderRadius: 12
                                            }}
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => handleLogout()}
                                        className="flex-row items-center justify-between w-full border border-gray-400 py-[2px] rounded-lg mb-2"
                                    >
                                        <View className=" flex-row items-center justify-center">
                                            <MaterialCommunityIcons
                                                name="logout"
                                                style={{
                                                    fontSize: 18,
                                                    color: '#777777',
                                                    padding: 12,
                                                    borderRadius: 12
                                                }}
                                            />
                                            <Text className="text-lg font-normal capitalize">Logout</Text>
                                        </View>
                                        <AntDesign
                                            name="right"
                                            style={{
                                                fontSize: 18,
                                                color: '#777777',
                                                padding: 12,
                                                borderRadius: 12
                                            }}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            ) : (
                <LoginPage />
            )}
        </View>
    );
}

export default Profile;
