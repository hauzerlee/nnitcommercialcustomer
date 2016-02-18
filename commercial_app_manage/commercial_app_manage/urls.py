"""commercial_app_manage URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/dev/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url
from market_manage.views import views_page  as vPage
from market_manage.views import views_service  as vService

urlpatterns = [
    url(r'^$', vPage.root),
    url(r'^login/$', vPage.login),
    url(r'^main/$', vPage.main),

    #usermanage
    url(r'^user/userinfomanage/$', vPage.userinfomanage),
    url(r'^user/userintegralmanage/$', vPage.userintegralmanage),

    #shopmanage



    #mallmanage


]

#server's methods
# urlpatterns.append([
#
#
#
# ])