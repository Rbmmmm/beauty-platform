import sys
import json
from agent import process_user_input

def main():
    """
    命令行接口：接收用户输入，返回处理结果
    使用方法：python agent_cli.py "用户输入文本"
    """
    if len(sys.argv) < 2:
        print(json.dumps({
            "status": "error",
            "message": "请提供用户输入文本"
        }))
        return

    # 获取用户输入
    user_input = sys.argv[1]
    
    # 处理用户输入
    result = process_user_input(user_input)
    
    # 输出JSON格式的结果
    print(json.dumps(result, ensure_ascii=False))

if __name__ == "__main__":
    main() 