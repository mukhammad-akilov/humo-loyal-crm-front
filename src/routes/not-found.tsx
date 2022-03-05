import {NotFound} from "../components/Lazy/Lazy";

const NotFoundRoute = ({title, ...restProps}: {title: string}): JSX.Element => {
    return (
        <NotFound title="Страница 404" />
    )
}

export default NotFoundRoute;