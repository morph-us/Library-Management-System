from django.urls import path
from . import views

urlpatterns = [
    path('',views.index),
    path('signup/',views.signup),
    path('login/',views.loginView),
    path('adminView/',views.adminView),
    path('logout/',views.logoutAdmin),
    path('tableview/',views.tableview),
    path('auth/', views.createToken)
    
   
]