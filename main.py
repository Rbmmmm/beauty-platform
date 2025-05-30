import eel
from agent import process_user_input

# 初始化eel，指定web文件目录
eel.init('src')

# 暴露Python函数到JavaScript
@eel.expose
def handle_user_input(text):
    """
    处理用户输入的函数，暴露给JavaScript调用
    """
    return process_user_input(text)

# 启动应用
if __name__ == '__main__':
    try:
        # 启动应用，使用Chrome作为浏览器
        eel.start('index.html', mode='chrome', port=3000)
    except Exception as e:
        print(f"启动应用时出错: {str(e)}")
        # 如果Chrome不可用，尝试使用系统默认浏览器
        eel.start('index.html', mode='default', port=3000) 