import React, { useState } from 'react';

import { View } from 'react-native';
import { colorMap } from '../utils/progressBarUtils';

const ProgressBar = ({ total, numCourses }) => {
  const [headerWidth, setHeaderWidth] = useState(0);

  const headerSize = (event) => setHeaderWidth(event.nativeEvent.layout.width);

  return (
    <View
      onLayout={headerSize}
      style={{
        zIndex: 3,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 0,
        height: 0,
      }}
    >
      <View
        style={{
          position: 'relative',
          top: 5,
          borderRadius: 5,
          height: 5,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          borderTopRightRadius: numCourses >= total || !total ? 5 : 0,
          width: headerWidth ? Math.min(headerWidth, headerWidth * Math.max(0.08, numCourses / parseInt(total))) : 0,
          backgroundColor: colorMap(numCourses / total),
        }}
      />
    </View>
  );
};

export default ProgressBar;
