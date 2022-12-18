import {useMemo} from "react";

const debounce = (fn: Function, ms = 300) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return function (this: any, ...args: any[]) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn.apply(this, args), ms);
    };
};

export function useDebounce(cb: Function, ms: number) {
    return useMemo(() => debounce(cb, ms),[ms])
}