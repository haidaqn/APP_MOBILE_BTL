import { Image, View } from 'react-native';

const ImageCustom = ({ img, width }) => {
    return (
        <View
            style={{
                width: width,
                height: 240,
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <Image
                source={img}
                style={{
                    width: '100%',
                    height: '100%',
                    resizeMode: 'contain'
                }}
            />
        </View>
    );
};

export default ImageCustom;
