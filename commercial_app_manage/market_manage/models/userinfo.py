from django.db import models

class UserInfo(models.Model):
    name = models.CharField(max_length=30)
    age = models.IntegerField()

    class Meta:
        db_table = 'userinfo'