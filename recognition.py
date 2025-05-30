from dashscope import Generation
from http import HTTPStatus

def qwen_text_completion(user_input: str) -> int:
    """
    使用通义千问进行意图识别
    返回意图类型：
    1 = 产品推荐
    2 = 皮肤检测
    3 = 价格比较
    4 = 妆容推荐
    5 = 其他
    """
    prompt = f"""请分析以下用户输入的意图，并返回对应的数字：
    1 = 产品推荐相关
    2 = 皮肤检测相关
    3 = 价格比较相关
    4 = 妆容推荐相关
    5 = 其他类型
    
    用户输入：{user_input}
    
    只需返回数字，不需要其他解释。
    """
    
    try:
        response = Generation.call(
            model='qwen-max',  # 或其他适合的模型
            prompt=prompt,
            api_key='sk-e8f3bb6921a94265bd949f5675c4c8fa'  # 请替换为您的API key
        )
        
        if response.status_code == HTTPStatus.OK:
            # 提取返回的数字
            result = response.output.text.strip()
            # 确保返回值是1-5之间的数字
            try:
                intent = int(result)
                if 1 <= intent <= 5:
                    return intent
            except ValueError:
                pass
            
        return 5  # 如果无法识别，返回"其他"类型
        
    except Exception as e:
        print(f"意图识别出错: {str(e)}")
        return 5  # 发生错误时返回"其他"类型 