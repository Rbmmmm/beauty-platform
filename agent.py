from recognition import qwen_text_completion  # 假设您将大模型代码放在一个模块中
from dashscope import Application
from http import HTTPStatus
import markdown
from bs4 import BeautifulSoup

#产品推荐功能
def get_product_recommendation(prompt):
    response = Application.call(
        api_key="sk-92c2e2b3481548fc9c82aa765268ddbc",  # 产品推荐agent的API Key
        app_id='7ed520dc4d8e4e7d825297db9bf9d86d',  # 产品推荐agent的应用ID
        prompt=prompt,
        rag_options={
            "pipeline_ids": ["file_4467d15f735d42c18a5afe02acf93bda_10043558"],  # 化妆品产品信息的知识库ID
        }
    )

    if response.status_code != HTTPStatus.OK:
        print(f'request_id={response.request_id}')
        print(f'code={response.status_code}')
        print(f'message={response.message}')
        return "API调用失败，请稍后再试。"
    else:
        return response.output.text  # 返回模型的推荐结果

#妆容推荐功能
def get_makeup_recommendation(prompt):
    response = Application.call(
        api_key="sk-92c2e2b3481548fc9c82aa765268ddbc",  # 妆容推荐agent的API Key
        app_id='0fa6ce810355410c9d07ffac752b1816',  # 妆容推荐agent的应用ID
        prompt=prompt,
        rag_options={
            "pipeline_ids": ["file_4467d15f735d42c18a5afe02acf93bda_10043558"],  # 妆容信息的知识库ID
        }
    )

    if response.status_code != HTTPStatus.OK:
        print(f'request_id={response.request_id}')
        print(f'code={response.status_code}')
        print(f'message={response.message}')
        return "API调用失败，请稍后再试。"
    else:
        return response.output.text  # 返回模型的推荐结果

# 产品比价功能
def get_product_comparison(prompt):
    response = Application.call(
        api_key="sk-92c2e2b3481548fc9c82aa765268ddbc",    #产品比价agent的apikey
        app_id='dfa0b4b49a0b47d5849798631ad62c06',        #产品比价agent的应用id
        prompt=prompt,
        rag_options={
            "pipeline_ids": ["file_546445227d9f4e7c9a92ede314cab2f7_10043558"],    #产品价格的知识库
        }
    )

    if response.status_code != HTTPStatus.OK:
        print(f'request_id={response.request_id}')
        print(f'code={response.status_code}')
        print(f'message={response.message}')
        return "API调用失败，请稍后再试。"
    else:
        return response.output.text  # 返回模型的推荐结果

def markdown_to_text(markdown_text):
    """
    将Markdown格式的文本转换为纯文本
    :param markdown_text: 输入的Markdown格式文本
    :return: 纯文本格式
    """
    # 使用Markdown的Python解析器将Markdown转换为HTML
    html = markdown.markdown(markdown_text)

    # 然后再从HTML提取纯文本
    soup = BeautifulSoup(html, 'html.parser')
    
    # 提取文本
    text = soup.get_text(separator=' ').strip()
    
    # 清理多余的空白
    text = ' '.join(text.split())  # 将多个空白字符替换为单个空格
    
    # 处理标题和段落
    lines = text.split('###')
    formatted_lines = []
    for line in lines:
        if line.strip():
            formatted_lines.append(line.strip())
    
    # 将处理后的文本组合，使用单个换行符分隔
    formatted_text = '\n'.join(formatted_lines)
    
    # 在句号后添加换行，但避免重复的换行
    formatted_text = formatted_text.replace('。', '。\n')
    # 清理可能产生的连续换行
    formatted_text = '\n'.join(line.strip() for line in formatted_text.splitlines() if line.strip())
    
    return formatted_text

