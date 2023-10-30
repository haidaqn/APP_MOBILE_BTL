import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { View, Text, TouchableOpacity, SafeAreaView, StatusBar, StyleSheet, ScrollView, KeyboardAvoidingView } from 'react-native';
import * as yup from 'yup';
import { TextField } from '../../../components/FormControls';
import { yupResolver } from '@hookform/resolvers/yup';
import { Avatar, Button, ProgressBar, Title } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../AuthSlice';
import PasswordField from '../../../components/FormControls/PasswordField';
import Toast from 'react-native-toast-message';

const styles = StyleSheet.create({
    container: {
        marginTop: StatusBar.currentHeight // Adjust the marginTop to create space for the status bar
    }
});
function RegisterPage({}) {
    const { actionAuth, currentUser } = useSelector((state) => state.auth);
    const navigation = useNavigation();

    const dispatch = useDispatch();

    const InitialResgisterForm = {
        email: '',
        password: '',
        sdt: '',
        accountName: ''
    };
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
    const schema = yup.object().shape({
        name: yup
            .string()
            .required('Hãy nhập tên đầy đủ của bạn')
            .test('Họ và tên nên gồm 2 từ trở lên', 'Họ và tên nên gồm ít nhất 2 từ không bao gồm chữ số', (value) => {
                const words = value.trim().split(' ');
                return words.length >= 2 && words.every((word) => !/\d/.test(word));
            }),
        email: yup.string().email().required('Nhập Email'),
        phoneNumber: yup.string().required('Điền số điện thoại').matches(phoneRegExp, 'Số điện thoại không hợp lệ').min(9, 'Quá ngắn').max(11, 'Quá dài'),
        password: yup
            .string()
            .required('Nhập mật khẩu')
            .min(8, 'Mật khẩu phải dài hơn 8 kí tự')
            .max(32, 'Mật khẩu quá dài')
            .matches(/[A-Z]+/, 'Mật khẩu cần ít nhất 1 kí tự in hoa')
            .matches(/[a-z]+/, 'Mật khẩu cần ít nhất 1 kí tự in thường'),
        rePassword: yup
            .string()
            .required('Nhập lại mật khẩu')
            .oneOf([yup.ref('password')], 'Mật khẩu không khớp')
    });
    const form = useForm({
        defaultValue: InitialResgisterForm,
        resolver: yupResolver(schema)
    });

    React.useEffect(() => {
        if (actionAuth == 'Failed') {
            Toast.show({
                type: 'error',
                text1: 'Thất bại',
                text2: 'Đăng ký thất bại'
            });
        }
        if (actionAuth == 'Success') {
            Toast.show({
                type: 'success',
                text1: 'Thành công',
                text2: 'Đăng ký thành công'
            });
            navigation.replace('AppLayout');
        }
    }, [actionAuth]);

    const onSubmit = (data) => {
        const dataNew = {
            name: data.name,
            email: data.email,
            mobile: data.phoneNumber,
            password: data.password
        };
        dispatch(authActions.register(dataNew));
    };

    return (
        <SafeAreaView className="bg-white">
            <StatusBar backgroundColor="transparent" translucent={true} barStyle="dark-content" />
            <ScrollView style={styles.container}>
                <View>
                    {/* {registering && <ProgressBar indeterminate={true} className="fixed top-0 left-0 w-screen" />} */}
                    <View className="p-[30px] h-screen bg-white ">
                        <Toast position="top" />
                        <View className="h-[100%]">
                            <View className="flex mb-[20px] justify-center items-center">
                                <Avatar.Icon size={40} icon="lock" />
                                <Title className="text-3xl mt-[10px]  text-black">Đăng kí</Title>
                            </View>
                            <FormProvider {...form}>
                                <TextField name="name" label="Họ và tên" />
                                <TextField name="email" label="Email" />
                                <TextField name="phoneNumber" label="Số điện thoại" />
                                <PasswordField name="password" label="Mật khẩu" />
                                <PasswordField name="rePassword" label="Nhập lại mật khẩu" />
                                <Button
                                    style={{
                                        borderBottomLeftRadius: 6,
                                        borderBottomRightRadius: 6,
                                        borderTopLeftRadius: 6,
                                        borderTopRightRadius: 6
                                    }}
                                    mode="contained"
                                    className="my-3"
                                    onPress={form.handleSubmit(onSubmit)}
                                >
                                    Đăng kí
                                </Button>
                                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                                    <Text className="text-blue-600 text-base underline">Bạn đã có tài khoản? Đăng nhập</Text>
                                </TouchableOpacity>
                            </FormProvider>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default RegisterPage;
