from django.shortcuts import render
from django.http import HttpResponseRedirect
from market_manage.models.userinfo import UserInfo
# from market_manage.testmodels import  Person

def root(request):
    return HttpResponseRedirect('login')


def login(request):
    return render(request, 'pages/login.html')


def main(request):
    return render(request, 'pages/main.html')


def user(request):
    return render(request, 'pages/modules/user/blankpage.html', {'persons': UserInfo.objects.all()})
