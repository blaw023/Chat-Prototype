import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { WelcomeContainer } from '../welcome/WelcomeContainer';
import { ChatWindow } from "../chat";

export const Router = () => (
    <BrowserRouter>
        <Switch>
            <Route
                exact={true}
                path="/"
                render={props => <WelcomeContainer {...props} />}
            />
            <Route
                exact={true}
                path="/chat"
                render={props => <ChatWindow {...props} />}
            />
        </Switch>
    </BrowserRouter>
);