import sys
import json
from agent import process_user_input

def main():
    # 检查是否通过命令行参数传入输入
    if len(sys.argv) > 1:
        # 从命令行参数获取输入
        user_input = sys.argv[1]
        try:
            result = process_user_input(user_input)
            # 输出 JSON 格式的结果
            print(json.dumps(result, ensure_ascii=False))
        except Exception as e:
            print(json.dumps({
                "status": "error",
                "message": str(e)
            }, ensure_ascii=False))
    else:
        # 交互式模式
        print("欢迎使用智能美妆助手！")
        print("您可以询问：")
        print("- 产品推荐（如：推荐一款适合干皮的面霜）")
        print("- 妆容推荐（如：教我画适合上班的淡妆）")
        print("- 产品比价（如：比较一下这几款面霜的价格）")
        print("- 皮肤检测（如：帮我检查一下皮肤状况）")
        print("输入 'q' 退出程序")
        
        while True:
            user_input = input("\n请输入您的问题: ").strip()
            
            if user_input.lower() == 'q':
                print("感谢使用，再见！")
                break
                
            if not user_input:
                print("输入不能为空")
                continue
                
            try:
                print("\n正在处理您的问题...")
                result = process_user_input(user_input)
                
                if result["status"] == "success":
                    print("\n处理结果：")
                    print("-" * 50)
                    print(result["recommendation"])
                    print("-" * 50)
                else:
                    print(f"处理出错: {result.get('message', '未知错误')}")
                
            except Exception as e:
                print(f"处理过程中出现错误: {str(e)}")

if __name__ == "__main__":
    main() 