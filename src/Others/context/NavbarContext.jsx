import React, { createContext, useState } from 'react';

export const NavbarContext = createContext(null);

const NavbarContextProvider = ({ children }) => {
    const [instruction, setInstruction] = useState('home');
    const [click, setClick] = useState(false);

    return (
        <NavbarContext.Provider value={{ instruction, setInstruction, click, setClick }}>
            {children}
        </NavbarContext.Provider>
    );
}

export default NavbarContextProvider;
