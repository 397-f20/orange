import React, { useState } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';

const initialLayout = { width: Dimensions.get('window').width };
const renderScene = SceneMap({
    first: SavedPlans,
    second: Templates,
});

const TabBar = ({ SavedPlans, Templates }) => {
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'first', title: 'Saved Plans' },
        { key: 'second', title: 'Templates' },
    ]);

    return (
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={initialLayout}

        />
    )
};

const styles = StyleSheet.create({
    scene: {
        flex: 1,
    },
    buttonStyle: {
        marginVertical: 6,
    },
    degreeList: {
        marginTop: 10,
        marginHorizontal: 10
    },
    savedPlans: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonStyle: {
        marginVertical: 6,
    },
    deleteButton: {
        marginLeft: 'auto',
        marginRight: 10
    },
});

export default TabBar;