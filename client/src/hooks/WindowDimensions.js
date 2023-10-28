import { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';
function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = Dimensions.get('window');
    return {
        width,
        height
    };
}

export function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        Dimensions.addEventListener('change', handleResize);
        return () => window.removeEventListener('change', handleResize);
    }, []);

    return windowDimensions;
}
