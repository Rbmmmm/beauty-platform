from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Post, Category, Comment, PostImage

User = get_user_model()

class UserBriefSerializer(serializers.ModelSerializer):
    """用户简要信息序列化器"""
    class Meta:
        model = User
        fields = ('id', 'username', 'nickname', 'avatar')

class CategorySerializer(serializers.ModelSerializer):
    """分类序列化器"""
    class Meta:
        model = Category
        fields = ('id', 'name', 'description', 'icon')

class CommentSerializer(serializers.ModelSerializer):
    """评论序列化器"""
    author = UserBriefSerializer(read_only=True)
    likes_count = serializers.SerializerMethodField(read_only=True)
    is_liked = serializers.SerializerMethodField(read_only=True)
    replies = serializers.SerializerMethodField(read_only=True)
    
    class Meta:
        model = Comment
        fields = ('id', 'post', 'author', 'content', 'parent', 
                 'likes_count', 'is_liked', 'replies', 'created_at')
        read_only_fields = ('id', 'author', 'post', 'likes_count', 'is_liked', 'replies', 'created_at')

    def validate(self, attrs):
        """验证评论数据"""
        print(f"验证评论数据: {attrs}")
        if 'content' not in attrs or not attrs['content'].strip():
            raise serializers.ValidationError({"content": "评论内容不能为空"})
        attrs['content'] = attrs['content'].strip()
        return attrs

    def get_likes_count(self, obj):
        return obj.likes.count()

    def get_is_liked(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return obj.likes.filter(id=request.user.id).exists()
        return False

    def get_replies(self, obj):
        if obj.parent is None:  # 只处理顶级评论的回复
            replies = obj.replies.all()[:3]  # 限制只返回前3条回复
            return CommentBriefSerializer(replies, many=True).data
        return []

class CommentBriefSerializer(serializers.ModelSerializer):
    """评论简要信息序列化器（用于显示回复）"""
    author = UserBriefSerializer(read_only=True)
    
    class Meta:
        model = Comment
        fields = ('id', 'author', 'content', 'created_at')

class PostImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostImage
        fields = ['id', 'image']

class PostListSerializer(serializers.ModelSerializer):
    """帖子列表序列化器"""
    author = UserBriefSerializer(read_only=True)
    category = CategorySerializer(read_only=True)
    likes_count = serializers.SerializerMethodField()
    comments_count = serializers.SerializerMethodField()
    is_liked = serializers.SerializerMethodField()
    is_collected = serializers.SerializerMethodField()
    images = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ('id', 'author', 'content', 'images', 'category', 'tags',
                 'likes_count', 'comments_count', 'is_liked', 'is_collected',
                 'created_at', 'updated_at')
        read_only_fields = ('author', 'likes_count', 'comments_count', 'is_liked', 'is_collected')

    def get_likes_count(self, obj):
        return obj.likes.count()

    def get_comments_count(self, obj):
        return obj.comments.count()

    def get_is_liked(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return obj.likes.filter(id=request.user.id).exists()
        return False

    def get_is_collected(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return obj.collections.filter(id=request.user.id).exists()
        return False

    def get_images(self, obj):
        return [img.image.url for img in obj.post_images.all()]

class PostDetailSerializer(PostListSerializer):
    """帖子详情序列化器"""
    comments = serializers.SerializerMethodField()

    class Meta(PostListSerializer.Meta):
        fields = PostListSerializer.Meta.fields + ('comments',)

    def get_comments(self, obj):
        # 只获取顶级评论（没有父评论的评论）
        comments = obj.comments.filter(parent=None).order_by('-created_at')[:10]  # 限制返回前10条评论
        return CommentSerializer(comments, many=True, context=self.context).data

class PostCreateSerializer(serializers.ModelSerializer):
    images = serializers.ListField(
        child=serializers.ImageField(), write_only=True, required=False
    )

    class Meta:
        model = Post
        fields = ('content', 'images', 'category', 'tags')
        extra_kwargs = {
            'images': {'required': False},
            'category': {'required': False},
            'tags': {'required': False}
        }

    def create(self, validated_data):
        images = validated_data.pop('images', [])
        post = Post.objects.create(author=self.context['request'].user, **validated_data)
        for image in images:
            PostImage.objects.create(post=post, image=image)
        return post 