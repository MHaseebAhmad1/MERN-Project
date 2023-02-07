import React, { createContext } from 'react';
import App from '../App';


export const Global = createContext();
const count = 0;
function New() {
    return (
        <div>
            <Global.Provider value={{ myCount: count }}>
                <App />
            </Global.Provider>
        </div>
    );
}

export default New;