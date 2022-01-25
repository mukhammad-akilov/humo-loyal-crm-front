import { MainUrl } from "../../config";

export const fullDay = day => {
    return (`0${day}`).slice(-2);
};

export const fullMonth = month => {
    return (`0${month}`).slice(-2);
};

export const months = {
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

export const logoutCase = [
  "token is expired",
  "your token is not valid",
  "ресурс доступен внутри корпоративной сети",
  "необходимо авторизоваться",
];

export const isWebLink = link => {
    const webLinkExpression = /^((https?|ftp|file):\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/gi;
    const regex = new RegExp(webLinkExpression);
    return link.match(regex) ? true : false;
};

export const isValidHttpUrl = link => {
    let url;

    try {
        url = new URL(link);
    } catch (_) {
        return false;
    }

    return url.protocol === "http:" || url.protocol === "https:";
};

export const removeFilesPrefix = link => {
   return link?.replace("./files/", "");
};

export const userPrefersDarkMode = () => {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export const handleSystemTheme =  () => {
    if(userPrefersDarkMode()) {
        return "dark"
    } else {
        return "light";
    }
}

export const removeAuthDataFromLocalStorage = () => {
    // Remove auth and user type state from localstorage
    localStorage.removeItem("loyalty-lk-auth");
}

export const handleThemeChangeToLocalStorage = theme => {
    localStorage.setItem("loyalty-lk-theme", JSON.stringify({value: theme}))
}

