"""
Views that serves templates for frontend

"""

from django.shortcuts import render,redirect
from django.http import JsonResponse

from django.contrib.auth.models import User,Permission
from django.contrib.auth import authenticate,login,logout
from book.models import Book

from rest_framework.authtoken.models import Token
import re


"""
This view shows student page if user is not authenticated,
redirect to admin page if user is authenticated  

Student Page only have permissions to view Books list.

"""
def index(request):
    if request.user.is_authenticated:
        return redirect('/adminView')
    queryset = list(Book.objects.all().values())
    context = { 
        "title" : "Library | Student",
        "books":queryset

    }
    return render(request,"studentView.html",context)


"""
This view shows long in page for admin to login
"""
def loginView(request):
    if request.user.is_authenticated:
        return redirect('/adminView')

    
    context = { 
        "title" : "Login"
    }

    if request.method == 'POST':
        response = {}
        data = request.POST
        print(data)
        email = validateEmail(data['email'])
        if email[0] != True:
            response['emailErr'] = email
            return JsonResponse(response)

        if not User.objects.filter(username = data['email']).exists():
            response['emailErr'] = 'No such user found. Please Sign Up'
            return JsonResponse(response)

        password = validatePassword(data['password'])
        if password[0] != True:
            response['passwordErr'] = password
            return JsonResponse(response)

        user = authenticate(username = data['email'], password = data['password'])    
        if user is not None:
            login(request,user)
            print('logged in')
            if user.has_perm('api.add_book'):
                print("user have add permission")
            return JsonResponse({'success':True})
        else:
            response['passwordErr'] = 'Invalid email and password combination' 
            return JsonResponse(response)
    




    return render(request,"login.html",context)

"""
This view shows Signup page for admin to create an account
"""
def signup(request):
    if request.method == 'POST':
        response = { }
        data = request.POST
        name = validateName(data['name'])
        
        if  name[0] != True:
            response['nameErr'] = name
            return JsonResponse(response)
        
        email = validateEmail(data['email'])
        if email[0] != True:
            response['emailErr'] = email
            return JsonResponse(response)

        if User.objects.filter(username = data['email']).exists():
            response['emailErr'] = 'User Already Registered! Please Login'
            return JsonResponse(response)

        password = validatePassword(data['password'])
        if password[0] != True:
            response['passwordErr'] = password
            return JsonResponse(response)

        #email of a user is used as username
        user = User.objects.create_user(data['email'], data['email'],data['password'])
        
        #permissions of operations on Book like view , add ,change or delete are set for a user when a user is created
        
        all_permissions = Permission.objects.filter(content_type__app_label='book', content_type__model='book')
        user.user_permissions.set(all_permissions)
        user.first_name = data['name']
        user.save()
        print("user created")
        return JsonResponse({'success': True })
    else:
        context = { 
        'title' : "Signup"
        }
        return render(request,"signup.html",context)


"""
This view displays admin page where admin can create, update or delete a book.

"""
def adminView(request):

    booklist = list(Book.objects.all().values())
    context = {
        'title': 'Library | Admin ',
        'books': booklist
        }
    return render(request,'adminView.html',context)


"""
This methods logout a user
"""
def logoutAdmin(request):
    if request.user.is_authenticated:
            logout(request)
    return redirect('/')            



"""
This view helps in refreshing the table on admin page in realtime when admin either add , update 
or delete a book
"""
def tableview(request):
    queryset = list(Book.objects.all().values()) 
    
    return render(request,'table_template.html', { 'books': queryset })



def createToken(request):
    user = request.user
    if request.user.is_authenticated:
        token, created = Token.objects.get_or_create(user=user)
        return JsonResponse({'token':token.key})
        





"""
Validation methods for email, password and name
"""

def validateEmail(email):
    regex = '^(\w|\.|\_|\-)+[@](\w|\_|\-|\.)+[.]\w{2,3}$'
    if email == "":
        return [False,"Enter email"]
    elif not re.search(regex, email):
        return [False,"Invalid email address"]
    else:
        return [True, email]


def validatePassword(password):
    regex = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!#%*?&]{6,20}$"
    if password == "":
        return [False,"Enter password"]
    elif not re.search(re.compile(regex), password):
        return [False,"Password must be atleast 6 char long, contain special character, number & a capital letter"]
    else:
        return [True, password]

def validateName(name):
    if name == "":
        return "Enter name"
    elif not re.match('[a-zA-Z\s]+$', name):
        return "Must contain only alphabets"
    else:
        return [True, name]


