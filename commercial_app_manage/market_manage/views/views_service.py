from django.shortcuts import render
from django.http import HttpResponse


# from market_manage.models import Person
#
def postmethod(request):
    return HttpResponse(request.method)

#
# def login(request):
#     return render(request, 'pages/login.html')
#
# def main(request):
#     return render(request, 'pages/main.html')
#
# def user(request):
#     return render(request, 'pages/modules/user/blankpage.html', {'persons':Person.objects.all()})
