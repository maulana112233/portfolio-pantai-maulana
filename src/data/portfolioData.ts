import { Project, PipelineStage, TimelineMilestone, BeachQuote } from '../types';

export const PERSONAL_INFO = {
  name: "Maulana Ichsan",
  shortName: "Maulana",
  grade: "X TKJ 1",
  major: "Teknik Komputer dan Jaringan",
  school: "SMK Telkom Malang",
  motto: "Membangun konektivitas tangguh dari kabel hingga awan, berjiwa pesisir yang tenang dan pantang menyerah.",
  status: "Siswa Aktif • Network & Linux Enthusiast",
  locationBadge: "Malang, Jawa Timur 🇮🇩",
  beachVibe: "Coastal Neo-Brutalist Edition",
  bio: `Halo! Saya Maulana Ichsan, siswa kelas X TKJ 1 di SMK Telkom Malang. Saya memiliki antusiasme mendalam pada arsitektur jaringan komputer, konfigurasi router, administrasi server Linux, serta pengembangan antarmuka web modern. Di sela-sela praktikum konfigurasi VLAN dan routing protocol, saya suka bereksplorasi menciptakan proyek interaktif yang memadukan keandalan teknis dengan estetika visual segar.`,
  socials: [
    { name: "Instagram", url: "https://instagram.com/maulana.icsn", icon: "Instagram", handle: "@maulana.icsn" },
    { name: "TikTok", url: "https://tiktok.com/@maulanaichsansyah", icon: "Video", handle: "@maulanaichsansyah" },
    { name: "GitHub", url: "https://github.com", icon: "Github", handle: "@maulana-ichsan" },
    { name: "LinkedIn", url: "https://linkedin.com", icon: "Linkedin", handle: "Maulana Ichsan" },
    { name: "Discord", url: "https://discord.com", icon: "MessageSquare", handle: "ichsan_tkj#0001" },
  ]
};

