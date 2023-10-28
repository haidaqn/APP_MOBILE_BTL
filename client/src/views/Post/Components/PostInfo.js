import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PostItem from './PostItem';

const data = [
    {
        title: 'Philosophy That Address Topics Such As Goodness 1',
        content: 'Agar tetap kinclong, bodi motor ten ass',
        img: 'https://cdn.voh.com.vn/voh/Image/2019/10/05/caybaobap1_20191005003130.jpg',
        createAt: '13 Jan 2021'
    },
    {
        title: 'Philosophy That Address Topics Such As Goodness 2',
        content: 'Agar tetap kinclong, bodi motor ten ass',
        img: 'https://cdn.voh.com.vn/voh/Image/2019/10/05/caybaobap1_20191005003130.jpg',
        createAt: '13 Jan 2021'
    }
];

const PostInfo = ({ navigation }) => {
    return (
        <View className="bg-white w-full h-full relative ">
            <View className="w-full flex-row py-2 justify-between items-center border-b border-gray-400">
                <TouchableOpacity className="px-4" onPress={() => navigation.goBack()}>
                    <MaterialCommunityIcons
                        name="chevron-left"
                        style={{
                            fontSize: 18,
                            color: '#777777',
                            padding: 12,
                            backgroundColor: '#F0F0F3',
                            borderRadius: 12
                        }}
                    />
                </TouchableOpacity>
                <Text className="text-lg font-medium">Detail News</Text>
                <TouchableOpacity className="px-4">
                    <FontAwesome
                        name="share-square-o"
                        style={{
                            fontSize: 18,
                            color: '#777777',
                            padding: 12,
                            backgroundColor: '#F0F0F3',
                            borderRadius: 12
                        }}
                    />
                </TouchableOpacity>
            </View>
            <ScrollView className="px-4 mt-5" showsVerticalScrollIndicator={false}>
                <View className="w-full h-[200px]">
                    <Image
                        source={{ uri: `https://cdn.voh.com.vn/voh/Image/2019/10/05/caybaobap1_20191005003130.jpg` }}
                        className="w-full rounded-lg object-cover flex-1"
                    />
                </View>
                <Text className="text-xl font-medium mt-3">Philosophy Tips Merawat Bodi Mobil agar Tidak Terlihat Kusam</Text>
                <Text className="text-base text-gray-600 mt-1">
                    The speaker unit contains a diaphragm that is precision-grown from NAC Audio bio-cellulose, making it stiffer, lighter and stronger than
                    regular PET speaker units, and allowing the sound-producing diaphragm to vibrate without the levels of distortion found in other speakers.
                    The speaker unit contains a diaphragm that is precision-grown from NAC Audio bio-cellulose, making it stiffer, lighter and stronger than
                    regular PET speaker units, and allowing the sound-producing diaphragm to vibrate without the levels of distortion found in other speakers.
                    The speaker unit contains a diaphragm that is precision-grown from NAC Audio bio-cellulose, making it stiffer, lighter and stronger than
                    regular PET speaker units, and allowing the sound-producing diaphragm to vibrate without the levels of distortion found in other
                    speakers.The speaker unit contains a diaphragm that is precision-grown from NAC Audio bio-cellulose, making it stiffer, lighter and stronger
                    than regular PET speaker units, and allowing the sound-producing diaphragm to vibrate without the levels of distortion found in other
                    speakers.
                </Text>
                <View className="my-3">
                    <Text className="text-xl my-2 font-semibold">Other News</Text>
                    <View className="">
                        {data.map((item, index) => (
                            <PostItem key={index} data={item} navigation={navigation} />
                        ))}
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default PostInfo;
