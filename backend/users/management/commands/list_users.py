from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from django.utils import timezone

User = get_user_model()

class Command(BaseCommand):
    help = '列出所有用户信息'

    def handle(self, *args, **options):
        users = User.objects.all().order_by('-date_joined')
        
        self.stdout.write(self.style.SUCCESS(f'找到 {users.count()} 个用户：\n'))
        
        for user in users:
            self.stdout.write(f'用户ID: {user.id}')
            self.stdout.write(f'用户名: {user.username}')
            self.stdout.write(f'昵称: {user.nickname}')
            self.stdout.write(f'手机号: {user.phone or "未设置"}')
            self.stdout.write(f'注册时间: {user.date_joined.strftime("%Y-%m-%d %H:%M:%S")}')
            self.stdout.write(f'最后登录: {user.last_login.strftime("%Y-%m-%d %H:%M:%S") if user.last_login else "从未登录"}')
            self.stdout.write('-' * 50) 