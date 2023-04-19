# Proxumer - Frontend Developer Interview Question

> Submited by Warunyu Hematulin

Objective: A web-based, GraphQL-powered chat client

## Cover Letter

Thank you SALEHERE for considering my application and send me this test.
The test is very fun.
I have learned a lot of things from this test.


## Feature
- [x] Route protection (not enter name reroute to home page)
- [x] Real-time chat update
- [x] Styling following requirement + animation
- [x] show error message when chatroom not found or already existed
incoming...
- [ ] using real database for production (currently use server memory for prototype)
- [ ] Authorization system for user


## Start Guide

> This website will only works with specific backend server from another repository that I made. (If you following structure below, you should be fine)

1. Clone and run backend server from [this](https://github.com/61130061/salehere-exam-backend.git) repository with shell command below.

> backend have to run on PORT 4000 only and don't need docker to run it

```sh
npm install

npm run dev
```

2. Run this web application by using Docker. (Docker should install package and walk you through install & build process)


## Stack
- React from initial assignment
- react-router-dom: for route
- socket.io: real-time chatroom fetching