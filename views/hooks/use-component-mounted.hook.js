import {useEffect, useRef} from "react";

const useComponentMounted = () => {
    const isMounted = useRef(true);

    useEffect(() => {
        return () => {
            isMounted.current = false;
        }
    }, []);

    return isMounted;
};

export default useComponentMounted;