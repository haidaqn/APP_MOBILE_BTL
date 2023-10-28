import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import productApi from '../../apis/product';
import ProductCart from '../../components/Common/ProductCart';

const Search = ({ route }) => {
    const navigate = useNavigation();
    const { searchValue } = route.params || '';
    const [searchHistory, setSearchHistory] = useState([]);
    const [dataSearch, setDataSearch] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchData = async (data) => {
        setLoading(true);
        const response = await productApi.searchProduct(data);
        if (response?.success) {
            setDataSearch(response.response);
        }
        setLoading(false);
    };

    useEffect(() => {
        if (searchValue && !searchHistory.includes(searchValue)) {
            setSearch(searchValue);
            setSearchHistory((prev) => [...prev, searchValue]);
            fetchData(searchValue);
        }
    }, [searchValue]);

    const handleSearch = async () => {
        if (search) {
            if (!searchHistory.includes(search)) {
                setSearchHistory((prev) => [...prev, search]);
                fetchData(search);
            }
        }
    };

    return (
        <View className="px-4 h-full flex-col">
            <View className="flex-row border my-4 items-center justify-between px-3 py-2 rounded-xl">
                <TextInput onSubmitEditing={handleSearch} value={search} onChangeText={setSearch} placeholder="Tìm kiếm sản phẩm...." className="text-lg" />
                <TouchableOpacity onPress={() => handleSearch()} className="z-20">
                    <FontAwesome name="search" size={25} color="gray" style={{ marginRight: 8 }} />
                </TouchableOpacity>
            </View>
            <View className="w-full my-5 pt-2 flex-row flex-wrap gap-2 overflow-hidden">
                {searchHistory.map((item) => (
                    <Text
                        key={item}
                        onPress={() => {
                            setSearch(item);
                            fetchData(item);
                        }}
                        className="px-3 py-1 border rounded-lg bg-gray-100 cursor-pointer inline-block"
                    >
                        {item}
                    </Text>
                ))}
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                {loading ? (
                    <View className="w-full h-full flex-row items-center justify-center">
                        <ActivityIndicator size={60} color="#FF5733" />
                    </View>
                ) : (
                    <>
                        {dataSearch.length ? (
                            <View
                                style={{
                                    flexDirection: 'row',
                                    flexWrap: 'wrap',
                                    justifyContent: 'space-between'
                                }}
                            >
                                {dataSearch.map((item, index) => (
                                    <ProductCart key={index} data={item} />
                                ))}
                            </View>
                        ) : (
                            <Text className="text-center text-xl font-normal">
                                {search.length ? 'Không có sản phẩm nào như vậy !' : 'Bạn chưa tìm sản phẩm nào !'}
                            </Text>
                        )}
                    </>
                )}
            </ScrollView>
        </View>
    );
};

export default Search;
