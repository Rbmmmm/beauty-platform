from django.contrib import admin
from django.utils.html import format_html
from .models import Post, Category

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'display_icon', 'created_at', 'updated_at')
    search_fields = ('name', 'description')
    list_filter = ('created_at', 'updated_at')
    readonly_fields = ('created_at', 'updated_at')
    ordering = ('-created_at',)

    def display_icon(self, obj):
        if obj.icon:
            return format_html('<img src="{}" width="32" height="32" />', obj.icon.url)
        return "无图标"
    display_icon.short_description = '图标'

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ('id', 'author', 'content_preview', 'category', 'display_images', 
                   'likes_count', 'comments_count', 'created_at')
    list_filter = ('category', 'created_at', 'author')
    search_fields = ('content', 'author__username', 'category__name')
    readonly_fields = ('created_at', 'updated_at', 'likes_count', 'comments_count')
    raw_id_fields = ('author',)
    ordering = ('-created_at',)
    list_per_page = 20

    def content_preview(self, obj):
        return obj.content[:100] + '...' if len(obj.content) > 100 else obj.content
    content_preview.short_description = '内容预览'

    def display_images(self, obj):
        if obj.images:
            return format_html(
                '<div style="display: flex; gap: 5px;">' + 
                ''.join([f'<img src="{img}" style="width: 50px; height: 50px; object-fit: cover;" />' 
                        for img in obj.images[:3]]) +
                ('...' if len(obj.images) > 3 else '') +
                '</div>'
            )
        return "无图片"
    display_images.short_description = '图片'

    def likes_count(self, obj):
        return obj.likes.count()
    likes_count.short_description = '点赞数'

    def comments_count(self, obj):
        return obj.comments.count()
    comments_count.short_description = '评论数'

    fieldsets = (
        ('基本信息', {
            'fields': ('author', 'content', 'category', 'tags')
        }),
        ('媒体', {
            'fields': ('images',)
        }),
        ('统计信息', {
            'fields': ('likes_count', 'comments_count')
        }),
        ('时间信息', {
            'fields': ('created_at', 'updated_at')
        }),
    )
