import * as Font from 'expo-font'
export async function loadFonts(setter?: (isFinished: boolean) => void) {
    setter?.(false);
    Font.loadAsync(({
        'OpenSans-Bold': require('../../assets/fonts/open-sans/static/OpenSans-Bold.ttf'),
        'OpenSans-BoldItalic': require('../../assets/fonts/open-sans/static/OpenSans-BoldItalic.ttf'),
        'OpenSans-Italic': require('../../assets/fonts/open-sans/static/OpenSans-Italic.ttf'),
        'OpenSans-Light': require('../../assets/fonts/open-sans/static/OpenSans-Light.ttf'),
        'OpenSans-LightItalic': require('../../assets/fonts/open-sans/static/OpenSans-LightItalic.ttf'),
        'OpenSans-Medium': require('../../assets/fonts/open-sans/static/OpenSans-Medium.ttf'),
        'OpenSans-MediumItalic': require('../../assets/fonts/open-sans/static/OpenSans-MediumItalic.ttf'),
        'OpenSans-Regular': require('../../assets/fonts/open-sans/static/OpenSans-Regular.ttf'),
        'OpenSans-SemiBold': require('../../assets/fonts/open-sans/static/OpenSans-SemiBold.ttf'),
        'OpenSans-SemiBoldItalic': require('../../assets/fonts/open-sans/static/OpenSans-SemiBoldItalic.ttf'),
    })).finally(() => {
        setter?.(true)
    })
}
