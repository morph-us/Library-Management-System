"""
RESTful API for operations on Model Book WITHOUT Django REST framework

"""
from django.http import JsonResponse
from django.forms.models import model_to_dict
from .models import Book
from .forms import BookForm


"""
BookListCreateAPIView
endpoint: /api/book/
Operation : create Book or Retrieve all books
Methods : POST for create , GET for retrieving all books
Allowed user for create operation: user must be authenticated and have permission to create Book i.e 'book.add_book' 
Allowed user for retrieving books: any user
"""

def BookListCreateAPIView(request):

    if request.method == 'GET':
        queryset = list(Book.objects.all().values())
        print(type(queryset))

        return JsonResponse(queryset,safe=False,status = 201)



    user = request.user
    if not test_auth(user):
        return JsonResponse({'success':False,"message":"Not Loggged in"},status=403)
    
    if not user.has_perm('book.add_book'):
        return JsonResponse({'success':False,"message":"Not Admin"},status=403)

    
    if request.method == 'POST':
        data = request.POST
        print(data)
        form = BookForm(data)
        if form.is_valid():
            form.save()
            return JsonResponse({'success':True},status = 201)
        else:
            print(form.errors)
            return JsonResponse({'success':False,'message':'Invalid data'},status = 400)

            _
    else:
        return JsonResponse({'success':False,'message':"method not allowed"}, status=405)



"""
BookDetailAPIView
endpoint: /api/book/{id}
Operation : Retrieve a book with given id
Methods : GET
Allowed user for retrieving books: user may be authenticated or may not be authenticated
"""


def BookDetailAPIView(request,pk):
    if request.method == 'GET':
        try:
            obj = Book.objects.get(id =pk)
        except Book.DoesNotExist:
            return JsonResponse({'success':False},status=404)

        
        return JsonResponse(model_to_dict(obj))
    else:
        return JsonResponse({'success':False,'message':"method not allowed"}, status=405)


"""
BookUpdateAPIView
endpoint: /api/book/{id}/update
Operation : Update a book with given id
Methods : POST
Allowed user for retrieving books: user must be authenticated and have permission to update Book i.e 'book.change_book'
"""

def BookUpdateAPIView(request,pk):
    user = request.user
    print(request.method)
    if not test_auth(user):
        return JsonResponse({'success':False,"message":"Not Loggged in"},status=403)
    
    if not user.has_perm('book.change_book'):
        return JsonResponse({'success':False,"message":"Not Admin"},status=403)


    if request.method == 'POST':
        try:
            obj = Book.objects.get(id =pk)
        except Book.DoesNotExist:
            return JsonResponse({'success':False},status=404)
        
        data = request.POST
        form = BookForm(data,instance = obj)
        if form.is_valid():
            form.save()
            return JsonResponse({'success':True},status=200)
        else:
            print(form.errors)
            return JsonResponse({'success':False,'message':'invalid data'},status = 400)
            _
    else:
        return JsonResponse({'success':False,'message':"method not allowed"}, status=405)



"""
BookUpdateAPIView
endpoint: /api/book/{id}/delete
Operation : Delete a book with given id
Methods : Delete
Allowed user for retrieving books: user must be authenticated and have permission to delete Book i.e 'book.delete_book'
"""

def BookDestroyAPIView(request,pk):
    user = request.user
    if not test_auth(user):
        return JsonResponse({'success':False,"message":"Not Loggged in"},status=403)
    
    if not user.has_perm('book.delete_book'):
        return JsonResponse({'success':False,"message":"Not Admin"},status=403)

    if request.method == 'DELETE':
        try:
            obj = Book.objects.get(id =pk)
        except Book.DoesNotExist:
            return JsonResponse({'success':False},status=404)

        obj.delete()
        return JsonResponse({'success':True})
    else:
        return JsonResponse({'success':False,'message':"method not allowed"}, status=405)
         


"""
Method to test if user is authenticated
"""

def test_auth(user):
    if user.is_authenticated:
        return True
    else:
        return False    


book_list_create_view = BookListCreateAPIView

book_detail_view = BookDetailAPIView

book_update_view = BookUpdateAPIView

book_destroy_view = BookDestroyAPIView






