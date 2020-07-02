# Mount Sinai Chat Prototype

- [Purpose](#purpose)
- [Architecture](#architecture)
- [Running Chat Prototype Locally](#running-chat-prototype-locally)

## Purpose

Chat Prototype app where a user can join the chat and the system auto responses with a welcome message. System keeps track of number of messages. The full application state can restart on new browser window or server restart. 

## Architecture

Golang on the backend leveraging socket.io. Javascript/React on the frontend leveraginig the socket.io client. 

## Running Chat Prototype Locally

- `git clone`

Clone the repo and put it in your local directory. 

- `npm i`

Before running the app, install the frontend packages first. Go into `chat-prototype/frontend` and then run `npm i`. 

- `npm run start`

Runs the react frontend, and watches and auto-builds any changes made to the frontend. Any frontend changes will refresh the browser. By default we'll be listening on port 3000. 

- `go build main.go -> main`

Runs the Go backend server. In order to compile and build into an .exe, run `go build main.go`. To run the .exe and start up the server, run `main` from your terminal. By default we'll be listening on port 5000. 

Note: If you change the port in the backend, update `frontend/src/components/chat/index.js` line 6 with the new port as well. 

Note: If you change the default frontend port, update `app/main.go` line 17 with the new port as well.

Note: I didn't create a docker config for this app. Therefore, the easiest way to get the backend and frontend running simultaneously is opening two different terminals and running the specified commands.
