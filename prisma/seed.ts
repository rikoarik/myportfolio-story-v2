import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../src/lib/auth';
import { dictionary } from '../src/data/dictionary';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Starting database seed...');

    // Create admin user
    const admin = await prisma.user.upsert({
        where: { username: 'admin' },
        update: {},
        create: {
            username: 'admin',
            password: await hashPassword('admin123'),
        },
    });
    console.log('✅ Created admin user:', admin.username);

    // Clear existing content sections
    await prisma.contentSection.deleteMany({});
    console.log('🗑️  Cleared existing content sections');

    // Seed content sections
    const sections = ['foundation', 'structure', 'state', 'offline', 'hardware', 'scale', 'security', 'crossplatform', 'production', 'refinement'];

    for (const sectionKey of sections) {
        const enContent = dictionary.en.page[sectionKey as keyof typeof dictionary.en.page];
        const idContent = dictionary.id.page[sectionKey as keyof typeof dictionary.id.page];

        // English content
        await prisma.contentSection.create({
            data: {
                sectionKey,
                language: 'en',
                label: dictionary.en.chapters[sectionKey as keyof typeof dictionary.en.chapters] || sectionKey,
                data: JSON.stringify(enContent),
            },
        });

        // Indonesian content
        await prisma.contentSection.create({
            data: {
                sectionKey,
                language: 'id',
                label: dictionary.id.chapters[sectionKey as keyof typeof dictionary.id.chapters] || sectionKey,
                data: JSON.stringify(idContent),
            },
        });
    }
    console.log('✅ Created content sections for all chapters');

    // Seed default font config
    await prisma.fontConfig.upsert({
        where: { name: 'default' },
        update: {},
        create: {
            name: 'default',
            fontFamily: 'Inter, system-ui, sans-serif',
            h1Size: '6rem',
            h2Size: '3.75rem',
            h3Size: '1.875rem',
            bodySize: '1rem',
            weight: '400',
            data: JSON.stringify({
                h1Weight: '900',
                h2Weight: '700',
                h3Weight: '600',
            }),
        },
    });
    console.log('✅ Created default font configuration');

    // Seed default animation config
    await prisma.animationConfig.upsert({
        where: { name: 'default' },
        update: {},
        create: {
            name: 'default',
            type: 'fade',
            duration: 0.6,
            delay: 0,
            easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
            data: JSON.stringify({
                staggerChildren: 0.1,
                delayChildren: 0.2,
            }),
        },
    });
    console.log('✅ Created default animation configuration');

    // Seed default layout configs for each section
    for (const sectionKey of sections) {
        await prisma.layoutConfig.upsert({
            where: { sectionKey },
            update: {},
            create: {
                sectionKey,
                gridCols: 12,
                gap: 8,
                padding: 8,
                alignment: 'start',
                data: JSON.stringify({
                    responsive: {
                        mobile: { gridCols: 1, padding: 4 },
                        tablet: { gridCols: 6, padding: 6 },
                        desktop: { gridCols: 12, padding: 8 },
                    },
                }),
            },
        });
    }
    console.log('✅ Created layout configurations for all sections');

    console.log('🎉 Database seeding completed!');
}

main()
    .catch((e) => {
        console.error('❌ Error seeding database:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
