from django.shortcuts import render
from rest_framework import viewsets, status, permissions
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import Post, Category, Comment, Activity, Tag
from .serializers import (
    PostListSerializer,
    PostDetailSerializer,
    PostCreateSerializer,
    CategorySerializer,
    CommentSerializer,
    ActivitySerializer,
    TagSerializer
)
import subprocess
import json
import os
import time
from django.contrib.auth import get_user_model

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
        activity = self.request.query_params.get('activity', None)
        if category:
            queryset = queryset.filter(category_id=category)
        if activity:
            queryset = queryset.filter(activity_id=activity)
        return queryset.order_by('-created_at')

    @action(detail=False, methods=['get'])
    def my_posts(self, request):
        """获取当前用户的帖子列表"""
        posts = Post.objects.filter(author=request.user).order_by('-created_at')
        page = self.paginate_queryset(posts)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = self.get_serializer(posts, many=True)
        return Response(serializer.data)

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

class TagViewSet(viewsets.ModelViewSet):
    """标签视图集"""
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [permissions.IsAdminUser()]
        return [permissions.AllowAny()]

class ActivityViewSet(viewsets.ModelViewSet):
    """活动视图集"""
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer
    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [permissions.IsAdminUser()]
        return [permissions.AllowAny()]

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def ai_reply(request, post_id):
    try:
        print(f"开始处理AI回复请求 - 帖子ID: {post_id}")
        post = Post.objects.get(id=post_id)
        print(f"处理帖子内容: {post.content}")
        
        # 获取项目根目录
        base_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
        agent_cli_path = os.path.join(base_dir, 'agent_cli.py')
        
        print(f"当前工作目录: {os.getcwd()}")
        print(f"项目根目录: {base_dir}")
        print(f"agent_cli.py 完整路径: {agent_cli_path}")
        
        if not os.path.exists(agent_cli_path):
            error_msg = f'找不到 agent_cli.py 文件: {agent_cli_path}'
            print(f"错误：{error_msg}")
            return Response(
                {'error': error_msg},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
            
        # 检查 Python 解释器路径
        python_path = subprocess.run(['which', 'python'], capture_output=True, text=True).stdout.strip()
        print(f"Python 解释器路径: {python_path}")
        
        # 检查文件权限
        print(f"agent_cli.py 文件权限: {oct(os.stat(agent_cli_path).st_mode)[-3:]}")
        
        # 设置 PYTHONPATH 环境变量
        env = os.environ.copy()
        env['PYTHONPATH'] = base_dir
        env['PYTHONHASHSEED'] = 'random'
        
        print("开始执行 agent_cli.py...")
        try:
            result = subprocess.run(
                [python_path, agent_cli_path, post.content],
                capture_output=True,
                text=True,
                cwd=base_dir,
                env=env,
                timeout=30
            )
            print(f"agent_cli.py 执行完成 - 返回码: {result.returncode}")
        except subprocess.TimeoutExpired:
            error_msg = '生成回复超时，请稍后重试'
            print(f"错误：{error_msg}")
            return Response(
                {'error': error_msg},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        except Exception as e:
            error_msg = f'执行失败: {str(e)}'
            print(f"错误：{error_msg}")
            return Response(
                {'error': error_msg},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        
        print(f"agent_cli.py 输出: {result.stdout}")
        if result.stderr:
            print(f"agent_cli.py 错误输出: {result.stderr}")
        
        if result.returncode != 0:
            error_msg = f'生成回复失败: {result.stderr}'
            print(f"错误：{error_msg}")
            return Response(
                {'error': error_msg},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
            
        try:
            response_data = json.loads(result.stdout)
            print(f"解析的响应数据: {response_data}")
            
            if response_data.get('status') == 'error':
                error_msg = response_data.get('message', '生成回复失败')
                print(f"Agent 返回错误: {error_msg}")
                return Response(
                    {'error': error_msg},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )
            
            recommendation = response_data.get('recommendation', '')
            if not recommendation:
                error_msg = '未获取到有效的回复内容'
                print(f"错误：{error_msg}")
                return Response(
                    {'error': error_msg},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )
            
            print("开始创建AI评论...")
            User = get_user_model()
            
            ai_user, created = User.objects.get_or_create(
                username='AI机器人',
                defaults={
                    'is_staff': False,
                    'is_active': True
                }
            )
            
            comment = Comment.objects.create(
                post=post,
                author=ai_user,
                content=recommendation
            )
            print(f"AI评论创建成功 - ID: {comment.id}")
            
            return Response({
                'reply': recommendation,
                'status': 'success',
                'comment_id': comment.id
            }, status=status.HTTP_200_OK)
            
        except json.JSONDecodeError as e:
            error_msg = f'解析回复内容失败: {str(e)}'
            print(f"错误：{error_msg}")
            print(f"原始输出: {result.stdout}")
            return Response(
                {'error': error_msg},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
            
    except Post.DoesNotExist:
        error_msg = '帖子不存在'
        print(f"错误：{error_msg}")
        return Response(
            {'error': error_msg},
            status=status.HTTP_404_NOT_FOUND
        )
    except Exception as e:
        error_msg = f'生成回复失败: {str(e)}'
        print(f"错误：{error_msg}")
        return Response(
            {'error': error_msg},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
