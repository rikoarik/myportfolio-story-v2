import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { cookies } from 'next/headers';

async function isAuthenticated() {
    const cookieStore = await cookies();
    const session = cookieStore.get('cms_session');
    return !!session;
}

// GET - Fetch animation config
export async function GET() {
    try {
        const config = await prisma.animationConfig.findUnique({
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
        console.error('Get animation config error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// PUT - Update animation config
export async function PUT(request: NextRequest) {
    const isAuth = await isAuthenticated();
    if (!isAuth) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { type, duration, delay, easing, data } = await request.json();

        const updated = await prisma.animationConfig.update({
            where: { name: 'default' },
            data: {
                type,
                duration,
                delay,
                easing,
                data: JSON.stringify(data || {}),
            },
        });

        return NextResponse.json({
            ...updated,
            data: JSON.parse(updated.data),
        });
    } catch (error) {
        console.error('Update animation config error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
