from django.shortcuts import render
from rest_framework import viewsets, status, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import Post, Category, Comment
from .serializers import (
    PostListSerializer,
    PostDetailSerializer,
    PostCreateSerializer,
    CategorySerializer,
    CommentSerializer
)

# Create your views here.

class PostViewSet(viewsets.ModelViewSet):
    """帖子视图集"""
    queryset = Post.objects.all()
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_serializer_class(self):
        if self.action == 'create':
            return PostCreateSerializer
        elif self.action == 'retrieve':
            return PostDetailSerializer
        return PostListSerializer

    def get_queryset(self):
        queryset = Post.objects.all()
        category = self.request.query_params.get('category', None)
        if category:
            queryset = queryset.filter(category_id=category)
        return queryset.order_by('-created_at')

    @action(detail=True, methods=['post'])
    def like(self, request, pk=None):
        """点赞帖子"""
        post = self.get_object()
        if post.likes.filter(id=request.user.id).exists():
            post.likes.remove(request.user)
            return Response({'status': 'unliked'})
        else:
            post.likes.add(request.user)
            return Response({'status': 'liked'})

    @action(detail=True, methods=['post'])
    def collect(self, request, pk=None):
        """收藏帖子"""
        post = self.get_object()
        if post.collections.filter(id=request.user.id).exists():
            post.collections.remove(request.user)
            return Response({'status': 'uncollected'})
        else:
            post.collections.add(request.user)
            return Response({'status': 'collected'})

class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    """分类视图集"""
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.AllowAny]

class CommentViewSet(viewsets.ModelViewSet):
    """评论视图集"""
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        return Comment.objects.filter(
            post_id=self.kwargs['post_pk'],
            parent=None
        ).order_by('-created_at')

    def create(self, request, *args, **kwargs):
        """创建评论"""
        print('='*50)
        print('创建评论 - 请求信息:')
        print(f'请求方法: {request.method}')
        print(f'请求头: {request.headers}')
        print(f'请求体: {request.body}')
        print(f'请求数据: {request.data}')
        print(f'URL参数: {self.kwargs}')
        print(f'用户: {request.user}')
        print('='*50)

        try:
            serializer = self.get_serializer(data=request.data)
            print(f'序列化器初始数据: {serializer.initial_data}')
            
            if not serializer.is_valid():
                print(f'序列化器验证错误: {serializer.errors}')
                return Response(
                    {'detail': serializer.errors},
                    status=status.HTTP_400_BAD_REQUEST
                )

            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED,
                headers=headers
            )
        except Exception as e:
            print(f'创建评论时发生错误: {str(e)}')
            return Response(
                {'detail': str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )

    def perform_create(self, serializer):
        """执行评论创建"""
        post_id = self.kwargs.get('post_pk')
        post = get_object_or_404(Post, id=post_id)
        parent_id = self.request.data.get('parent')
        
        try:
            if parent_id:
                parent = get_object_or_404(Comment, id=parent_id, post=post)
                serializer.save(author=self.request.user, post=post, parent=parent)
            else:
                serializer.save(author=self.request.user, post=post)
            print('评论创建成功')
        except Exception as e:
            print(f'评论创建失败: {str(e)}')
            raise

    @action(detail=True, methods=['post'])
    def like(self, request, post_pk=None, pk=None):
        """点赞评论"""
        comment = self.get_object()
        if comment.likes.filter(id=request.user.id).exists():
            comment.likes.remove(request.user)
            return Response({'status': 'unliked'})
        else:
            comment.likes.add(request.user)
            return Response({'status': 'liked'})

    @action(detail=True, methods=['get'])
    def replies(self, request, post_pk=None, pk=None):
        """获取评论的回复列表"""
        comment = self.get_object()
        replies = comment.replies.all().order_by('-created_at')
        page = self.paginate_queryset(replies)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = self.get_serializer(replies, many=True)
        return Response(serializer.data)
