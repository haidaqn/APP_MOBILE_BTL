import React from 'react';
import { ScrollView, Text, TouchableOpacity, View, FlatList, StyleSheet } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import ProductCart from '../../components/Common/ProductCart';

const ListProducts = ({ route, navigation }) => {
    const { data, name } = route.params;

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack('Home')}>
                        <Entypo name="chevron-left" style={styles.backButton} />
                    </TouchableOpacity>
                </View>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{name}</Text>
                </View>
                <View style={styles.productContainer}>
                    {data.map((item, index) => (
                        <ProductCart data={item} key={index} />
                    ))}
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    scrollView: {
        flex: 1
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'absolute',
        top: 20,
        left: 20,
        zIndex: 10
    },
    backButton: {
        fontSize: 18,
        padding: 8,
        borderRadius: 10,
        backgroundColor: '#adadaf'
    },
    titleContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderColor: 'gray'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    productContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginTop: 20
    }
});

export default ListProducts;
