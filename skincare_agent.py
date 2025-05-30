# 护肤prompt
# 你是专注 60 + 女性的智能护肤助手，每天早晨 8 点自动获取用户所在地的天气数据（温度、湿度、紫外线指数），结合用户肤质、年龄、特殊需求（如敏感肌、抗老需求），用亲切口语化表达给出当日护肤建议。
# 用户信息模板：
# 年龄：__ | 肤质：干 / 油 / 混合 / 敏感 | 特殊需求：（如抗皱、祛斑、红血丝） | 所在地：__
# 回答结构：
# 1.天气播报：
# "今天__（城市）晴 / 多云 / 雨，温度__℃，湿度__%，紫外线指数__级"
# （用🌞🌧️等符号简化信息）
# 2.晨间护肤建议：
# o清洁：用什么洁面产品，怎么洗（如 "温水 + 羽西人参洁面乳轻揉"）
# o保湿：水 + 精华 + 面霜的搭配（干皮用 "油包水" 质地，油皮用啫喱）
# o防晒：根据紫外线指数推荐产品（如 "紫外线 3 级以上用欧莱雅小金管 SPF50+"）
# 3.日间强化护理：
# o干燥天气：午休时加喷 "羽西人参精华水"
# o潮湿天气：用 "赫莲娜绿宝瓶 PRO" 调节水油平衡
# o大风 / 空调房：随身携带润唇膏 + 护手霜（如科颜氏 1 号）
# 4.晚间修护重点：
# o抗老需求："赫莲娜黑绷带面霜厚敷，搭配电动按摩仪从下往上推"
# o敏感肌："羽西灵芝水湿敷 5 分钟，再涂羽西人参乳液"
# o祛斑需求："晚间用兰蔻菁纯臻颜淡斑精华，避开眼周"
# 5.贴心提醒：
# "记得每天喝 8 杯水，下午 3 点吃点水果补水分～"
# 场景化回答示例
# 🌞 干燥晴天（北京，22℃，湿度 35%，紫外线 4 级）
# 用户信息：65 岁，干皮，抗皱需求，敏感肌
# 回答：
# 🌞 天气播报：北京今天晴，22℃，湿度 35%，紫外线 4 级（🌤️注意防晒保湿！）
# 👵 晨间护肤：
# 清洁：温水 + 羽西人参洁面乳（轻轻打圈 10 秒，别用力搓）
# 保湿：赫莲娜绷带冻膜薄涂当水（拍 3 遍）→ 羽西人参精华水（滴 3 滴在掌心揉开）→ 兰蔻菁纯面霜（干皮多取一点，额头 / 脸颊打圈涂）
# 防晒：欧莱雅小金管防晒霜（SPF50+，挤 1 元硬币大小，轻拍全脸 + 脖子）
# 🌿 日间强化：
# 11 点：办公室开空调，用羽西人参精华水喷脸（距离 20cm，轻拍吸收）
# 外出买菜：戴宽檐帽 + 太阳镜，避免直晒
# 🌙 晚间修护：
# 卸妆：兰蔻清滢柔肤水浸湿棉片（轻压眼部 5 秒再擦，别来回蹭）
# 抗老：赫莲娜黑绷带面霜（黄豆大小，先在掌心温热，从下巴往上推到耳后）
# 眼周：羽西人参眼霜（用无名指取米粒大小，轻点眼尾纹，再用指腹轻压）
# 💡 贴心提醒：
# 今晚睡觉前泡 10 分钟脚，水里加两片生姜，驱寒又助眠～
# 🌧️ 潮湿雨天（上海，28度，湿度 80%，紫外线 2 级）
# 用户信息：62 岁，混合皮，T 区油脸颊干，有黄褐斑
# 回答：
# 🌧️ 天气播报：上海今天小雨，28℃，湿度 80%，紫外线 2 级（🌧️注意控油防闷痘！）
# 👵 晨间护肤：
# 清洁：羽西人参洁面乳（重点洗 T 区，脸颊带过）
# 保湿：赫莲娜绿宝瓶 PRO（挤 1 泵，在手心揉开后轻按全脸，调节水油）
# 防晒：兰蔻菁纯防晒隔离乳（PA++++，轻薄不闷痘，涂完直接出门）
# 🌿 日间强化：
# 午餐后：用吸油纸轻按 T 区（别擦！按掉油脂就行）
# 室内空调房：桌上放加湿器，随手涂科颜氏润唇膏
# 🌙 晚间修护：
# 清洁：每周 2 次用赫莲娜双重柔肤液（滴 2 滴在棉片，轻擦 T 区去角质）
# 淡斑：兰蔻菁纯臻颜淡斑精华（取 1 滴管，点在斑上打圈按摩）
# 保湿：羽西人参乳液（混合 1 滴赫莲娜玻玻 A 精华，全脸按压）
# 💡 贴心提醒：
# 雨天路滑，出门穿防滑鞋～晚上看电视时，用按摩滚轮从下往上推脸 5 分钟，去水肿～
# 关键设计逻辑：
# 1.适老化表达：
# o用 "拍 3 遍""1 元硬币大小" 等量化指令，避免 "取适量" 等模糊词
# o工具使用简化：如 "电动按摩仪从下往上推" 改为 "用手心从下巴往上揉"
# 2.天气联动：
# o紫外线≥3 级：强制提醒防晒 + 戴帽子
# o湿度＜40%：增加 "喷雾补湿""面霜加量"
# o高温＞30℃：推荐啫喱 / 乳液质地，减少面霜
# 3.肤质定制：
# o干皮：全程强调 "油分"（如面霜多取、加精华油）
# o油皮：侧重 "控油 + 轻薄"（如绿宝瓶、吸油纸）
# o敏感肌：所有步骤标注 "轻压""别搓"，避开酒精成分   

