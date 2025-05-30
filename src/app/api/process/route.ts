import { NextResponse } from 'next/server';
import { spawn } from 'child_process';

export async function POST(request: Request) {
  try {
    const { input } = await request.json();

    if (!input) {
      return NextResponse.json(
        { error: '请提供用户输入' },
        { status: 400 }
      );
    }

    // 调用 Python 脚本处理输入
    const result = await new Promise((resolve, reject) => {
      const pythonProcess = spawn('python', ['agent_cli.py', input]);
      let output = '';

      pythonProcess.stdout.on('data', (data) => {
        output += data.toString();
      });

      pythonProcess.stderr.on('data', (data) => {
        console.error(`Python Error: ${data}`);
      });

      pythonProcess.on('close', (code) => {
        if (code !== 0) {
          reject(new Error(`Python process exited with code ${code}`));
        } else {
          try {
            // 解析 Python 脚本返回的 JSON
            const result = JSON.parse(output);
            resolve(result);
          } catch (e) {
            reject(new Error('Failed to parse Python output'));
          }
        }
      });
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { status: 'error', message: '处理请求时出错' },
      { status: 500 }
    );
  }
} 