export const PROJECTS: Project[] = [
  {
    id: "cisco-campus-net",
    title: "Cisco Enterprise Multi-Floor Campus Network",
    category: "network",
    badge: "Cisco IOS & Packet Tracer",
    summary: "Simulasi topologi jaringan berskala enterprise multi-lantai dengan segregasi VLAN, OSPF Dynamic Routing, dan proteksi Port Security.",
    description: "Perancangan dan simulasi arsitektur jaringan gedung bertingkat untuk kebutuhan institusi pendidikan/perkantoran. Dilengkapi segmentasi departemen menggunakan VLAN, redundansi gateway menggunakan HSRP, serta firewall access-list untuk pembatasan hak akses antardivisi.",
    problem: "Kebutuhan infrastruktur jaringan kampus yang aman dari broadcast storm, isolasi trafik departemen finance dan lab, serta failover otomatis saat link utama putus.",
    solution: "Menerapkan pembagian VLAN 10-40, Inter-VLAN Routing pada multilayer switch, OSPF area 0 untuk routing backbone, serta DHCP Snooping dan Dynamic ARP Inspection.",
    architectureDetails: [
      "Core-Distribution-Access 3-Tier Hierarchical Model",
      "VLAN 10 (Admin), VLAN 20 (Lab Siswa), VLAN 30 (Server), VLAN 40 (WiFi Publik)",
      "OSPF Multi-Area dengan MD5 Authentication",
      "Port Security (Sticky MAC) membatasi 2 perangkat per port access"
    ],
    metrics: [
      { label: "VLAN Segregation", value: "4 Segmen", detail: "Isolasi trafik sempurna" },
      { label: "Failover Time", value: "< 1.8s", detail: "HSRP Virtual Gateway" },
      { label: "Packet Loss", value: "0%", detail: "Simulasi full payload" }
    ],
    techStack: ["Cisco Packet Tracer", "Cisco IOS", "VLAN 802.1Q", "OSPF", "HSRP", "Subnetting VLSM"],
    githubUrl: "https://github.com",
    demoUrl: "https://github.com",
    colorTheme: "from-sky-400 to-blue-600",
    icon: "Network"
  },
  {
    id: "mikrotik-hotspot-qos",
    title: "MikroTik Hotspot & Intelligent Bandwidth Management",
    category: "network",
    badge: "MikroTik RouterOS",
    summary: "Implementasi captive portal hotspot berbasis voucher, integrasi RADIUS mock, dan manajemen bandwidth bertingkat menggunakan Queue Tree & PCQ.",
    description: "Konfigurasi komprehensif pada MikroTik RouterOS (RB750Gr3 / CHR) untuk melayani konektivitas publik yang tertata. Menjamin alokasi bandwidth adil bagi setiap klien sekaligus memprioritaskan paket penting (DNS, ICMP, dan VoIP) di atas traffic unduhan biasa.",
    problem: "Satu pengguna yang mengunduh file besar sering kali menghabiskan seluruh kuota bandwidth, mengakibatkan latensi tinggi pada pengguna lain di lingkungan sekolah.",
    solution: "Membuat parent queue untuk membatasi total bandwidth ISP, kemudian memecahnya menggunakan algoritma PCQ (Per Connection Queue) dan menandai koneksi (Mangle) berdasarkan tipe protokol.",
    architectureDetails: [
      "Captive Portal kustom dengan login page bertema pesisir ramah pengguna",
      "Firewall Mangle: mark routing, mark connection, dan mark packet",
      "Queue Tree hierarkis dengan jaminan CIR (Limit-at) dan batas maksimal MIR (Max-Limit)",
      "Isolasi pengguna via client-to-client isolation pada Wireless AP"
    ],
    metrics: [
      { label: "Fairness Index", value: "98.5%", detail: "PCQ Dynamic Equal Sharing" },
      { label: "Latency Spike", value: "-65%", detail: "Bufferbloat terkendali" },
      { label: "Concurrent Users", value: "100+ User", detail: "Teruji stabil pada CHR" }
    ],
    techStack: ["MikroTik RouterOS", "Queue Tree & PCQ", "Firewall Mangle", "Captive Portal", "Winbox"],
    githubUrl: "https://github.com",
    demoUrl: "https://github.com",
    colorTheme: "from-amber-400 to-orange-500",
    icon: "Wifi"
  },
  {
    id: "linux-docker-homelab",
    title: "Linux Debian Server Homelab & Docker Containers",
    category: "server",
    badge: "Linux Debian & Docker",
    summary: "Infrastruktur server mandiri berbasis Linux Debian 12 dengan orkestrasi container Docker, reverse proxy Nginx, dan DNS Sinkhole Pi-hole.",
    description: "Pembangunan home server lokal hemat daya untuk kebutuhan latihan administrasi sistem. Menjalankan berbagai service terisolasi dalam Docker container, dilengkapi sertifikat SSL internal, backup terjadwal via Bash script, dan pemantauan metrik berkala.",
    problem: "Keterbatasan perangkat fisik untuk menguji banyak server service secara bersamaan tanpa mengacaukan sistem operasi host.",
    solution: "Virtualisasi berbasis kontainer (Docker Compose) yang ringan, memungkinkan deploy DNS lokal, web server, database, dan dashboard monitoring dalam hitungan detik.",
    architectureDetails: [
      "OS: Debian 12 Bookworm (Minimal Server CLI Installation)",
      "Docker Compose multi-service architecture",
      "Nginx Reverse Proxy dengan custom local domain (.internal)",
      "Pi-hole DNS untuk pemblokiran iklan jaringan & local DNS resolution",
      "Skrip Bash otomatis dengan Cron Job untuk snapshot backup database"
    ],
    metrics: [
      { label: "Uptime", value: "99.8%", detail: "Continuous local runtime" },
      { label: "RAM Usage", value: "< 650 MB", detail: "Debian minimal + 5 container" },
      { label: "Deploy Time", value: "15 detik", detail: "Docker Compose up" }
    ],
    techStack: ["Linux Debian", "Docker", "Docker Compose", "Nginx", "Bash Scripting", "Pi-hole"],
    githubUrl: "https://github.com",
    demoUrl: "https://github.com",
    colorTheme: "from-emerald-400 to-teal-600",
    icon: "Server"
  },
  {
    id: "net-sentinel-dashboard",
    title: "NetSentinel: Real-time School Network Visualizer",
    category: "web",
    badge: "React & TypeScript",
    summary: "Dashboard web interaktif untuk visualisasi status perangkat lab TKJ, latensi ping berkala, dan log insiden konektivitas secara real-time.",
    description: "Antarmuka berbasis web modern yang dirancang untuk asisten lab dan siswa TKJ memantau status hidup/mati (ICMP echo) pada switch, router, dan workstation lab sekolah secara terpusat.",
    problem: "Pemeriksaan konektivitas PC lab yang berjumlah puluhan sering kali harus dilakukan manual satu per satu lewat terminal command prompt.",
    solution: "Dashboard responsif dengan polling status otomatis, indikator kartu warna neo-brutalis, grafik latensi tren, dan notifikasi visual instan jika terjadi packet drop.",
    architectureDetails: [
      "Frontend React 19 + TypeScript dengan performa render kilat",
      "Chart latensi dinamis canvas & SVG gauges",
      "State management ringan dengan React Hooks & Local Storage persistence",
      "Desain antarmuka Neo-Brutalist bertema maritim yang cerah dan mudah dibaca"
    ],
    metrics: [
      { label: "Monitor Points", value: "32 Nodes", detail: "Switch, Router, & PC Lab" },
      { label: "Poll Frequency", value: "3 detik", detail: "Real-time auto-refresh" },
      { label: "Load Time", value: "0.4s", detail: "Vite optimized build" }
    ],
    techStack: ["React 19", "TypeScript", "Tailwind CSS", "Vite", "Lucide Icons"],
    githubUrl: "https://github.com",
    demoUrl: "https://github.com",
    colorTheme: "from-cyan-400 to-indigo-600",
    icon: "Activity"
  }
];

