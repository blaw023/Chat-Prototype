import React, { useState } from 'react';
import { Form, Label, Input, Button } from 'semantic-ui-react';
import { useHistory } from "react-router-dom";


export function JoinChat () {
    let history = useHistory();
    const [email, setEmail] = useState("");

    const handleEmailChange = event => {
        if (event.target.value && event.target.value) {
            setEmail(event.target.value);
        }
    };

    return (
        <div className={"join"}>
            <Form.Field inline>
                <Label pointing='right'>Please enter your email.</Label>
                <Input placeholder='Email' onChange={handleEmailChange} />
            </Form.Field>
         <div>
            <Button primary onClick={() =>
            {history.push({
                pathname: '/chat',
                state: {email: email}
            })}}>
                Join Chat
            </Button>
         </div>
        </div>
    )
}