import { useCallback, useRef } from "react"

export const useDebounce = (delay = 300, notDelayInFristTime = true) => {

    const debouncing = useRef<NodeJS.Timeout>();
    const isFristTime = useRef(notDelayInFristTime);

    const debounce = useCallback((func: () => void) => {
        if (isFristTime.current) {
            isFristTime.current = false

            func()
        } else {
            if (debouncing.current) {
                clearTimeout(debouncing.current)
            }

            debouncing.current = setTimeout(() => func(), delay)
        }
    }, [delay])


    return { debounce }
}