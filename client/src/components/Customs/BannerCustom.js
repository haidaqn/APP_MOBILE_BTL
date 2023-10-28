import React from 'react';
import { Image, View } from 'react-native';
import Swiper from 'react-native-swiper';

function BannerCustom({ imgs }) {
    return (
        <Swiper showsButtons loop={false}>
            {imgs.map((img) => (
                <View className="bg-gray-100 flex-row justify-center items-center border-y border-r" key={img}>
                    <Image source={{ uri: `${img}` }} className="object-contain flex-row items-center justify-center h-[200px] w-[200px]" resizeMode="cover" />
                </View>
            ))}
        </Swiper>
    );
}

export default BannerCustom;
