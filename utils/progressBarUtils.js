import { Circle, Text as SVGText, Svg } from 'react-native-svg';

import { Colors } from 'react-native-paper';
import React from 'react';
import { View } from 'react-native';

export const progressColors = [Colors.red600, Colors.orange600, Colors.yellow600, '#573280'];

export const colorMap = (value) => {
  return progressColors[Math.floor((progressColors.length - 1) * Math.min(1, value))];
};

export const CircularProgress = (props) => {
  const { size, strokeWidth, text, progressPercent, bgColor, textSize, textColor, svgStyles } = props;
  const radius = (size - strokeWidth) / 2;
  const circum = radius * 2 * Math.PI;
  const svgProgress = 100 - progressPercent;

  const pgColor = colorMap(progressPercent / 100);

  return (
    <View style={svgStyles}>
      <Svg width={size} height={size}>
        {/* Background Circle */}
        <Circle
          stroke={bgColor ? bgColor : '#f2f2f2'}
          fill='none'
          cx={size / 2}
          cy={size / 2}
          r={radius}
          {...{ strokeWidth }}
        />

        {/* Progress Circle */}
        <Circle
          stroke={pgColor ? pgColor : '#3b5998'}
          fill='none'
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeDasharray={`${circum} ${circum}`}
          strokeDashoffset={radius * Math.PI * 2 * (svgProgress / 100)}
          strokeLinecap='round'
          transform={`rotate(-90, ${size / 2}, ${size / 2})`}
          {...{ strokeWidth }}
        />

        {/* Text */}
        <SVGText
          fontSize={textSize ? textSize : '10'}
          fontFamily='System'
          x={size / 2}
          y={size / 2 + (textSize ? textSize / 2 - 1 : 5)}
          textAnchor='middle'
          fill={textColor ? textColor : '#333333'}
        >
          {text}
        </SVGText>
      </Svg>
    </View>
  );
};
