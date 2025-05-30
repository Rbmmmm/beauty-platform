from django.urls import path, include
from rest_framework_nested import routers
from .views import PostViewSet, CategoryViewSet, CommentViewSet, TagViewSet, ActivityViewSet

# 创建主路由器
router = routers.SimpleRouter()
router.register(r'posts', PostViewSet)
router.register(r'categories', CategoryViewSet)
router.register(r'tags', TagViewSet)
router.register(r'activities', ActivityViewSet)

# 创建评论的嵌套路由
posts_router = routers.NestedSimpleRouter(router, r'posts', lookup='post')
posts_router.register(r'comments', CommentViewSet, basename='post-comments')

urlpatterns = [
    path('', include(router.urls)),
    path('', include(posts_router.urls)),
] 