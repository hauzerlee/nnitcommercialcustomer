from django.shortcuts import render
from django.http import HttpResponseRedirect

def root(request):
    return HttpResponseRedirect('login')

def login(request):
    return render(request, 'pages/login.html')

def main(request):
    return render(request, 'pages/main.html')
