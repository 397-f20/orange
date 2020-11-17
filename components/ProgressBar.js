import {View} from "react-native";
import React, {useState} from "react";
import {Colors} from "react-native-paper";

const ProgressBar = ({total, numCourses}) => {
    const progressColors = [Colors.red600, Colors.orange600, Colors.yellow600, Colors.green600];
    const colorMap = value => {
        return progressColors[Math.floor((progressColors.length - 1) * Math.min(1,value))];
    }

    const [headerWidth, setHeaderWidth] = useState(0)

    const headerSize = event => setHeaderWidth(event.nativeEvent.layout.width);

    return (
    <View
        onLayout={headerSize}
        style={{ zIndex: 3, marginLeft: 3, marginRight: 3, marginTop: 5, height: 5}}>
        <View style={{ position: 'relative', top: 5, borderRadius: 5, height: 5,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            borderTopRightRadius: numCourses >= total || !total  ? 5 : 0,
            width: headerWidth ? Math.min(headerWidth, headerWidth * Math.max(0.08, numCourses  / total)) : 0,
            backgroundColor: colorMap( numCourses / total) }}/>
    </View>
    )
}

export default ProgressBar;
