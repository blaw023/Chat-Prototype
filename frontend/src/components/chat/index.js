import React, { useEffect, useState } from 'react';
import { Button, Comment, Form, Header, Label, Icon, Message } from 'semantic-ui-react';
import socketIOClient from "socket.io-client";

//Our server endpoint
const ENDPOINT = "http://127.0.0.1:5000";
const socket = socketIOClient(ENDPOINT);


export function ChatWindow(props) {
    const [messageCount, setMessageCount] = useState(0);
    const [newMessage, setNewMessage] = useState('');
    const [messageList, setMessageList] = useState([]);

    const getCurrentTime = () => {
        const today = new Date();
        const hours = (today.getHours() >= 12) ? today.getHours()-12 : today.getHours();
        const amOrPm = (today.getHours() >= 12) ? "PM" : "AM";
        return hours + ":" + today.getMinutes() + amOrPm;
    };

    // On first render, send email prop to server and await response. 
    useEffect(() => {
        socket.emit('email', props.location.state.email, (data) => {
            setMessageCount(messageCount + 1);

            const messageObj = {
                key: messageCount,
                value: data,
                currentTime: getCurrentTime(),
                author: 'Mt.Sinai'
            };

            setMessageList(messageList.concat(messageObj));
        });
    }, []);    

    const handleNewMessage = event => { setNewMessage(event.target.value);};

    // Send new message to server and just console the acknowledgement message. 
    const pushNewMessage = () => {
        socket.emit('new message', newMessage, (data) => {
            console.log(data);
        });

        setMessageCount(messageCount + 1);
        const messageObj = {
            key: messageCount,
            value: newMessage,
            currentTime: getCurrentTime(),
            author: props.location.state.email
        };

        setMessageList(messageList.concat(messageObj));
        setNewMessage('');
    };

    return (
      <>
        <div className="row center-xs padding">
            <div className="col-xs-6"> 
               <div>
                    <Message
                            icon='check'
                            header='Welcome'
                            content={`${props.location.state.email} has joined the chat!`}
                            compact
                        />
                </div>  
            </div>
        </div>

        <div className="row center-xs">
            <div className="col-xs-6">
                <div>
                    <Comment.Group>
                        <Header as='h3' dividing>
                            Chat Window
                        </Header>

                        <Label>
                            <Icon name='eye' /> Message Count: {messageCount}
                        </Label>

                        {messageList.map((message => {
                            return <Comment key={message.key}>
                                <Comment.Content>
                                    <Comment.Author as='a'>From: {message.author}</Comment.Author>
                                    <Comment.Metadata>
                                        <div>{message.currentTime}</div>
                                    </Comment.Metadata>
                                    <Comment.Text>{message.value}</Comment.Text>
                                </Comment.Content>
                            </Comment>
                        }))}

                        <Form reply>
                            <Form.TextArea onChange={handleNewMessage} value={newMessage} />
                            <Button
                                content='Add Comment'
                                labelPosition='left'
                                icon='edit'
                                primary
                                onClick={pushNewMessage}
                            />
                        </Form>
                    </Comment.Group> 
                </div>
             </div>
        </div>       
     </>
    )
}