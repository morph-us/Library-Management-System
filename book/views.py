"""
RESTful API for operations on Model Book using Django REST framework

"""
from rest_framework import  generics, permissions,authentication
from .models import Book
from .serializers import BookSerializer


"""
BookListCreateAPIView
endpoint: /api/book/
Operation : create Book or Retrieve all books
Methods : POST for create , GET for retrieving all books
Allowed user for create operation: user must be authenticated and have permission to create Book i.e 'book.add_book' 
Allowed user for retrieving books: any user
"""

class BookListCreateAPIView(generics.ListCreateAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    authentication_classes = [authentication.SessionAuthentication,authentication.TokenAuthentication]
    permission_classes = [permissions.DjangoModelPermissionsOrAnonReadOnly]

book_list_create_view = BookListCreateAPIView.as_view()



"""
BookDetailAPIView
endpoint: /api/book/{id}
Operation : Retrieve a book with given id
Methods : GET
Allowed user for retrieving books: user may be authenticated or may not be authenticated
"""

class BookDetailAPIView(generics.RetrieveAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


book_detail_view = BookDetailAPIView.as_view()


"""
BookUpdateAPIView
endpoint: /api/book/{id}/update
Operation : Update a book with given id
Methods : PUT
Allowed user for retrieving books: user must be authenticated and have permission to update Book i.e 'book.change_book'
"""

class BookUpdateAPIView(generics.UpdateAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    authentication_classes = [authentication.SessionAuthentication,authentication.TokenAuthentication]
    permission_classes = [permissions.DjangoModelPermissions]



book_update_view = BookUpdateAPIView.as_view()


"""
BookUpdateAPIView
endpoint: /api/book/{id}/delete
Operation : Delete a book with given id
Methods : Delete
Allowed user for retrieving books: user must be authenticated and have permission to delete Book i.e 'book.delete_book'
"""

class BookDestroyAPIView(generics.DestroyAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    authentication_classes = [authentication.SessionAuthentication,authentication.TokenAuthentication]
    permission_classes = [permissions.DjangoModelPermissions]

book_destroy_view = BookDestroyAPIView.as_view()





