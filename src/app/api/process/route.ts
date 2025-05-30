import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export async function POST(request: Request) {
  try {
    const { input } = await request.json();

    if (!input) {
      return NextResponse.json(
        { error: '请提供用户输入' },
        { status: 400 }
      );
    }

    // 调用Python脚本
    const { stdout } = await execAsync(`python agent_cli.py "${input.replace(/"/g, '\\"')}"`);
    const result = JSON.parse(stdout);

    return NextResponse.json(result);
  } catch (error) {
    console.error('处理错误:', error);
    return NextResponse.json(
      { error: '处理请求时出错' },
      { status: 500 }
    );
  }
} 