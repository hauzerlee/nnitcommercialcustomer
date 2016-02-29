from django.shortcuts import render
from django.http import HttpResponse
import httplib2


# from market_manage.models import Person
#
def postmethod(request):

    url = request.GET['url']
    data = request.GET['data']
    method = request.GET['method']
    h = httplib2.Http(".cache")

    if method == 'get':
        (resp, content) = h.request(url, "GET")
    else:
        (resp, content) = h.request(url, "POST", data)

    return HttpResponse(content)

#  # def login(request):
#     return render(request, 'pages/login.html')
#
# def main(request):
#     return render(request, 'pages/main.html')
#
# def user(request):
#     return render(request, 'pages/modules/user/blankpage.html', {'persons':Person.objects.all()})
