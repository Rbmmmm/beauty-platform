from flask import Flask, request, render_template, jsonify
import markdown
from bs4 import BeautifulSoup
import os
from recognition import qwen_text_completion  # 假设您将大模型代码放在一个模块中
from dashscope import Application
from http import HTTPStatus
app = Flask(__name__)

# @app.route('/')
#     return render_template('chat.html')  # 显示聊天页面

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
def get_product_recommendation(prompt):
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
    
#初步进行意图识别
@app.route('/recognize-intent', methods=['POST'])
def recognize_intent():
    data = request.json
    user_input = data.get('input_text') ##这里是用户的输入：语音识别的结果/文本输入

    # 调用大模型进行意图识别
    intent = qwen_text_completion(user_input)
    if intent == 1:
        # 调用 Dashscope API 获取产品推荐
        recommendation = get_product_recommendation(user_input)
        print(recommendation)
        # 返回推荐结果到前端
        return jsonify({"intent": intent, "recommendation": recommendation})
    if intent == 4:
        recommendation = get_makeup_recommendation(user_input)
        print(recommendation)
        # 返回推荐结果到前端
        return jsonify({"intent": intent, "recommendation": recommendation})

    return jsonify({"intent": intent})


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
    
    # 提取文本并根据不同主题段落进行分隔
    text = soup.get_text(separator="\n").strip()

    # 在转换后的文本中为不同主题分段（可以根据实际需求调整规则）
    # 假设每个"###"是一个新的段落，我们将按此规则进行分段
    split_text = text.split("\n###")  # 按照标题划分段落
    # 将分割后的段落合并，每个段落之间添加空行
    formatted_text = "\n\n".join(split_text)
    formatted_text = formatted_text.replace('。', '。\n')  # 将句号后面添加换行

    return formatted_text  # 每个段落之间添加空行

# 产品比价功能
@app.route('/compare-price')
def compare_price():
    user_input = request.args.get('user_input')
    # 调用价格对比模型，获取产品比价
    def get_product_comparison(prompt):
        response = Application.call(
            api_key="sk-92c2e2b3481548fc9c82aa765268ddbc",    #产品比价agent的apikey
            app_id='dfa0b4b49a0b47d5849798631ad62c06',        #产品比价agent的应用id
            prompt=prompt,
            rag_options={
                "pipeline_ids": ["file_feeeb7356024479c94c54f9f1859e067_10043558"],    #产品价格的知识库
            }
        )

        if response.status_code != HTTPStatus.OK:
            print(f'request_id={response.request_id}')
            print(f'code={response.status_code}')
            print(f'message={response.message}')
            return "API调用失败，请稍后再试。"
        else:
            return response.output.text  # 返回模型的推荐结果

    # 通过输入的文本生成产品比价
    comparison_result = get_product_comparison(f"根据以下用户需求，进行产品比价：{user_input}")
    # 将返回的比价结果转换为纯文本
    comparison_result_text = markdown_to_text(comparison_result)
    
    # 渲染比价页面
    return render_template('compare_price.html', user_input=user_input, comparison_result=comparison_result_text)


@app.route('/recommendation', methods=['GET'])
def recommendation():
    # 获取用户输入和产品推荐
    user_input = request.args.get('user_input')
    recommendation = request.args.get('recommendation')

    return render_template('recommendation.html', user_input=user_input, recommendation=recommendation)

@app.route('/question')
def questionnaire():
    return render_template('questionnaire.html')  # 渲染问卷页面

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

    # 如果皮肤类型未满足上述情况，可根据其他选项进行分析和建议（添加更多规则）
    else:
        result = "皮肤检测结果：正常皮肤"
        advice.append("问题分析：您的皮肤水油平衡，基本没有明显问题。")
        advice.append("建议：继续保持日常保湿护理，避免长时间暴露在阳光下。")
        advice.append("建议：使用温和的洁面产品，保持肌肤清洁。")
        advice.append("建议：每天使用防晒霜，避免紫外线伤害。")

    return result, advice

# 处理用户提交的表单
@app.route('/questionnaire', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        # 获取用户答案
        answers = {
            'skin_type': request.form['skin_type'],
            'acne': request.form['acne'],
            'dryness': request.form['dryness'],
            'sensitivity': request.form['sensitivity'],
            'blackheads': request.form['blackheads'],
            'aging_signs': request.form['aging_signs'],
            'redness': request.form['redness'],
            'allergies': request.form['allergies'],
            'sun_exposure': request.form['sun_exposure'],
            'exfoliation': request.form['exfoliation']
        }
        
        # 获取皮肤检测结果和护肤建议
        result, advice = get_skin_analysis_and_advice(answers)
        
        # 返回检测结果和建议
        return render_template('result.html', result=result, advice=advice)

    return render_template('questionnaire.html')


if __name__ == "__main__":
    app.run(debug=True)