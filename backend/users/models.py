from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    """自定义用户模型"""
    nickname = models.CharField('昵称', max_length=50, blank=True)
    avatar = models.ImageField('头像', upload_to='avatars/', blank=True)
    bio = models.TextField('个人简介', max_length=500, blank=True)
    phone = models.CharField('手机号', max_length=11, blank=True)
    created_at = models.DateTimeField('创建时间', auto_now_add=True)
    updated_at = models.DateTimeField('更新时间', auto_now=True)

    class Meta:
        verbose_name = '用户'
        verbose_name_plural = verbose_name
        ordering = ['-date_joined']

    def __str__(self):
        return self.nickname or self.username