export const TECH_PIPELINE: PipelineStage[] = [
  {
    id: "stage-1",
    stepNumber: "01",
    title: "Layer 1: Fisik & Pengkabelan",
    categoryName: "Hardware & Cabling",
    description: "Fondasi komunikasi data fisik, teknik terminasi kabel terstruktur, dan pengukuran kualitas koneksi transmisi.",
    color: "bg-amber-300 text-black border-amber-600",
    items: [
      { name: "UTP/STP Cat5e/6", level: "Mahir", badge: "Kabel Jaringan", icon: "Cable", description: "Pengupasan, urutan warna T568A & T568B, dan standar pelindung kabel." },
      { name: "Crimping & RJ-45", level: "Terampil", badge: "Terminasi", icon: "Wrench", description: "Crimping presisi dengan crimping tool dan pengecekan menggunakan LAN tester." },
      { name: "Fiber Optic Basics", level: "Dasar", badge: "Optik", icon: "Zap", description: "Pengenalan core, cladding, konektor SC/LC, serta prinsip kerja visual fault locator." },
      { name: "Rack Server Management", level: "Menengah", badge: "Struktur Lab", icon: "Server", description: "Penataan kabel (cable organizer), patch panel, dan manajemen aliran udara rack." }
    ]
  },
  {
    id: "stage-2",
    stepNumber: "02",
    title: "Layer 2 & 3: Routing & Switching",
    categoryName: "Network Architecture",
    description: "Pengalamatan logis, segmentasi broadcast domain, dan perutean paket cerdas antarnetwork.",
    color: "bg-sky-300 text-black border-sky-600",
    items: [
      { name: "Subnetting (VLSM & CIDR)", level: "Mahir", badge: "Logika IP", icon: "Binary", description: "Perhitungan alokasi IP hemat, subnet mask, wildcard mask, dan prefix /24 hingga /30." },
      { name: "MikroTik RouterOS", level: "Terampil", badge: "Router", icon: "Radio", description: "Winbox, DHCP Server, NAT Masquerade, Firewall Filter, Simple Queue, dan Hotspot." },
      { name: "Cisco IOS CLI", level: "Menengah", badge: "Switch & Router", icon: "Terminal", description: "Navigasi Privileged Exec, VLAN 802.1Q, Trunking, Port-Security, dan static routing." },
      { name: "Dynamic Routing (OSPF)", level: "Menengah", badge: "Protokol", icon: "Share2", description: "Penetapan Router ID, pembentukan adjacency neighbor, dan advertisement network." }
    ]
  },
  {
    id: "stage-3",
    stepNumber: "03",
    title: "Layer 4-7: Server & Sistem Operasi",
    categoryName: "Server Administration",
    description: "Penyediaan layanan jaringan andal, sistem operasi open-source, dan otomatisasi kontainerisasi.",
    color: "bg-emerald-300 text-black border-emerald-600",
    items: [
      { name: "Linux Debian / Ubuntu", level: "Terampil", badge: "OS Server", icon: "Cpu", description: "Manajemen paket APT, izin file chmod/chown, systemd service, dan administrasi user." },
      { name: "Docker & Container", level: "Menengah", badge: "Virtualisasi", icon: "Box", description: "Container lifecycle, Dockerfile kustom, volume mapping, dan Docker Compose orchestration." },
      { name: "Web Server (Nginx)", level: "Terampil", badge: "Service HTTP", icon: "Globe", description: "Virtual Host (Server Blocks), reverse proxy ke backend port, dan optimasi gzip." },
      { name: "BASH Scripting", level: "Menengah", badge: "Automasi", icon: "Code2", description: "Otomatisasi backup direktori web, pengecekan disk storage, dan penjadwalan via cron." }
    ]
  },
  {
    id: "stage-4",
    stepNumber: "04",
    title: "Layer Antarmuka: Web & Tools",
    categoryName: "Modern Interface",
    description: "Membangun dashboard visual interaktif untuk menyajikan data operasional jaringan dengan elegan.",
    color: "bg-rose-300 text-black border-rose-600",
    items: [
      { name: "HTML5 & Modern CSS", level: "Mahir", badge: "Frontend", icon: "Layout", description: "Struktur semantik, flexbox, CSS grid, dan responsive cross-device layout." },
      { name: "Tailwind CSS", level: "Mahir", badge: "Styling", icon: "Palette", description: "Utility-first workflow, styling neo-brutalist khas, dan konfigurasi tema kustom." },
      { name: "React 19 & TypeScript", level: "Terampil", badge: "Logic Framework", icon: "Layers", description: "Komponen modular, type-safe development, state management, dan efek dinamis." },
      { name: "Git & GitHub", level: "Terampil", badge: "Version Control", icon: "GitBranch", description: "Branching, commit konvensional, kolaborasi repositori, dan CI/CD ke Vercel." }
    ]
  }
];

