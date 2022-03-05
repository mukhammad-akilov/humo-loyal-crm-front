interface ProjectTheme {
   [key: string]: {
    [key: string]: string
}
}

export const ProjectTitle = "Бонусная программа лояльности для бизнеса от МДО Хумо";

export const ApiUrl = process.env.NODE_ENV === 'production' ? "http://192.168.100.31:8088/" : "http://192.168.100.31:8088/";

export const ProjectTheme: ProjectTheme = {
    primary: {
        color: "#FF6600",
        textColor: "#FFFFFF",
    },
    secondary: {
        color: "#00617F",
        textColor: "#FFFFFF",
    },
}