import React from 'react';
import { Svg, Path, Circle } from 'react-native-svg';

export function SearchBold({ size, color }) {
    return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/Svg">
            <Circle cx="11" cy="11" r="6" fill="#7E869E" fill-opacity="0.25" stroke="#222222" stroke-width="1.2" />
            <Path
                fill={color}
                d="M11 8C10.606 8 10.2159 8.0776 9.85195 8.22836C9.48797 8.37913 9.15726 8.6001 8.87868 8.87868C8.6001 9.15726 8.37913 9.48797 8.22836 9.85195C8.0776 10.2159 8 10.606 8 11"
                stroke="#222222"
                stroke-width="1.2"
                stroke-linecap="round"
            />
            <Path fill={color} d="M20 20L17 17" stroke="#222222" stroke-width="1.2" stroke-linecap="round" />
        </Svg>
    );
}
