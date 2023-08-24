import { useRef, useEffect, useReducer } from 'react'

export default function useReducerWithMiddleware(reducer: (_user: any, action: any) => any, initialState, middlewareFn, afterwareFn) {
    const [state, dispatch] = useReducer(reducer, initialState);

    const aRef = useRef();
    const dispatchWithMiddleware = (action) => {
        middlewareFn(action);
        aRef.current = action;
        dispatch(action);
    };
    useEffect(() => {
        if (!aRef.current) return;
        afterwareFn(aRef.current)
        aRef.current = null;
    }, [afterwareFn]);

    return [state, dispatchWithMiddleware];

}

