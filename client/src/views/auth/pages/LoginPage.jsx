import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Avatar, Button, ProgressBar, Title } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { TextField } from '../../../components/FormControls';
import PasswordField from '../../../components/FormControls/PasswordField';
import { authActions } from '../AuthSlice';
const styles = StyleSheet.create({
    container: {
        marginTop: StatusBar.currentHeight // Adjust the marginTop to create space for the status bar
    }
});
function LoginPage() {
    const { actionAuth, logging } = useSelector((state) => state.auth);
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const InitialLoginForm = {
        email: '',
        password: ''
    };
    const schema = yup.object().shape({
        email: yup.string().email().required('Nhập Email'),
        password: yup.string().required('Cần nhập mật khẩu')
    });
    useEffect(() => {
        if (actionAuth == 'Failed') {
            Toast.show({
                type: 'error',
                text1: 'Thất bại',
                text2: 'Email hoặc mật khẩu không chính xác'
            });
        }
    }, [actionAuth]);
    const form = useForm({
        defaultValue: InitialLoginForm,
        resolver: yupResolver(schema)
    });
    const onSubmit = (data) => {
        // Toast.show({
        //     type: 'success',
        //     text1: 'Thông báo',
        //     text2: 'Bạn đã đăng nhập thành công 👋'
        // });
        dispatch(authActions.login(data));
        // console.log(data);
        // navigation.navigate('AppLayout');
    };
    return (
        <SafeAreaView className="bg-white">
            <StatusBar backgroundColor="transparent" translucent={true} barStyle="dark-content" />
            <View style={styles.container}>
                {logging && <ProgressBar indeterminate={true} className="fixed top-0 left-0 w-screen" />}
                <View className="p-[30px] h-screen bg-white ">
                    <Toast position="top" />
                    <View className="mt-[10vh] h-[100%]">
                        <View className="flex mb-[20px] justify-center items-center">
                            <Avatar.Icon size={40} icon="lock" />
                            <Title className="text-3xl mt-[10px]  text-black">Đăng nhập</Title>
                        </View>
                        <FormProvider {...form}>
                            <TextField name="email" label="Email" />
                            <PasswordField name="password" label="Mật khẩu" />
                            <Button
                                style={{
                                    borderBottomLeftRadius: 6,
                                    borderBottomRightRadius: 6,
                                    borderTopLeftRadius: 6,
                                    borderTopRightRadius: 6
                                }}
                                mode="contained"
                                className="my-3"
                                disabled={logging}
                                onPress={form.handleSubmit(onSubmit)}
                            >
                                Đăng nhập
                            </Button>
                        </FormProvider>
                        <View className="flex justify-between flex-row mt-1">
                            <TouchableOpacity>
                                <Text className="text-blue-600 text-base underline"></Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                                <Text className="text-blue-600 text-base underline">Đăng ký ngay</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}

export default LoginPage;
