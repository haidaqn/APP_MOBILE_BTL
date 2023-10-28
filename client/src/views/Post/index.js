import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PostItem from './Components/PostItem';

const data = [
    {
        title: 'Thông báo về việc bảo trì app',
        content: 'Chúng tôi đang tiến hành nâng cấp và bảo trì hệ thống',
        img: 'https://cdn.voh.com.vn/voh/Image/2019/10/05/caybaobap1_20191005003130.jpg',
        createAt: '10/05/2023'
    },
    {
        title: 'Thông báo về việc bảo trì app',
        content: 'Hệ thống đang có lỗi vui lòng lại sau',
        img: 'https://cdn.voh.com.vn/voh/Image/2019/10/05/caybaobap1_20191005003130.jpg',
        createAt: '10/12/2021'
    }
];

function Post({ navigation }) {
    return (
        <View className="bg-white w-full h-full relative ">
            <View className="w-full flex-row py-2 justify-center items-center border-b border-gray-300">
                <Text className="text-2xl font-medium">News</Text>
            </View>
            <ScrollView className="mt-3 px-4" showsVerticalScrollIndicator={false}>
                {data.map((item, index) => (
                    <PostItem key={index} data={item} navigation={navigation} />
                ))}
            </ScrollView>
        </View>
    );
}

export default Post;
