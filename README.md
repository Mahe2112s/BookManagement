# BookManagement

Server >> Storing Book Data
       >> User Register
       >> Subscriber
       

This is a book record management API Server/Backend for library system or management of recors or mauals or books.

Fine System :
User : 01/11/2024 - 01/02/2025

* 1day fine - 50 rs
02/02/2025 => 50rs fine.
05/02/2025 => (4* 50/-) = 200rs fine.

Subscriptions:

3 months (Basic).
6 months (Standarad).
12 months (Premium).

If the subscription type is standard and if the subsciption date is 01/11/2024
=> then subscription valid till 01/05/2025.

Within subscription date >> if we miss the renwal >> 50/- day
subscription date is also been missed >> and also missd the renewal >> 100 + 50/- day.


>> Book1
>> Basic
>> let be the book purchased on 01/11/2024.
>> 02/11/2024 -> borrowes a book from library.
>> book1 renewal date is on 21/11/2024.
>> 23/11/2024 -> we need to pay a fine of 50/- * 2 = 100 /-

>> Book1
>> Basic
>> let be the book purchased on 01/11/2024.
>> 02/11/2024 -> borrowes a book from library.
>> book1 renewal date is on 21/11/2024.
>> 23/05/2025 -> we need to pay a fine of 100 + (no of days * 50) /-

missed by renewal date >> 50/-
missed by subscription date >> 100/-
missed by renewal & subscription >> 150/-

# Routes and  Endpoints - APIS

## / users

POST : Create a new user.
GET  : Get all the user info here.(All user).


## /users/{id} 
GET    : Get a user info by their ID (single user).
UPDATE : Update a user by their ID.
DELETE : Delete user by their ID (check if he/she still have an issued book) && (is there any fine to paid).

## /users/{id}/subscription-details/{id}

GET : Get user subscription details
    >> Date of subscription.
    >> Valid till.
    >> Is there any fine.


## /books

GET : Get all the books available.
POST: Create/Add a new book.

## /books/{id}

GET : Get a book by ID.
PUT: Update a book by its ID.

## /books/issuesd/withFine

GET : Get all issued books with their fine.


## npm init

##npm i nodemon --save-dev (developer dependency). 