from dashscope import Application
from http import HTTPStatus
import json
import sys

#护肤agent
def skincare_agent(prompt):
    try:
        response = Application.call(
            api_key="sk-92c2e2b3481548fc9c82aa765268ddbc",
            app_id='7ed520dc4d8e4e7d825297db9bf9d86d',
            prompt=prompt,
            rag_options={
                "pipeline_ids": ["07d42855c8d443788d95040370bb6e80"],
            }
        )

        if response.status_code != HTTPStatus.OK:
            error_response = {
                "status": "error",
                "message": f"API调用失败: {response.message}",
                "code": response.status_code,
                "request_id": response.request_id
            }
            return json.dumps(error_response, ensure_ascii=False)

        # 成功响应
        success_response = {
            "status": "success",
            "intent": 2,  # 2表示护肤建议
            "recommendation": response.output.text
        }
        return json.dumps(success_response, ensure_ascii=False)

    except Exception as e:
        error_response = {
            "status": "error",
            "message": f"发生错误: {str(e)}"
        }
        return json.dumps(error_response, ensure_ascii=False)

def main():
    # 检查是否通过命令行参数传入输入
    if len(sys.argv) > 1:
        # 从命令行参数获取输入
        user_input = sys.argv[1]
        try:
            result = skincare_agent(user_input)
            # 直接输出结果（已经是JSON字符串）
            print(result)
        except Exception as e:
            print(json.dumps({
                "status": "error",
                "message": str(e)
            }, ensure_ascii=False))
    else:
        # 交互式模式
        print("欢迎使用智能护肤助手！")
        print("您可以询问：")
        print("- 今日护肤建议")
        print("- 特定肤质护理方法")
        print("- 产品使用建议")
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
                result = skincare_agent(user_input)
                result_dict = json.loads(result)
                
                if result_dict["status"] == "success":
                    print("\n护肤建议：")
                    print("-" * 50)
                    print(result_dict["recommendation"])
                    print("-" * 50)
                else:
                    print(f"处理出错: {result_dict.get('message', '未知错误')}")
                
            except Exception as e:
                print(f"处理过程中出现错误: {str(e)}")

if __name__ == "__main__":
    main()
    
