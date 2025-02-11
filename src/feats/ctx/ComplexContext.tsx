import {createContext} from 'react';



export const ComplexContext = createContext(255);
export function ComplexContextProvider({children}:
                                         {
                                             children: React.ReactNode
                                         }) {

    return (
        children
    )
}