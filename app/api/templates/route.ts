import { NextResponse } from 'next/server';
import { AVAILABLE_TEMPLATES } from '~/lib/pdf-templates';

/**
 * 获取可用的 PDF 模板列表
 */
export async function GET() {
  try {
    return NextResponse.json({
      templates: AVAILABLE_TEMPLATES,
    });
  } catch (error) {
    console.error('Failed to get templates:', error);
    return NextResponse.json(
      {
        error: 'Failed to get templates',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
