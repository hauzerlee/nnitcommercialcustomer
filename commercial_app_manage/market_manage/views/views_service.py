from django.shortcuts import render
from django.http import HttpResponse
from urllib.parse import urlencode
import httplib2
import json
from django.views.decorators.csrf import csrf_exempt
from market_manage.models.userinfo import UserInfo
from qiniu import Auth, put_file, etag, urlsafe_base64_encode
import qiniu.config


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
            data = json.loads(json_data['postdata'])
        except:
            data = {}

    if method == 'GET':
        (response, content) = h.request(url, "GET")
    else:
        (response, content) = h.request(url, "POST", json.dumps(data),
                                        headers={'Content-Type': 'application/json'})

    return HttpResponse(content, content_type="application/json")
    # return HttpResponse(json.dumps(content), content_type="application/json")

    # return HttpResponse(content.decode('utf-8'))  # # def login(request):


@csrf_exempt
def rest_test(request):
    response_data = {}
    response_data['result'] = 'successful'
    response_data['message'] = 'it\'s good to get data from this method!'

    json_data = json.loads(request.body.decode("utf-8"))
    return HttpResponse(json.dumps(json_data), content_type="application/json")
    # return HttpResponse(json.dumps(UserInfo.objects.all()), content_type="application/json")


def qiniuToken(request):
    key = request.GET['key']
    # 需要填写你的 Access Key 和 Secret Key
    access_key = 'kFmbaJOe2KzZV8wXKRYFnKD9nlSUHf3jpIvfiHrd'
    secret_key = 'RFhvgHqh0t93pOaLR70MarVmgbQhKTylmFpMKWIw'

    # 构建鉴权对象
    q = Auth(access_key, secret_key)

    # 要上传的空间
    bucket_name = 'Bucket_Name'

    # 上传到七牛后保存的文件名
    # key = 'my-python-logo.png';

    # 生成上传 Token，可以指定过期时间等
    token = q.upload_token(bucket_name, key, 3600)

    return HttpResponse(token)

#     return render(request, 'pages/login.html')
#
# def main(request):
#     return render(request, 'pages/main.html')
#
# def user(request):
#     return render(request, 'pages/modules/user/blankpage.html', {'persons':Person.objects.all()})
