const { plugin } = require('twrnc');

const spacing = 4;

const layout = {
    fill: 'flex-1',
    row: 'flex-row',
    center: 'items-center justify-center',
    'row-items-center': 'flex-row items-center',
    'row-justify-center': 'flex-row justify-center',
    'row-center': 'flex-row items-center justify-center',
    'row-between': 'flex-row justify-between',
    'row-between-center': 'flex-row justify-between items-center',
};
const shadows = {
    'shadow-2': {
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
    },
    'shadow-4': {
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
    },
    'shadow-6': {
        elevation: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 6,
    },
};

const TEXT_SIZE = {
    h1: 'text-[32px]',
    h2: 'text-[24px]',
    h3: 'text-[20px]',
    'body-lg': 'text-[18px]',
    body: 'text-[16px]',
    'body-sm': 'text-[14px]',
    caption: 'text-[12px]',
    footnote: 'text-[10px]',
}

const OPEN_SANS = {
    'bold': 'open-sans-bold',
    'boldItalic': 'open-sans-bold-italic',
    'italic': 'open-sans-italic',
    'light': 'open-sans-light',
    'lightItalic': 'open-sans-light-italic',
    'medium': 'open-sans-medium',
    'mediumItalic': 'open-sans-medium-italic',
    'regular': 'open-sans-regular',
    'semiBold': 'open-sans-semi-bold',
    'semiBoldItalic': 'open-sans-semi-bold-italic',
}

const fStyle = [
    'h1',
    'h2',
    'h3',
    'body-lg',
    'body',
    'body-sm',
    'caption',
    'footnote',
]
const generateFontStyle = (fontFamily, suffix) => {
    const result = {}
    fStyle.map(name => {
        result[suffix !== undefined ? name + `-${suffix}` : name] = `font-${OPEN_SANS[fontFamily]} ${TEXT_SIZE[name]}`
    })
    return result
}

const fontStyle = {
    // font regular
    ...generateFontStyle('regular'),
    // bold
    ...generateFontStyle('bold', 'bold'),
    // boldItalic
    ...generateFontStyle('boldItalic', 'bold-italic'),
    // italic
    ...generateFontStyle('italic', 'italic'),
    // light
    ...generateFontStyle('light', 'light'),
    // lightItalic
    ...generateFontStyle('lightItalic', 'light-italic'),
    // medium
    ...generateFontStyle('medium', 'medium'),
    // mediumItalic
    ...generateFontStyle('mediumItalic', 'medium-italic'),
    // semiBold
    ...generateFontStyle('semiBold', 'semi-bold'),
    // semiBoldItalic
    ...generateFontStyle('semiBoldItalic', 'semi-bold-italic'),
}

const borderRadius = {
    'rounded-tiny': 'rounded-[4px]',
    'rounded-very-small': 'rounded-[5px]',
    'rounded-small': 'rounded-[6px]',
    'rounded-medium': 'rounded-[8px]',
    'rounded-small-medium': 'rounded-[10px]',
    'rounded-compact': 'rounded-[16px]',
    'rounded-regular': 'rounded-[20px]',
    'rounded-standard': 'rounded-[24px]',
    'rounded-moderate': 'rounded-[30px]',
    'rounded-large': 'rounded-[32px]',
    'rounded-large-medium': 'rounded-[40px]',
    'rounded-double-large': 'rounded-[48px]',
    'rounded-half': 'rounded-[50px]',
    'rounded-extra-large': 'rounded-[64px]',
    'rounded-maximum': 'rounded-[100px]',
};

const colors = {
    // dark theme
    orange: '#CC6C52',
    black: '#111111',
    gray: '#313133',
    neutral: '#F0F0EC',
    green: '#66A09A',
    // light theme
    orangeBright: '#EA6E4A',
    white: '#FFFFFF',
    smoke: '#F2F2F2',
    greenBright: '#8BD0C6',
}

module.exports = {
    plugins: [
        plugin(({ addUtilities }) => {
            addUtilities({
                ...layout,
                ...shadows,
                ...fontStyle,
                ...borderRadius,
            })
        }),
    ],
    theme: {
        fontSize: {
            xs: '12px',
            sm: '14px',
            base: '16px',
            lg: '18px',
            xl: '20px',
            '2xl': '24px',
            '3xl': '30px',
            '4xl': '36px',
            '5xl': '48px',
            '6xl': '60px',
            '7xl': '72px',
            '8xl': '96px',
            '9xl': '128px',
            h1: '32px',
            h2: '24px',
            h3: '20px',
            'body-lg': '18px',
            body: '16px',
            'body-sm': '14px',
            caption: '12px',
            footnote: '10px',
        },
        extend: {
            fontFamily: {
                'open-sans-bold': ['OpenSans-Bold'],
                'open-sans-bold-italic': ['OpenSans-BoldItalic'],
                'open-sans-italic': ['OpenSans-Italic'],
                'open-sans-light': ['OpenSans-Light'],
                'open-sans-light-italic': ['OpenSans-LightItalic'],
                'open-sans-medium': ['OpenSans-Medium'],
                'open-sans-medium-italic': ['OpenSans-MediumItalic'],
                'open-sans-regular': ['OpenSans-Regular'],
                'open-sans-semi-bold': ['OpenSans-SemiBold'],
                'open-sans-semi-bold-italic': ['OpenSans-SemiBoldItalic'],
            },
            colors,
            borderRadius: {
                1: spacing,
                2: spacing * 2,
                3: spacing * 3,
                4: spacing * 4,
                5: spacing * 5,
                6: spacing * 6,
                7: spacing * 7,
                8: spacing * 8,
                9: spacing * 9,
                10: spacing * 10,
            },
        }
    }
}
