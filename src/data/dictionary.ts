export const dictionary = {
    en: {
        header: {
            role: "Mobile Developer",
            menu: "MENU",
            menu_sub: "INFINITE ZIGZAG"
        },
        menu: {
            connect: "Connect",
            resources: "Resources",
            download_cv: "Download CV",
            pdf_format: "PDF Format",
            built_with: "Built with",
            designed_by: "Designed by"
        },
        chapters: {
            foundation: "Foundation",
            architecture: "Structure",
            state: "State & Flow",
            offline: "Offline-First",
            hardware: "Hardware",
            multiapp: "Scale",
            security: "Security",
            crossplatform: "Cross-Platform",
            production: "Production",
            refinement: "Refinement"
        },
        page: {
            foundation: {
                label: "01 Foundation",
                title_1: "REAL",
                title_2: "NEEDS",
                subtitle_1: "Not Big Ideas",
                desc_1: "It all starts with Android. Solving today's problems.",
                subtitle_2: "App Must Run",
                desc_2: "Correct data. Tamed state. Small errors feel expensive.",
                cards: ["START", "REAL", "NEEDS"]
            },
            structure: {
                label: "02 Structure Over Speed",
                title_1: "STABLE",
                title_2: "SYSTEM",
                desc: "Features are easy to build. Stable systems are not. Clean Architecture separates every layer clearly.",
                contract_label: "/ / THE CONTRACT",
                contract_title: "Repository is a contract.",
                contract_desc: "Not implementation. Controlled changes.",
                presentation: { title: "Presentation", desc: "UI doesn't know where data comes from." },
                data: { title: "Data", desc: "Rough implementation details." },
                domain: { title: "Domain Layer", desc: "Pure logic. Agnostic of UI." }
            },
            state: {
                label: "03 State & Flow",
                title_1: "PREDICTABLE",
                title_2: "STATE",
                quote: "\"No guessing. Events don't jump. UI only reacts.\"",
                cards: [
                    { title: "ViewModel", sub: "Take Control" },
                    { title: "One-Way", sub: "Data Flows" },
                    { title: "Reactive", sub: "UI Reacts" },
                    { title: "Debug", sub: "Makes Sense" }
                ]
            },
            offline: {
                label: "04 Offline-First Reality",
                title_1: "GHOST",
                title_2: "CONNECTION",
                desc: "Connections cannot be trusted. System must be ready. Data can be late, but never lost.",
                consistency: "Consistency is designed. Not assumed.",
                cards: [
                    { title: "Local Database", sub: "LaundryApp - SQLite Source of Truth", link: "https://github.com/rikoarik/LaundryApp" },
                    { title: "Background Sync", sub: "StoryApp - Paging & Sync", link: "https://github.com/rikoarik/StoryApp" },
                    { title: "Conflict Res", sub: "KKP Attendance - Auto Resolve", link: "#" } // Updated to KKP
                ]
            },
            hardware: {
                label: "05 Hardware Boundaries",
                title: "SOFTWARE MEETS PHYSICAL",
                desc: "Boundaries emerge. NFC unstable. Bluetooth slow. Real latency.",
                card_main: { title: "Hardware Abstraction", desc: "\"Hardware isolated. Business logic stays clean. Devices change, system lives on.\"" },
                card_iso: { title: "Isolation", desc: "Vendor independent layer." },
                card_stab: { title: "Stability", desc: "Graceful degradation." }
            },
            scale: {
                label: "06 Scale of Ecosystem",
                title: "APPLICATIONS",
                desc: "One becomes many. Patterns must be consistent but not rigid.",
                cards: [
                    { title: "ClosePay Merchant", sub: "Core Module Architecture", link: "https://github.com/rikoarik/merchant-closepay-core", type: "github" },
                    { title: "Member Ecosystem", sub: "Sangu Lirboyo • MyBrawijaya", link: "https://play.google.com/store/apps/details?id=com.solusinegeri.app.partner.p2l&hl=id", type: "playstore" },
                    { title: "Finance AI", sub: "Smart Management Dashboard", link: "https://github.com/rikoarik/finance-management-ai", type: "github" },
                    { title: "Launcher SolusiNegeri", sub: "Kiosk Mode • Device Admin", link: "https://play.google.com/store/apps/details?id=com.solusinegeri.launcher&hl=id", type: "playstore" }
                ]
            },
            security: {
                label: "07 Security as Assumption",
                title_1: "UNSAFE",
                title_2: "ENVIRONMENT",
                card_1: { title: "Assumption", desc: "Always assume breach. Root detection active. Hooking prevented." },
                card_2: { title: "Layered", desc: "Layered security. Not one button. Reduced risk." }
            },
            crossplatform: {
                label: "08 Cross-Platform Translation",
                title_1: "TECH CHANGES",
                title_2: "PRINCIPLES DON'T",
                cards: [
                    { title: "Android", sub: "Native Kotlin" },
                    { title: "iOS", sub: "Swift / SwiftUI" },
                    { title: "Flutter", sub: "Dart BLoC" },
                    { title: "React Native", sub: "TypeScript" }
                ],
                footer: "BLoC and hooks are just tools. Architecture remains core."
            },
            production: {
                label: "09 Production Discipline",
                title_1: "RELEASE IS NOT",
                title_2: "THE END",
                subtitle: "It's the start of new problems.",
                desc: "Signing must be correct. Build repeatable. Store policy obeyed. Crashes monitored.",
                card_1: { title: "Systematic", desc: "Production is a system. Not just an upload." },
                card_2: { title: "Secure", desc: "Signing keys managed. Secrets vault protected." }
            },
            refinement: {
                label: "10 Continuous Refinement",
                title: "NEVER FINISHED",
                cards: [
                    { title: "Aware", desc: "Refactor with purpose." },
                    { title: "Simple", desc: "Reduce cognitive load." },
                    { title: "Relay", desc: "Understandable by other engineers." }
                ],
                footer: "Work Continues"
            }
        }
    },
    id: {
        header: {
            role: "Pengembang Mobile",
            menu: "MENU",
            menu_sub: "ZIGZAG TAK TERBATAS"
        },
        menu: {
            connect: "Terhubung",
            resources: "Sumber Daya",
            download_cv: "Unduh CV",
            pdf_format: "Format PDF",
            built_with: "Dibuat dengan",
            designed_by: "Didesain oleh"
        },
        chapters: {
            foundation: "Pondasi",
            architecture: "Struktur",
            state: "Keadaan & Alur",
            offline: "Luring-Pertama",
            hardware: "Perangkat Keras",
            multiapp: "Skala",
            security: "Keamanan",
            crossplatform: "Lintas Platform",
            production: "Produksi",
            refinement: "Penyempurnaan"
        },
        page: {
            foundation: {
                label: "01 Pondasi",
                title_1: "KEBUTUHAN",
                title_2: "NYATA",
                subtitle_1: "Bukan Ide Besar",
                desc_1: "Semua dimulai dari Android. Dari masalah yang harus selesai hari ini.",
                subtitle_2: "Aplikasi Harus Jalan",
                desc_2: "Data benar. State tidak liar. Kesalahan kecil terasa mahal.",
                cards: ["MULAI", "NYATA", "BUTUH"]
            },
            structure: {
                label: "02 Struktur Di Atas Kecepatan",
                title_1: "SISTEM",
                title_2: "STABIL",
                desc: "Fitur cepat mudah dibuat. Sistem stabil tidak. Clean Architecture memisahkan tegas setiap layer.",
                contract_label: "/ / KONTRAK",
                contract_title: "Repository adalah kontrak.",
                contract_desc: "Bukan implementasi. Perubahan terkontrol.",
                presentation: { title: "Presentasi", desc: "UI tidak tahu data dari mana." },
                data: { title: "Data", desc: "Detail implementasi kasar." },
                domain: { title: "Layer Domain", desc: "Logika murni. Tidak tahu UI apa yang dipakai." }
            },
            state: {
                label: "03 Keadaan & Alur",
                title_1: "STATE",
                title_2: "DITEBAK",
                quote: "\"Bukan ditebak-tebak. Event tidak lompat. UI hanya bereaksi.\"",
                cards: [
                    { title: "ViewModel", sub: "Pegang Kendali" },
                    { title: "Satu-Arah", sub: "Data Mengalir" },
                    { title: "Reaktif", sub: "UI Bereaksi" },
                    { title: "Debug", sub: "Masuk Akal" }
                ]
            },
            offline: {
                label: "04 Realitas Offline-First",
                title_1: "KONEKSI",
                title_2: "HANTU",
                desc: "Koneksi tidak bisa dipercaya. Sistem harus siap. Data boleh terlambat, tapi tidak boleh hilang.",
                consistency: "Konsistensi dirancang. Bukan diasumsikan.",
                cards: [
                    { title: "Database Lokal", sub: "LaundryApp - SQLite Utama", link: "https://github.com/rikoarik/LaundryApp" },
                    { title: "Sinkronisasi Latar", sub: "StoryApp - Paging & Sync", link: "https://github.com/rikoarik/StoryApp" },
                    { title: "Resolusi Konflik", sub: "KKP Absensi - Auto Resolve", link: "#" }
                ]
            },
            hardware: {
                label: "05 Batasan Perangkat Keras",
                title: "SOFTWARE BERTEMU FISIK",
                desc: "Batasan muncul. NFC tidak stabil. Bluetooth lambat. Latency nyata.",
                card_main: { title: "Abstraksi Hardware", desc: "\"Hardware diisolasi. Business logic tetap bersih. Device bisa berganti, sistem tetap hidup.\"" },
                card_iso: { title: "Isolasi", desc: "Layer independen vendor." },
                card_stab: { title: "Stabilitas", desc: "Degradasi anggun." }
            },
            scale: {
                label: "06 Skala Ekosistem",
                title: "APLIKASI",
                desc: "Satu berkembang menjadi banyak. Pola harus konsisten tapi tidak kaku.",
                cards: [
                    { title: "ClosePay Merchant", sub: "Arsitektur Core Module", link: "https://github.com/rikoarik/merchant-closepay-core", type: "github" },
                    { title: "Ekosistem Member", sub: "Sangu Lirboyo • MyBrawijaya", link: "https://play.google.com/store/apps/details?id=com.solusinegeri.app.partner.p2l&hl=id", type: "playstore" },
                    { title: "Finance AI", sub: "Dashboard Manajemen Pintar", link: "https://github.com/rikoarik/finance-management-ai", type: "github" },
                    { title: "Launcher SolusiNegeri", sub: "Mode Kiosk • Admin Perangkat", link: "https://play.google.com/store/apps/details?id=com.solusinegeri.launcher&hl=id", type: "playstore" }
                ]
            },
            security: {
                label: "07 Keamanan sebagai Asumsi",
                title_1: "LINGKUNGAN",
                title_2: "TIDAK AMAN",
                card_1: { title: "Asumsi", desc: "Selalu asumsikan pelanggaran. Deteksi root aktif. Hooking dicegah." },
                card_2: { title: "Berlapis", desc: "Keamanan berlapis. Bukan satu tombol. Risiko dikurangi." }
            },
            crossplatform: {
                label: "08 Terjemahan Lintas Platform",
                title_1: "TEKNOLOGI BERUBAH",
                title_2: "PRINSIP TIDAK",
                cards: [
                    { title: "Android", sub: "Native Kotlin" },
                    { title: "iOS", sub: "Swift / SwiftUI" },
                    { title: "Flutter", sub: "Dart BLoC" },
                    { title: "React Native", sub: "TypeScript" }
                ],
                footer: "BLoC dan hooks hanyalah alat. Arsitektur tetap inti."
            },
            production: {
                label: "09 Disiplin Produksi",
                title_1: "RILIS BUKAN",
                title_2: "AKHIR",
                subtitle: "Ia awal masalah baru.",
                desc: "Signing harus benar. Build harus repeatable. Store policy dipatuhi. Crash dipantau.",
                card_1: { title: "Sistematis", desc: "Produksi adalah sistem. Bukan sekadar upload." },
                card_2: { title: "Aman", desc: "Kunci signing dikelola. Vault rahasia dilindungi." }
            },
            refinement: {
                label: "10 Penyempurnaan Berkelanjutan",
                title: "TIDAK PERNAH SELESAI",
                cards: [
                    { title: "Sadar", desc: "Refactor dengan tujuan." },
                    { title: "Simpel", desc: "Turunkan beban berpikir." },
                    { title: "Estafet", desc: "Agar dimengerti engineer lain." }
                ],
                footer: "Pekerjaan Berlanjut"
            }
        }
    }
};

export type Language = "en" | "id";
