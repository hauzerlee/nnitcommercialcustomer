from django.shortcuts import render

def login(request):
    return render(request, 'pages/login.html')

def main(request):
    return render(request, 'main.html')
