import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { cookies } from 'next/headers';

// Helper to check authentication
async function isAuthenticated() {
    const cookieStore = await cookies();
    const session = cookieStore.get('cms_session');
    return !!session;
}

// GET - Fetch content sections
export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const sectionKey = searchParams.get('section');
    const language = searchParams.get('lang') || 'en';

    try {
        if (sectionKey) {
            // Get specific section
            const section = await prisma.contentSection.findUnique({
                where: {
                    sectionKey_language: {
                        sectionKey,
                        language,
                    },
                },
            });

            if (!section) {
                return NextResponse.json(
                    { error: 'Section not found' },
                    { status: 404 }
                );
            }

            return NextResponse.json({
                ...section,
                data: JSON.parse(section.data),
            });
        } else {
            // Get all sections for a language
            const sections = await prisma.contentSection.findMany({
                where: { language },
                orderBy: { sectionKey: 'asc' },
            });

            return NextResponse.json(
                sections.map((section: { data: string; }) => ({
                    ...section,
                    data: JSON.parse(section.data),
                }))
            );
        }
    } catch (error) {
        console.error('Get content error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// PUT - Update content section
export async function PUT(request: NextRequest) {
    const isAuth = await isAuthenticated();
    if (!isAuth) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { sectionKey, language, label, data } = await request.json();

        if (!sectionKey || !language || !data) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const updated = await prisma.contentSection.update({
            where: {
                sectionKey_language: {
                    sectionKey,
                    language,
                },
            },
            data: {
                label,
                data: JSON.stringify(data),
            },
        });

        return NextResponse.json({
            ...updated,
            data: JSON.parse(updated.data),
        });
    } catch (error) {
        console.error('Update content error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
