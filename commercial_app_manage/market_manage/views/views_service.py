from django.shortcuts import render
from django.http import HttpResponse
from urllib.parse import urlencode
import httplib2
import json
from django.views.decorators.csrf import csrf_exempt


# from market_manage.models import Person
#
@csrf_exempt
def proxyclient(request):
    # json.load(request.POST)
    json_data = json.loads(request.body.decode("utf-8"))

    try:
        url = json_data["url"]
    except:
        return HttpResponse(json.dumps("{data:nodata}"), content_type="application/json")

    try:
        method = json_data["method"].upper()
    except:
        method = "GET"

    h = httplib2.Http(".cache")

    if method == 'POST':
        try:
            data = request.GET['data']
        except:
            data = {}

    if method == 'GET':
        (response, content) = h.request(url, "GET")
    else:
        (response, content) = h.request(url, "POST", urlencode(data),
                                        headers={'Content-Type': 'application/x-www-form-urlencoded'})

    return HttpResponse(json.dumps(response), content_type="application/json")
    # return HttpResponse(content.decode('utf-8'))  # # def login(request):


def rest_test(request):
    response_data = {}
    response_data['result'] = 'successful'
    response_data['message'] = 'it\'s good to get data from this method!'
    return HttpResponse(json.dumps(response_data), content_type="application/json")

#     return render(request, 'pages/login.html')
#
# def main(request):
#     return render(request, 'pages/main.html')
#
# def user(request):
#     return render(request, 'pages/modules/user/blankpage.html', {'persons':Person.objects.all()})
