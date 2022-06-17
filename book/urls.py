from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token


from . import views as views





urlpatterns = [
    #retrieve all books
    path('', views.book_list_create_view),
    
    #update a book
    path('<int:pk>/update/', views.book_update_view),
    
    #delete a book
    path('<int:pk>/delete/', views.book_destroy_view),
    
    #retrieve a book
    path('<int:pk>/', views.book_detail_view),
    
]