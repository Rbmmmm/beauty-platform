from django.db import models
from django.conf import settings
from django.contrib.auth import get_user_model
from django.utils.translation import gettext_lazy as _

User = get_user_model()

class Category(models.Model):
    """帖子分类"""
    name = models.CharField(_('分类名称'), max_length=50)
    description = models.TextField(_('分类描述'), max_length=200, blank=True)
    icon = models.ImageField(_('分类图标'), upload_to='category_icons/', blank=True, null=True)
    created_at = models.DateTimeField(_('创建时间'), auto_now_add=True)
    updated_at = models.DateTimeField(_('更新时间'), auto_now=True)

    class Meta:
        verbose_name = _('分类')
        verbose_name_plural = _('分类')
        ordering = ['-created_at']

    def __str__(self):
        return self.name

class Tag(models.Model):
    """标签"""
    name = models.CharField(_('标签名称'), max_length=50, unique=True)
    color = models.CharField(_('标签颜色'), max_length=7, default='#000000')
    created_at = models.DateTimeField(_('创建时间'), auto_now_add=True)

    class Meta:
        verbose_name = _('标签')
        verbose_name_plural = _('标签')
        ordering = ['name']

    def __str__(self):
        return self.name

class Activity(models.Model):
    """活动"""
    title = models.CharField(_('活动标题'), max_length=200)
    description = models.TextField(_('活动描述'))
    cover_image = models.ImageField(_('封面图片'), upload_to='activity_covers/', blank=True, null=True)
    tags = models.ManyToManyField(Tag, related_name='activities', blank=True, verbose_name=_('标签'))
    created_at = models.DateTimeField(_('创建时间'), auto_now_add=True)
    updated_at = models.DateTimeField(_('更新时间'), auto_now=True)

    class Meta:
        verbose_name = _('活动')
        verbose_name_plural = _('活动')
        ordering = ['-created_at']

    def __str__(self):
        return self.title

class Post(models.Model):
    """帖子"""
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='posts', verbose_name=_('作者'))
    content = models.TextField(_('内容'))
    images = models.JSONField(_('图片'), default=list, blank=True)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True, related_name='posts', verbose_name=_('分类'))
    activity = models.ForeignKey(Activity, on_delete=models.SET_NULL, null=True, blank=True, related_name='posts', verbose_name=_('活动'))
    tags = models.ManyToManyField(Tag, related_name='posts', blank=True, verbose_name=_('标签'))
    likes = models.ManyToManyField(User, related_name='liked_posts', blank=True, verbose_name=_('点赞'))
    collections = models.ManyToManyField(User, related_name='collected_posts', blank=True, verbose_name=_('收藏'))
    created_at = models.DateTimeField(_('创建时间'), auto_now_add=True)
    updated_at = models.DateTimeField(_('更新时间'), auto_now=True)

    class Meta:
        verbose_name = _('帖子')
        verbose_name_plural = _('帖子')
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.author.username}的帖子 - {self.content[:20]}'

class Comment(models.Model):
    """评论"""
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='comments', verbose_name=_('帖子'))
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='comments', verbose_name=_('作者'))
    content = models.TextField(_('评论内容'))
    parent = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name='replies', verbose_name=_('父评论'))
    likes = models.ManyToManyField(User, related_name='liked_comments', blank=True, verbose_name=_('点赞'))
    created_at = models.DateTimeField(_('创建时间'), auto_now_add=True)
    updated_at = models.DateTimeField(_('更新时间'), auto_now=True)

    class Meta:
        verbose_name = _('评论')
        verbose_name_plural = _('评论')
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.author.username}的评论 - {self.content[:20]}'

class PostImage(models.Model):
    post = models.ForeignKey(Post, related_name='post_images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='post_images/')

    def __str__(self):
        return f"{self.post.id} - {self.image.url}"
