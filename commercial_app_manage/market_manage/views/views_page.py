from django.shortcuts import render
from django.http import HttpResponseRedirect
from market_manage.models.userinfo import UserInfo
import time

# from market_manage.testmodels import  Person

def root(request):
    return HttpResponseRedirect('login')

def login(request):
    request.session['timenow'] = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime(time.time()))
    return render(request, 'pages/login.html')

def main(request):
    return render(request, 'pages/modules/dashboard/dashboard.html')

def user(request):
    return render(request, 'pages/modules/user/blankpage.html',
                  {'persons': UserInfo.objects.all(), 'nowtime': request.session['timenow'],'method':request.method})

#user view
def userinfomanage(request):
    return render(request, 'pages/modules/user/userinfomanage.html')

def userintegralmanage(request):
    return render(request, 'pages/modules/user/userintegralmanage.html')


#shop view
def shopinfomanage(request):
    return render(request, 'pages/modules/shop/shopinfomanage.html')
