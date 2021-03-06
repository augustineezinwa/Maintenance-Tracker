# Maintenance Tracker Application

[![Build Status](https://travis-ci.org/augustineezinwa/Maintenance-Tracker.svg?branch=ch-setup-eslint-babel-node-express-157584618)](https://travis-ci.org/augustineezinwa/Maintenance-Tracker)
[![Coverage Status](https://coveralls.io/repos/github/augustineezinwa/Maintenance-Tracker/badge.svg?branch=develop)](https://coveralls.io/github/augustineezinwa/Maintenance-Tracker?branch=develop)
 [![Maintainability](https://api.codeclimate.com/v1/badges/72b5e95d7a7ae48f2f7c/maintainability)](https://codeclimate.com/github/augustineezinwa/Maintenance-Tracker/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/72b5e95d7a7ae48f2f7c/test_coverage)](https://codeclimate.com/github/augustineezinwa/Maintenance-Tracker/test_coverage)
 
* *Maintenance Tracker Application UI Link*: https://augustineezinwa.github.io/Maintenance-Tracker/UI/index.html
* *Maintenance Tracker Application API documentation is live on*: https://mt-tracker.herokuapp.com/api-docs

## Application - Description
Maintenance Tracker App is an application that provides users with the ability to reach out to
operations or repairs department regarding repair or maintenance requests and monitor the
status of their request.
## Table of Content

* [Features](#features)
* [Technology](#technology)
* [Pre-installation](#pre-installation)
* [Installation](#installation)
* [Testing](#testing)
* [API End Points](#api-end-points)

## Features
Maintenance-Tracker consist of the following features:
###  Roles
* Users can register into Maintenance-Tracker
* Users can log into Maintenance-Tracker
* Users can view all Their requests in Maintenance-Tracker
* Users can create their requests in Maintenance-Tracker
* Users can update their requests in Maintenance-Tracker
* Admin can view all requests in Maintenance-Tracker
* Admin can approve any request in Maintenance-Tracker
* Admin can disapprove any request in Maintenance-Tracker
* Admin can resolve any request in Maintenance-Tracker
* Users can only see their request
### Authentication
* Every user is authenticated during login or signup
* Maintenance-Tracker makes use of json web token during authentication
* Every endpoint is secured except the signup or login endpoint
* Maintenance-Tracker recognises admin upon login as admin data is preseeded into database
* Users cant access the admin endpoints

## Technology

**Maintenance-Tracker** makes use of modern technologies. The core ones are:

* ECMAScript 6: Also known as ES2015, this is a version of Javascript with
    next-generation features like arrow functions, generators, enhanced object literals,
    spread operators and more. The ES2015 is used in many areas of this project. See [this link](https://en.wikipedia.org/wiki/ECMAScript) for details.
* NodeJS: Node.js is an open-source, cross-platform JavaScript run-time environment for executing JavaScript code on the server-side.
    See [this link](https://en.wikipedia.org/wiki/Node.js) for details.
* ExressJS: ExpressJS, is a web application framework for Node.js, It is designed for building web applications and APIs.
    see [this link](https://en.wikipedia.org/wiki/Express.js).
* Postgresql : Postgresql is an advanced open source Object-Relational Model (ORM) database.
* Major codes are written using the Airbnb javascript style guide, see [this link](https://github.com/airbnb/javascript) for details.
## Pre-installation
```
1. Make sure you have nodeJs installed. Go to [this link](https://nodejs.org/en) to get the latest version of node
2. Make sure you have postgres installed, an open source relational database, you can download and read more about it via [this link](https://https://www.postgresql.org/download/)
```
## Installation
1. Clone the repository:
```
https://github.com/augustineezinwa/Maintenance-Tracker
```
2. Navigate into the cloned repository:
```
cd Maintenance-Tracker
```
3. Install dependencies.
```
npm install
```
4. Start the application
```
npm start
```
5. Install postman to test all endpoints

## Testing
- to test run `npm test`

## API End Points
<table>
<tr><th>http verb</th><th>Endpoints</th><th>Action</th></tr>
<tr> <td>POST</td> <td> /auth/signup </td> <td>creates a new user</td></tr>
<tr> <td>POST</td> <td> /auth/login</td> <td>logins an existing user into Maintnenace-Tracker</td></tr>
<tr> <td>POST</td> <td> /users/requests </td> <td>creates a new Request </td></tr>
<tr> <td>PUT</td> <td>/users/requests/:requestId </td><td>Updates a request</td></tr>
<tr> <td>GET</td><td> /users/requests</td><td> Gets all requests</td></tr>
<tr><td> GET </td><td>/users/requests/:requestId</td><td> Gets a request by Id</td></tr>
<tr> <td>GET</td> <td> /requests </td> <td>Admin Route: Gets all requests in Maintenance </td></tr>
<tr> <td>GET</td> <td> /requests/:requestId </td> <td>Admin Route: Gets a particular request by Id </td></tr>
<tr> <td>PUT</td> <td> /requests/:requestId/approve </td> <td>Admin Route: Approves a request </td></tr>
<tr> <td>PUT</td> <td> /requests/:requestId/disapprove </td> <td>Admin Route: Disapproves a request </td></tr>
<tr> <td>PUT</td> <td> /requests/:requestId/resolve </td> <td>Admin Route: Resolves a request </td></tr>
</table>

<i>Project is rapidly in progress...</i>
