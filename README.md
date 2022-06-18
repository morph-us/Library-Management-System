# Library-Management-System
Basic Library Management System where a student can view list of available books in Library.


Library Admin can create an account and aditionally add , update or delete a book.

Library Admin is created ,authenticated and have permissions using the Django authentication system.

The project is currently deployed on heroku and can be viewed [here : https://cryptic-brushlands-35629.herokuapp.com/](https://cryptic-brushlands-35629.herokuapp.com/)


Tech stack : Django + HTML + CSS + JS + AJAX

It uses RESTful api created using **Django Rest frame work**.

This project also has other branch (**without_DRF**) which also uses RESTful api but the api is created **without** using **Django Rest frame work**.

## REST api documentation


RESTful API for operations on Model Book using Django REST framework

Note : some endpoints require authentications so cannot be directly tested on Post man.

You need to generate auth token to test API on POSTMAN. 

This project can generate auth token to test api

Following are steps to generate auth token.

1.Login to your account. https://cryptic-brushlands-35629.herokuapp.com/login/

2.visit endpoint **/auth/**  like: https://cryptic-brushlands-35629.herokuapp.com/auth/

3.copy the token value

4.create following Authorization header in Postman request: **Authorization : Token token_value**

5.Now your postman request is authorized.


### endpoint: /api/book/
Operation : create Book or Retrieve all books

Methods : POST for create , GET for retrieving all books

Allowed user for create operation: user must be authenticated and have permission to create Book i.e 'book.add_book' 

Allowed user for retrieving books: any user



#### endpoint: /api/book/{id}
Operation : Retrieve a book with given id

Methods : GET

Allowed user for retrieving books: user may be authenticated or may not be authenticated



### endpoint: /api/book/{id}/update
Operation : Update a book with given id

Methods : PUT

Allowed user for retrieving books: user must be authenticated and have permission to update Book i.e 'book.change_book'



### endpoint: /api/book/{id}/delete
Operation : Delete a book with given id

Methods : Delete

Allowed user for retrieving books: user must be authenticated and have permission to delete Book i.e 'book.delete_book'





