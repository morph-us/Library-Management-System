# Library-Management-System
Basic Library Management System where a student can view list of available books in Library.  Library Admin can create an account and aditionally add , update or delete a book.  Library Admin is created ,authenticated and have permissions using the Django authentication system.

This project uses similiar RESTful api but without using Django REST framework.

The urls.py file in book app uses the views_without_DRF.py to get the Views.

## REST api documentation


RESTful API for operations on Model Book using Django REST framework



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

Methods : POST

Allowed user for retrieving books: user must be authenticated and have permission to update Book i.e 'book.change_book'



### endpoint: /api/book/{id}/delete
Operation : Delete a book with given id

Methods : Delete

Allowed user for retrieving books: user must be authenticated and have permission to delete Book i.e 'book.delete_book'





