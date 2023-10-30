import React, { useState, useEffect } from 'react';
import { ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux';
import ListProduct from './components/ListProduct';

export default function Home({ navigation }) {
    const { smartphone, tablet, laptop, accessories } = useSelector((state) => state.product);
    // console.log(smartphone, accessories, laptop, tablet);
    const [search, setSearch] = useState('');
    const data = [
        { title: 'Smartphone', product: [...smartphone] },
        { title: 'Laptop', product: [...laptop] },
        { title: 'Tablet', product: [...tablet] },
        { title: 'Accessories', product: [...accessories] }
    ];
    const handleSearch = () => {
        navigation.navigate('Search', { searchValue: search });
        setSearch('');
    };

    useEffect(() => {
        if (search.length) setSearch('');
    }, []);

    return (
        <SafeAreaView>
            <View className="px-4 mt-2">
                <StatusBar className="bg-[#ffffff]" barStyle="light-content" />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Text className="text-[26px] p-1 text-black font-medium tracking-[1px]">haidaqn Shop &amp; Service</Text>
                    <Text className="text-[14px] p-1 text-black font-normal tracking-[1px]">Electronic shop on Ha Noi.</Text>
                    <View className="flex-row border my-3 items-center justify-between px-3 py-2 rounded-xl">
                        <TextInput
                            onSubmitEditing={handleSearch}
                            value={search}
                            onChangeText={setSearch}
                            placeholder="Tìm kiếm sản phẩm...."
                            className="text-lg"
                        />
                        <TouchableOpacity onPress={() => handleSearch()} className="z-20">
                            <FontAwesome name="search" size={25} color="gray" style={{ marginRight: 8 }} />
                        </TouchableOpacity>
                    </View>
                    <ListProduct data={data} navigate={navigation} />
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}
