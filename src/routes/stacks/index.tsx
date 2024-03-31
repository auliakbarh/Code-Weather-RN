import React, {Fragment, useCallback, useMemo} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SCREENS, STACK_SCREENS} from '@/routes/stacks/screens';
import {useDeviceContext} from "twrnc";
import {useSelector} from "react-redux";

import {tw} from "@/config/twrnc";
import {RootState} from "@/store";

const Stack = createNativeStackNavigator();

const navigationOptions = {
    hideHeader: {headerShown: false},
};
export const AppStack: React.FC = () => {
    /**
     * dark is initialColorScheme for this app, related with initial reducer value and some hooks (useDeviceContext, useAppColor)
     */
    const theme = useSelector<RootState, TColorScheme>(state => state.setting.colorScheme)
    useDeviceContext(tw, {
        observeDeviceColorSchemeChanges: false,
        initialColorScheme: theme,
    })
    const renderStackScreens = useCallback((props: any) => {
        return (
            <Fragment key={props.name}>
                <Stack.Screen
                    {...props}
                    options={props.options ?? navigationOptions.hideHeader}
                />
            </Fragment>
        );
    }, []);

    const initialRouteName: undefined | string = useMemo(() => {
        return SCREENS.HomePage.name;
    }, []);

    return (
        <Stack.Navigator initialRouteName={initialRouteName} screenOptions={{ gestureEnabled: true }}>
            {STACK_SCREENS.map(renderStackScreens)}
        </Stack.Navigator>
    );
};
