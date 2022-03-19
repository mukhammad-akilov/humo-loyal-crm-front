import {PaletteMode} from "@mui/material";

export const fullDay = (day: number): string => {
    return (`0${day}`).slice(-2);
};

export const fullMonth = (month: string): string => {
    return (`0${month}`).slice(-2);
};

export const months : { [key: string]: string; } = {
    "1": "Январь",
    "2": "Февраль",
    "3": "Март",
    "4": "Апрель",
    "5": "Май",
    "6": "Июнь",
    "7": "Июль",
    "8": "Август",
    "9": "Сентябрь",
    "10": "Октябрь",
    "11": "Ноябрь",
    "12": "Декабрь",
};

export const logoutCase: string[] = [
    "token lifetime is expired",
    "token is expired",
    "your token is not valid",
    "ресурс доступен внутри корпоративной сети",
    "необходимо авторизоваться",
];

export const requestFileCase: string[] = [
    "image/png",
]

export const isWebLink = (link: string): boolean => {
    const webLinkExpression = /^((https?|ftp|file):\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/gi;
    const regex = new RegExp(webLinkExpression);
    return link.match(regex) ? true : false;
};

export const isValidHttpUrl = (link: string): boolean => {
    let url: URL;
    try {
        url = new URL(link);
    } catch (_) {
        return false;
    }

    return url.protocol === "http:" || url.protocol === "https:";
};

export const removeFilesPrefix = (link: string): string => {
    return link?.replace("./files/", "");
};

export const userPrefersDarkMode = (): boolean => {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export const handleSystemTheme = (): PaletteMode => {
    if(userPrefersDarkMode()) return "dark";
    return "light";
}

export const removeAuthDataFromLocalStorage = (): void => {
    // Remove auth and user type state from localstorage
    localStorage.removeItem("loyalty-lk-auth");
}

export const handleThemeChangeToLocalStorage = (theme: PaletteMode): void => {
    localStorage.setItem("loyalty-lk-theme", JSON.stringify({value: theme}))
}

export const normalizePhoneNumber = (phoneNumber: string): string => {
    phoneNumber = phoneNumber.replace(/-/g, "");
    phoneNumber = phoneNumber.replace(/ /g, "");
    phoneNumber = phoneNumber.replace("+", "");
    phoneNumber = phoneNumber.replace("(", "");
    phoneNumber = phoneNumber.replace(")", "");
    phoneNumber = phoneNumber.trim();
    return phoneNumber;
}