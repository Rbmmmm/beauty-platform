from flask import Flask, request, jsonify
from flask_cors import CORS  # 添加CORS支持
from agent import process_user_input  # 导入agent.py中的核心功能

app = Flask(__name__)
CORS(app)  # 启用CORS，允许前端访问

@app.route('/recognize-intent', methods=['POST'])
def recognize_intent():
    """
    处理文本输入的端点
    """
    try:
        data = request.json
        user_input = data.get('input_text', '')
        print(f"收到文本输入: {user_input}")  # 打印接收到的输入，用于调试
        
        # 调用agent.py的处理函数
        result = process_user_input(user_input)
        return jsonify(result)
    except Exception as e:
        print(f"处理文本输入时出错: {str(e)}")
        return jsonify({
            "status": "error",
            "message": "处理请求时出错"
        }), 500

@app.route('/process-voice', methods=['POST'])
def process_voice():
    """
    测试语音输入功能的端点
    """
    try:
        # 检查是否收到音频文件
        if 'audio' not in request.files:
            print("没有收到音频文件")
            return jsonify({
                "status": "error",
                "message": "未收到音频文件"
            }), 400

        audio_file = request.files['audio']
        print(f"收到音频文件: {audio_file.filename}")  # 打印接收到的文件名，用于调试
        
        # 返回固定的测试响应
        return jsonify({
            "status": "success",
            "response": "系统测试中...\n已收到语音输入"
        })
    except Exception as e:
        print(f"处理语音输入时出错: {str(e)}")
        return jsonify({
            "status": "error",
            "message": "处理语音文件时出错"
        }), 500

def test_response(input_text: str = "") -> str:
    """
    测试函数：使用agent.py的功能处理输入
    参数：
        input_text: 用户的输入文本（可以是语音转文字的结果）
    返回：
        处理后的响应字符串
    """
    print(f"收到输入: {input_text}")  # 打印接收到的输入，用于调试
    result = process_user_input(input_text)
    
    if result["status"] == "success":
        if result["intent"] == 1:
            return f"产品推荐：\n{result['recommendation']}"
        elif result["intent"] == 2:
            return '请点击首页的"智能肤质检测"功能进行皮肤检测'
        elif result["intent"] == 3:
            return "正在为您比较相关产品的价格..."
        elif result["intent"] == 4:
            return f"妆容推荐：\n{result['recommendation']}"
        else:
            return "抱歉，我暂时无法理解您的需求，请换个方式描述"
    else:
        return "抱歉，处理您的请求时出现了问题，请稍后再试"

# 测试代码
if __name__ == "__main__":
    # 测试文本输入
    test_inputs = [
        "推荐一款适合干皮的面霜",
        "教我画适合上班的淡妆",
        "帮我检查一下皮肤状况"
    ]
    
    print("=== 开始测试功能 ===")
    for test_input in test_inputs:
        print(f"\n测试输入: {test_input}")
        result = test_response(test_input)
        print(f"测试结果: {result}")
    
    print("\n=== 启动测试服务器 ===")
    app.run(debug=True, port=5000) 