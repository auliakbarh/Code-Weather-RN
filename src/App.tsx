import {useCallback, useEffect, useState} from "react";
import {StyleSheet, Text, View} from 'react-native';
import {StatusBar} from 'expo-status-bar';
import registerRootComponent from 'expo/build/launch/registerRootComponent'
import {Provider} from 'react-redux'
import * as SplashScreen from 'expo-splash-screen';
import {SafeAreaProvider} from 'react-native-safe-area-context'
import {RootSiblingParent} from 'react-native-root-siblings';
import {useDeviceContext} from 'twrnc';

import {store} from '@/store'
import {loadFonts} from "@/utils/functions";
import tw from "@/config/twrnc";
import {SafeArea} from "@/components";

interface ILocalState {
    isFinishLoadFont: boolean
}

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();
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
                    <SafeArea onLayout={onLayoutRootView} style={tw`px-4 center`}>
                        <Text style={tw`body-sm-italic txt-orangeBright`}>Open up App.tsx to start working on
                            your app!</Text>
                        <StatusBar style="auto"/>
                    </SafeArea>
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