import { createGlobalStyle } from 'styled-components';

const darkTheme = {
    background: 'rgb(255, 231, 220)',
    backgroundLight: 'rgb(245, 241, 240)',
    primary: 'rgb(244, 49, 39)',
    primaryLighter: 'rgb(244, 79, 59)',
    secondary: 'rgb(242, 202, 183)',
    secondaryDarker: 'rgb(212, 172, 153)',
    text: '#241717',
    error: '#C82D2B',
    success: '#4A8744',
};

const colors = darkTheme;

const appBarHeight = (add = 0) => `${80 + add}px`;
const headerHeight = (add = 0) => `${66 + add}px`;

const customTheme = {
    colors,
    breakpoints: ['350px', '480px', '760px', '1024px', '1200px'],
    fonts: {
        // TODO: Use different fonts maybe?
        fantasy: 'MedievalSharp, Montserrat, sans-serif',
        heading: 'MedievalSharp, Montserrat, sans-serif',
        body: 'MedievalSharp, Montserrat, sans-serif',
        button: 'MedievalSharp, Montserrat, sans-serif',
        // body: 'Montserrat, sans-serif',
        // heading: 'Montserrat, sans-serif',
        // button: 'Montserrat, sans-serif',
    },
    text: {
        body: {
            fontFamily: 'body',
            fontWeight: 550,
            color: 'text',
        },
        fancy: {
            fontFamily: 'fantasy',
            color: 'text',
        },
        title: {
            variant: 'text.body',
            fontSize: '20px',
        },
        caption: {
            variant: 'text.body',
            fontSize: '13px',
            opacity: .85,
        },
        label: {
            variant: 'text.body',
            fontSize: '14px',
            opacity: .75,
            fontWeight: 600,
        },
        error: {
            variant: 'text.body',
            fontSize: '13px',
            color: 'error',
        },
        heading1: {
            fontFamily: 'fantasy',
            fontWeight: 700,
            color: 'text',
            fontSize: '42px',
        },
        heading2: {
            variant: 'text.heading1',
            fontFamily: 'heading',
            fontSize: '32px',
        },
        heading3: {
            variant: 'text.heading2',
            fontSize: '28px',
            fontWeight: 600,
        },
        heading4: {
            variant: 'text.heading3',
            fontSize: '24px',
        }
    },
    buttons: {
        primary: {
            bg: 'primary',
            fontWeight: 600,
            outline: 'none',
            '& > div': {
                color: darkTheme.backgroundLight,
            },
            // TODO: Set loading indicator colour
        },
        primaryLarge: {
            variant: 'buttons.primary',
            bg: 'primary',
            fontWeight: 600,
            outline: 'none',
            fontSize: '24px',
            // TODO: Set loading indicator colour
        },
        secondary: {
            variant: 'primary',
            bg: 'secondary',
            fontWeight: 600,
        },
        hollow: {
            variant: 'buttons.primary',
            bg: 'transparent',
            color: 'primary',
            borderColor: 'primary',
            borderWidth: '2px',
            borderStyle: 'solid',
        },
        'secondary-hollow': {
            variant: 'buttons.hollow',
            color: 'secondary',
            borderColor: 'secondary',
        },
        'social-google': {
            variant: 'primary',
            bg: '#dd4b39',
            color: 'white',
            fontWeight: 600,
        },
        link: {
            bg: 'transparent',
            color: 'text',
            padding: 0,
            margin: 0,
            textDecoration: 'underline',
        },
        icon: {
            margin: 0,
            bg: 'transparent',
            outline: 'none',
            color: 'text',
            p: 2
        },
        action: {
            variant: 'primary',
            width: '60px',
            height: '60px',
            p: 2,
            pb: '6px',
            borderRadius: '100%',
        },
        actionHollow: {
            bg: 'transparent',
            color: 'primary',
            borderColor: 'primary',
            borderWidth: '4px',
            borderStyle: 'solid',
            variant: 'primary',
            width: '60px',
            height: '60px',
            p: 2,
            pb: '6px',
            borderRadius: '100%',
        }
    },
    forms: {
        input: {
            outline: 'none',
            borderWidth: '0 0 2px 0',
            borderColor: 'backgroundLight',
            bg: 'rgb(0, 0, 0, 0.2)',
            borderRadius: '5px 5px 0 0',
            color: 'text',
            fontSize: '15px',
            fontWeight: 550,
            transition: 'border 300ms ease-out',
            '&:focus': {
                borderColor: 'primary',
            }
        },
        select: {
            borderColor: 'backgroundLight',
            bg: 'rgb(0, 0, 0, 0.2)',
            borderWidth: '2px',
            borderRadius: '5px',
            color: 'text',
            fontWeight: 550,
            outline: 'none',
            transition: 'border 300ms ease-out',
            '&:focus': {
                borderColor: 'primary',
            },
            '& + svg': {
                fill: 'secondary'
            }
        },
        checkbox: {
            m: 0,
            outline: 'none',
            '&:active': {
                borderColor: 'primary',
            },
            '&:focus': {
                outline: 'none'
            }
        }
    },
    variants: {
        tag: {
            background: 'rgba(0, 0, 0, 0.25)',
            borderRadius: '999px',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        thumbnail: {
            maxHeight: '65px',
            maxWidth: '65px',
            borderRadius: '5px',
            p: 1
        },
        card: {
            bg: 'secondary',
            boxShadow: 'rgb(0, 0, 0, .4) 0px 10px 13px -7px, 5px 5px 15px 5px rgba(0,0,0,0)',
            py: 2,
            px: 3,
            borderRadius: '10px'
        },
        cardClickable: {
            variant: 'variants.card',
            cursor: 'pointer',
            transition: 'transform .2s, opacity .2s',
            '&:active': {
                transform: 'translateY(6px)'
            },
            'userSelect': 'none',
        },
        cardDisabled: {
            variant: 'variants.card',
            cursor: 'default',
            opacity: .5,
            '&:active': {
                transform: 'none',
            }
        },
        appBarFrame: {
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            borderRadius: '30px 30px 0 0',
            overflow: 'hidden',
            height: appBarHeight(),
            bg: 'secondary',
            boxShadow: '0px 10px 13px -7px #000000, 0px -8px 18px 3px rgba(0,0,0,0.2)'
        },
        headerFrame: {
            position: 'fixed',
            bg: 'secondary',
            top: 0,
            left: 0,
            right: 0,
            height: headerHeight(),
            zIndex: 1000,
            boxShadow: 'rgb(0, 0, 0, .4) 0px 10px 13px -7px, 5px 5px 15px 5px rgba(0,0,0,0)'
        },
        modalBackground: {
            bg: 'rgba(0, 0, 0, 0.6)',
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
        },
        modalContainer: {
            position: 'relative',
            margin: 'auto',
            width: '100%',
            maxWidth: 'min(1000px, calc(100% - 48px))',
            borderRadius: '3px',
            maxHeight: 'calc(100% - 150px)'
        },
        scrollList: {
            borderRadius: '12px',
            overflow: 'scroll',
            '&::-webkit-scrollbar': {
                display: 'none'
            }
        },
        pageContent: {
            maxHeight: 'calc(100vh - 146px)',
            mt: '66px',
            mb: '80px',
        },
        action: {
            position: 'fixed',
            width: '60px',
            height: '60px',
            bottom: 0,
            right: 0,
            marginRight: 3,
            marginBottom: appBarHeight(16)
        }
    }
}

const containers: {[key: string]: any} = {
    center: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        width: '100%',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
    container: {
        maxWidth: '1200px',
        mx: 'auto',
    },
    appBarPadding: {
        marginBottom: appBarHeight()
    },
    headerPadding: {
        marginTop: headerHeight()
    }
}

const containerKeys = Object.keys(containers);

containerKeys.forEach(key1 => {
    containerKeys.forEach(key2 => {
        if (key1 === key2) return;
        if (containers[key2 + '-' + key1]) return;

        containers[key1 + '-' + key2] = {
            ...containers[key1],
            ...containers[key2],
        }
    })
})

customTheme.variants = {
    ...customTheme.variants,
    ...containers,
}


/*
        background: radial-gradient(ellipse at left bottom, ${darkTheme.backgroundLight}, ${darkTheme.background});
*/
export const GlobalStyle = createGlobalStyle`
    html, body {
        background: ${darkTheme.background};
        margin: 0;
    }
    div.firebase-emulator-warning {
        display: none;
    }
`;

export const theme = {
    ...customTheme,
}