# 定义皮肤检测结果和护肤/化妆建议
def get_skin_analysis_and_advice(answers):
    result = ""
    advice = []

    # 分析皮肤类型和问题
    if answers['sensitivity'] == '经常发红，过敏':
        result = "皮肤检测结果：敏感肌肤 + 过敏反应"
        advice.append("问题分析：皮肤敏感，容易过敏，需要非常温和且无刺激的护肤产品。")
        advice.append("建议：选用无香料、无泡沫的温和洁面产品。")
        advice.append("建议：选择含有舒缓成分如甘草酸盐、积雪草的修复精华。")
        advice.append("建议：使用专为敏感肌设计的无刺激性面霜，保持皮肤屏障。")

    elif answers['acne'] == '经常长痘痘或粉刺':
        result = "皮肤检测结果：油性皮肤 + 痘痘问题"
        advice.append("问题分析：油脂分泌过多，毛孔容易堵塞，需要控油、抗痘的护肤方案。")
        advice.append("建议：使用控油洁面产品，避免过多刺激皮肤。")
        advice.append("建议：使用含有水杨酸或茶树油成分的精华，帮助去痘。")
        advice.append("建议：使用不油腻的保湿乳液，避免皮肤干燥引发更多痘痘。")

    elif answers['aging_signs'] == '经常有细纹，明显衰老':
        result = "皮肤检测结果：成熟皮肤 + 衰老迹象"
        advice.append("问题分析：出现细纹、松弛等衰老迹象，需抗衰老护理。")
        advice.append("建议：使用抗衰老精华，含有抗衰老成分如视黄醇、维C等。")
        advice.append("建议：选择紧致面霜，帮助紧致肌肤，减少皱纹和细纹。")
        advice.append("建议：保持肌肤水分，使用保湿产品，防止干燥加剧衰老迹象。")

    elif answers['dryness'] == '非常容易干燥，紧绷':
        result = "皮肤检测结果：干性皮肤 + 干燥问题"
        advice.append("问题分析：皮肤缺水，常感到干燥紧绷，缺乏足够的滋润。")
        advice.append("建议：使用深层保湿面霜和精华，帮助锁住水分。")
        advice.append("建议：避免使用刺激性洁面产品，选择温和不刺激的洁面乳。")
        advice.append("建议：定期使用滋润面膜，为皮肤提供额外的水分和营养。")

    else:
        result = "皮肤检测结果：正常皮肤"
        advice.append("问题分析：您的皮肤水油平衡，基本没有明显问题。")
        advice.append("建议：继续保持日常保湿护理，避免长时间暴露在阳光下。")
        advice.append("建议：使用温和的洁面产品，保持肌肤清洁。")
        advice.append("建议：每天使用防晒霜，避免紫外线伤害。")

    return result, advice

def process_user_input(input_text: str) -> dict:
    """
    处理用户输入，返回意图和推荐结果
    参数：
        input_text: 用户的输入文本（语音识别的结果或直接文本输入）
    返回：
        包含意图和推荐结果的字典
    """
    try:
        # 调用大模型进行意图识别
        intent = qwen_text_completion(input_text)
        
        # 根据意图处理
        if intent == 1:
            # 产品推荐
            recommendation = get_product_recommendation(input_text)
            formatted_result = markdown_to_text(recommendation)
            return {
                "status": "success",
                "intent": intent,
                "recommendation": formatted_result
            }
        elif intent == 2:
            # 皮肤检测（返回引导信息）
            return {
                "status": "success",
                "intent": intent,
                "recommendation": '请点击首页的"智能肤质检测"功能进行皮肤检测'
            }
        elif intent == 3:
            # 价格比较
            comparison = get_product_comparison(f"根据以下用户需求，进行产品比价：{input_text}")
            formatted_result = markdown_to_text(comparison)
            return {
                "status": "success",
                "intent": intent,
                "recommendation": formatted_result
            }
        elif intent == 4:
            # 妆容推荐
            recommendation = get_makeup_recommendation(input_text)
            formatted_result = markdown_to_text(recommendation)
            return {
                "status": "success",
                "intent": intent,
                "recommendation": formatted_result
            }
        else:
            # 其他意图
            return {
                "status": "success",
                "intent": intent,
                "recommendation": "暂不支持该功能"
            }
            
    except Exception as e:
        print(f"处理用户输入时出错: {str(e)}")
        return {
            "status": "error",
            "message": "处理请求时出错"
        }

# 测试代码
if __name__ == "__main__":
    # 测试不同类型的输入
    test_inputs = [
        "推荐一款适合干皮的面霜",
        "帮我检查一下皮肤状况",
        "比较一下这几款面霜的价格",
        "教我画适合上班的淡妆"
    ]
    
    for test_input in test_inputs:
        print(f"\n测试输入: {test_input}")
        result = process_user_input(test_input)
        print(f"处理结果: {result}")