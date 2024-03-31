import {useCallback, useEffect, useState} from "react";
import {StyleSheet, View} from 'react-native';
import {StatusBar} from 'expo-status-bar';
import registerRootComponent from 'expo/build/launch/registerRootComponent'
import {Provider} from 'react-redux'
import * as SplashScreen from 'expo-splash-screen';
import {SafeAreaProvider} from 'react-native-safe-area-context'
import {RootSiblingParent} from 'react-native-root-siblings';
import {useDeviceContext} from 'twrnc';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';

import {store} from '@/store'
import {loadFonts} from "@/utils/functions";
import tw from "@/config/twrnc";
import {navigation} from "@/routes/Navigation";
import {AppStack} from "@/routes";
import "@/config/translations";

interface ILocalState {
    isFinishLoadFont: boolean
}

// Keep the splash screen visible while we fetch resources
void (async () => {
    await SplashScreen.preventAutoHideAsync()
})();
export default function App() {
    useDeviceContext(tw, {
        observeDeviceColorSchemeChanges: false,
        initialColorScheme: 'dark',
    })
    const [{isFinishLoadFont}, setState] = useState<ILocalState>({isFinishLoadFont: false})
    useEffect(() => {
        void (async () => {
            await loadFonts((val) => setState((prevState) => ({...prevState, isFinishLoadFont: val})))
        })()
    }, []);
    const onLayoutRootView = useCallback(async () => {
        if (isFinishLoadFont) {
            /**
             * This tells the splash screen to hide immediately! If we call this after
             * `isFinishLoadFont`, then we may see a blank screen while the app is
             * loading its initial state and rendering its first pixels. So instead,
             * we hide the splash screen once we know the root view has already
             * performed layout.
             */
            await SplashScreen.hideAsync();
        }
    }, [isFinishLoadFont]);

    if (!isFinishLoadFont) {
        return null;
    }
    return (
        <SafeAreaProvider>
            <Provider store={store}>
                <RootSiblingParent>
                    <NavigationContainer ref={navigation.navigationRef}>
                        <View onLayout={onLayoutRootView} style={tw`fill`}>
                            <AppStack />
                            <StatusBar style="auto"/>
                        </View>
                    </NavigationContainer>
                </RootSiblingParent>
            </Provider>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

registerRootComponent(App)
