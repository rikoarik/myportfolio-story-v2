import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { cookies } from 'next/headers';

async function isAuthenticated() {
    const cookieStore = await cookies();
    const session = cookieStore.get('cms_session');
    return !!session;
}

// GET - Fetch layout config for a section
export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const sectionKey = searchParams.get('section');

    try {
        if (sectionKey) {
            const config = await prisma.layoutConfig.findUnique({
                where: { sectionKey },
            });

            if (!config) {
                return NextResponse.json(
                    { error: 'Config not found' },
                    { status: 404 }
                );
            }

            return NextResponse.json({
                ...config,
                data: JSON.parse(config.data),
            });
        } else {
            // Get all layout configs
            const configs = await prisma.layoutConfig.findMany();

            return NextResponse.json(
                configs.map((config: { data: string; }) => ({
                    ...config,
                    data: JSON.parse(config.data),
                }))
            );
        }
    } catch (error) {
        console.error('Get layout config error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// PUT - Update layout config
export async function PUT(request: NextRequest) {
    const isAuth = await isAuthenticated();
    if (!isAuth) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { sectionKey, gridCols, gap, padding, alignment, data } = await request.json();

        const updated = await prisma.layoutConfig.update({
            where: { sectionKey },
            data: {
                gridCols,
                gap,
                padding,
                alignment,
                data: JSON.stringify(data || {}),
            },
        });

        return NextResponse.json({
            ...updated,
            data: JSON.parse(updated.data),
        });
    } catch (error) {
        console.error('Update layout config error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