export const TIMELINE: TimelineMilestone[] = [
  {
    period: "2024 - Sekarang",
    title: "Siswa Jurusan Teknik Komputer & Jaringan",
    institution: "SMK Telkom Malang (Moklet)",
    location: "Malang, Jawa Timur",
    role: "Siswa Kelas X TKJ 1",
    description: "Mempelajari kurikulum kejuruan teknologi informasi unggulan. Fokus mendalami konsep fundamental jaringan komputer, perakitan perangkat keras, simulasi topologi Cisco, dan konfigurasi router MikroTik.",
    highlights: [
      "Menguasai teknik perakitan kabel UTP (Straight & Cross) dengan pengujian loss 0%",
      "Menyelesaikan simulasi arsitektur jaringan LAN multi-lab di Cisco Packet Tracer",
      "Aktif dalam sesi praktikum mandiri dan eksplorasi server Linux di lingkungan sekolah",
      "Mempertahankan kedisiplinan dan budaya kerja profesional khas SMK Telkom Malang"
    ],
    skillsGained: ["Cisco Packet Tracer", "MikroTik RouterOS", "Subnetting VLSM", "Linux Server", "Disiplin Kerja"],
    isCurrent: true
  },
  {
    period: "2024 - Awal Semester",
    title: "Fondasi Komputasi & Eksplorasi Linux Homelab",
    institution: "Laboratorium Mandiri",
    location: "Malang",
    role: "Self-Directed Learner",
    description: "Menginisiasi instalasi server mandiri dengan distro Linux Debian dan Ubuntu. Mengonfigurasi DHCP server, DNS lokal, serta bereksperimen dengan virtualisasi kontainer Docker untuk menjalankan layanan internal.",
    highlights: [
      "Membangun server lokal berbasis Debian dengan konfigurasi headless CLI",
      "Mengimplementasikan reverse proxy Nginx untuk mengarahkan multiple web service",
      "Membuat dokumentasi skrip bash otomatisasi backup konfigurasi router"
    ],
    skillsGained: ["Linux Debian CLI", "Docker Container", "Nginx Config", "Bash Shell", "Git"],
    isCurrent: false
  },
  {
    period: "2021 - 2024",
    title: "Pendidikan Menengah Pertama & Pengenalan IT",
    institution: "Sekolah Menengah Pertama",
    location: "Jawa Timur",
    role: "Siswa & Anggota Klub Komputer",
    description: "Menumbuhkan ketertarikan kuat pada dunia teknologi informasi, logika pemrograman dasar, dan hardware komputer sebelum memantapkan langkah memilih SMK Telkom Malang.",
    highlights: [
      "Mempelajari logika dasar algoritma dan pemrograman web (HTML/CSS)",
      "Mengenal komponen jeroan komputer dan teknik troubleshooting dasar",
      "Meraih nilai akademik unggul untuk lolos seleksi masuk SMK Telkom Malang"
    ],
    skillsGained: ["Dasar Algoritma", "Hardware Komputer", "Troubleshooting PC", "Kerja Tim"],
    isCurrent: false
  }
];

export const BEACH_QUOTES: BeachQuote[] = [
  { quote: "Ping 192.168.1.1 dari tepi pantai... 0% packet loss, ombaknya lancar jaya!", speaker: "crab", mood: "Santai & Siap Siaga" },
  { quote: "Kwetiau kuah kepiting enak, tapi kabel UTP yang rapi di server rack lebih memuaskan mata!", speaker: "crab", mood: "Penyemangat Lab" },
  { quote: "Kwek! Bebek karet ini siap diajak debugging kode atau berenang di ombak Samudera Hindia!", speaker: "duck", mood: "Debugging Mate" },
  { quote: "Gunakan straight-through cable untuk switch ke router, dan lempar saya ke ombak untuk rileks!", speaker: "duck", mood: "Fisika Mengapung" },
  { quote: "Kuaaak! Dari atas mercusuar, terlihat throughput jaringan SMK Telkom Malang stabil 1 Gbps!", speaker: "seagull", mood: "Pantauan Udara" },
  { quote: "Angin laut bertiup sepoi-sepoi, pastikan paket OSPF hello interval tetap saling sinkron!", speaker: "seagull", mood: "Network Observer" }
];
