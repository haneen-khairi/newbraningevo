import { theme } from 'antd'
const lightTheme = {
    token: {
        colorPrimary: "#38ACB1",
        defaultActiveBg: "#2B50AC",
        colorSecondary: "#fafafa",
        colorBgContainer: "#fff",
        colorSplit: "#F2F2F21A",
        bodyColor: "#f8fafb",
        cardColor: "#fff",
        cardHeaderColor: "#f8fafb",
        cardShadow: "0 0 0 1px rgba(0,0,0,.05)",
        fontFamily: 'Suisse',
        controlHeight: 56,
        colorPrimaryActive: "#2b50ab",
    },
    components: {
        Table: {
            headerBg: "#fff",
            headerColor: "#828282",
            borderColor: "#fff",
            cellPaddingBlock: 8,
            cellPaddingInline: 8,
        },
        Button: {
            defaultColor: "#38ACB1",
        },
        Select: {
            selectorBg: "#fff",
        },
        Input: {
            paddingInline: 8,
        },
        DatePicker: {
            cellHeight: 14,
        }
    }
}
const darkTheme = {
    algorithm: theme.darkAlgorithm,

    token: {
        colorPrimary: "#38ACB1",
        colorSecondary: "#2b2a36",
        colorBgContainer: "#2b2a36",
        bodyColor: "#1a1927",
        cardColor: "#242331",
        cardHeaderColor: "#1a1927",
        primaryTextColor: "#f7f9fa",
        secondaryTextColor: "#4f4f59",
        colorText: 'white',
        cardShadow: "0 0 0 1px rgba(255,255,255,.1)",
        colorLink: "#38ACB1",
        fontFamily: 'Suisse',
        colorSplit: "#F2F2F21A"

    },
    components: {
        Table: {
            headerBg: "#1a1927",
            borderColor: "#00000000",
        },
        Button: {
            defaultColor: "rgba(56, 172, 177, 1)",
        },
        Select: {
            selectorBg: "#2b2a36",
        }
    }
}

const getCurrentTheme = () => {
    if (localStorage.getItem('theme')) {
        localStorage.getItem('theme') === 'dark' ? darkTheme : lightTheme
    } else {
        return lightTheme

    }
}
export {
    lightTheme,
    darkTheme,
    getCurrentTheme
};