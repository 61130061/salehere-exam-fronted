# Proxumer - Frontend Developer Interview Question

> Submited by Warunyu Hematulin

Objective: A web-based, GraphQL-powered chat client

## Cover Letter

Thank you SALEHERE for considering my application and send me this test.
The test is very fun.
I have learned a lot of things from this test.

On this exam, I tried to use external library as less as possible to make it lightweight and functional following requirement.
Because this is the frontend exam, I try to make [backend](https://github.com/61130061/salehere-exam-backend.git) as simple as possible so checker can easily check the code on their local without deploying the server since deploying server specially with websocket function can cost some money.
Therefore, the database of backend server is using memery of server itself.


## Feature
- [x] Route protection (not enter name reroute to home page)
- [x] Real-time chat update
- [x] Styling following requirement + animation
- [x] show error message when chatroom not found or already existed
- [x] unit test with Jest
- [x] using docker

incoming...

- [ ] Authorization system for user
- [ ] using real database for production (currently use server memory for prototype)


## Start Guide

> This website will only works with specific backend server from another repository that I made. (If you following structure below, you should be fine)

1. Clone and run backend server from [this](https://github.com/61130061/salehere-exam-backend.git) repository with shell command below.

```sh
npm install

npm run dev
```

2. Run this web application by using Docker. (Docker should install package and walk you through install & build process)


## Stack
- React from initial assignment code
- react-router-dom: for route
- socket.io: real-time chatroom fetching
- Jest: unit testing from initial assignment code