import {useState, useEffect} from "react";
import httpService, {HttpError} from "../httpService/httpService";
import {IApiConfig} from "../httpService/httpService.interface";
import {useDispatch} from "react-redux";
import {ApiUrl} from "../config";
import {handleSnackbar} from "../store/slices/snackbarSlice";

const useHttpService = <T>(apiConfig: IApiConfig, url: string, initialState: T): [boolean, T, boolean] => {
    const [loading, setLoading] = useState<boolean>(true);
    const [data, setData] = useState<T>(initialState);
    const [error, SetError] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        let mounted = true;
        const abortController = new AbortController();

        (async () => {
            try {
                setLoading(true);
                const response = await httpService<T>(apiConfig, `${ApiUrl}get_fields/precheck`, abortController);
                if (mounted) {
                    setData(response);
                    setLoading(false);
                }
            } catch (error) {
                if(mounted) {
                    setLoading(true);
                    if(error instanceof HttpError) {
                        console.log(error.getErrorDetails());
                        // Show message
                        dispatch(handleSnackbar({
                            open: true,
                            message: error.getResponseErrorMessage(),
                            type: "error",
                        }));
                    }
                }

            }
        })();

        const cleanup = (): void => {
            mounted = false;
            abortController.abort();
        };
        return cleanup;
    }, [url])

    return [loading, data, true];
}

export default useHttpService;