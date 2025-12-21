import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { cookies } from 'next/headers';

async function isAuthenticated() {
    const cookieStore = await cookies();
    const session = cookieStore.get('cms_session');
    return !!session;
}

// GET - Fetch font config
export async function GET() {
    try {
        const config = await prisma.fontConfig.findUnique({
            where: { name: 'default' },
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
    } catch (error) {
        console.error('Get font config error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// PUT - Update font config
export async function PUT(request: NextRequest) {
    const isAuth = await isAuthenticated();
    if (!isAuth) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { fontFamily, h1Size, h2Size, h3Size, bodySize, weight, data } = await request.json();

        const updated = await prisma.fontConfig.update({
            where: { name: 'default' },
            data: {
                fontFamily,
                h1Size,
                h2Size,
                h3Size,
                bodySize,
                weight,
                data: JSON.stringify(data || {}),
            },
        });

        return NextResponse.json({
            ...updated,
            data: JSON.parse(updated.data),
        });
    } catch (error) {
        console.error('Update font config error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
