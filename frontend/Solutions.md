# assignment-2-coolchar
## Overview
This assignment is writtern in Angular using Angular CLI

## How to start
Install Angular CLI globally to bootstrap the frontend

    npm install -g @angular/cli

Start the frontend server (default port: 4200)

    npm install

    ng serve

## In the login page
Please use the following credentials to login (because we are not allowed to implement the backend)

    username: admin

    password: admin

## Features & How to use
This is a game which allows users to manage and review their property from stock investiment. By default, each of new users will be given a certain amount of money (e.g. 5000 CAD). The users can buy stock using this money, and they can sell the stock they owned in order to earn profit. The stock price is drawn from the API chosen from IEX Developer Platform (https://iextrading.com/developer/).

After a user logged in the app (please use the default credentials memtioned above), it routes to the index view. In the index view it shows the user's current status. For example, it shows the user's cash flow and the earned money as 2 graphs, one for the current day, another for the past year. Then the user can click the "Market" button in the navigation bar to search/buy/sell stock. If the input of search bar is empty, it will show a list containing all the stocks the user owned, and there is a button called 'sell' in each entry in the list. The user can search a specific stock by stock name (e.g. `FB` for Facebook), if the stock name is found then the app will show 3 graphs which are the price of the current day, and the week, and the year. if the stock name is not found, it will show a not found error message and non of the graphs will be shown. Upon a found stock, there will be a button named 'buy' which allows the user to buy this stock use the avaiable cash. If the user enters a number that exceeds the available cash, the buy button will be disabled. Moreover, if the input is not a number, the button will be disabled as well and the app will show a message saying the input is not valid. In the 'Rank' view, the app will show all users in an order from the richest to the poorest. 


**API**

     ./src/app/home/service/api.service.ts
     
     This file is where we call the IEX stock price API.

**View structure**

    Root View (handle root routing between home and auth)

      --  Auth (handle login)

          -- Login View

      --  Home (handle routing after login)

          -- Shared 

              -- Navbar View (Home, Market, Rank)

          -- Dashboard View (when user clicks Home in navbar, it is also the default (index) view after login)

          -- Stock

              -- Stock List View (when user clicks Market in navbar)

          -- User

              -- User List View (when user clicks Rank in navbar)
