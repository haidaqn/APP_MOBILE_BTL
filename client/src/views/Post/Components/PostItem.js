import { Image, Text, View } from 'react-native';

const PostItem = ({ data, navigation }) => {
    //onPress={() => navigation.navigate('PostInfo')}
    return (
        <View className="pb-4 my-4 border-b flex-row gap-2 border-gray-300">
            <View className="">
                <Text className="text-base font-medium">{data.title}</Text>
                <Text className="text-sm font-light mt-1">{data.content.slice(0, 40)}...</Text>
                <Text className="text-sm text-gray-500">{data.createAt}</Text>
            </View>
            <Image source={{ uri: `${data.img}` }} className="w-[90px] h-[90px] rounded-lg object-cover flex-1" />
        </View>
    );
};

export default PostItem;
