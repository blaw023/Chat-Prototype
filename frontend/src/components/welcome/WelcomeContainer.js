import React from 'react';
import {WelcomeHeader} from "./Header.";
import { JoinChat } from "./JoinChat";


export function WelcomeContainer () {
    return (
        <div>
            <WelcomeHeader/>
            <JoinChat/>
        </div>
    )
};