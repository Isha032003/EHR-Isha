import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  RadialBarChart,
  RadialBar,
  Legend,
} from "recharts";

/**
 * Dashboard.jsx
 * Light Peach Theme — 300+ lines of unique JSX
 *
 * Paste this file into: src/pages/Dashboard.jsx
 * Dependencies: react, recharts
 *
 * Theme palette (used throughout):
 *  - Primary Peach:  #F7BFA0
 *  - Accent Coral:   #E89A7C
 *  - Light Peach:    #FAD7C4
 *  - Background:     #FFF7F3
 *  - Text Dark:      #4B3A36
 *  - Card White:     #FFFFFF
 */

const areaData = [
  { month: "Jan", enhanced: 12 },
  { month: "Feb", enhanced: 18 },
  { month: "Mar", enhanced: 14 },
  { month: "Apr", enhanced: 22 },
  { month: "May", enhanced: 20 },
  { month: "Jun", enhanced: 24 },
  { month: "Jul", enhanced: 28 },
];

const barData = [
  { modality: "MRI", count: 42 },
  { modality: "CT", count: 34 },
  { modality: "X-Ray", count: 61 },
  { modality: "Ultrasound", count: 23 },
];

const lineData = [
  { day: "Mon", docs: 12 },
  { day: "Tue", docs: 20 },
  { day: "Wed", docs: 16 },
  { day: "Thu", docs: 28 },
  { day: "Fri", docs: 26 },
  { day: "Sat", docs: 18 },
  { day: "Sun", docs: 10 },
];

const pieData = [
  { name: "Good Quality", value: 68 },
  { name: "Review Needed", value: 22 },
  { name: "Poor Quality", value: 10 },
];

const radialData = [
  { name: "PSNR", value: 78, fill: "#E89A7C" },
  { name: "SSIM", value: 88, fill: "#F7BFA0" },
];

const sparkData = [
  { week: "W1", value: 0.91 },
  { week: "W2", value: 0.93 },
  { week: "W3", value: 0.92 },
  { week: "W4", value: 0.95 },
];

const COLORS = ["#F7BFA0", "#E89A7C", "#FAD7C4"];

function StatCard({ label, value, hint, icon }) {
  return (
    <div
      style={{
        background: "#FFFFFF",
        borderRadius: 16,
        padding: 18,
        boxShadow: "0 8px 22px rgba(75,58,54,0.06)",
        transition: "transform 0.22s ease, box-shadow 0.22s ease",
      }}
      className="stat-card"
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 12,
            background: "linear-gradient(135deg,#F7BFA0,#FAD7C4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "inset 0 -6px 18px rgba(232,154,124,0.12)",
            color: "#4B3A36",
            fontWeight: 700,
            fontSize: 16,
          }}
        >
          {icon || "AI"}
        </div>

        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, color: "#7A6059", marginBottom: 6 }}>
            {label}
          </div>
          <div style={{ fontSize: 26, fontWeight: 700, color: "#4B3A36" }}>
            {value}
          </div>
          {hint && (
            <div style={{ fontSize: 12, color: "#9A7F79", marginTop: 6 }}>
              {hint}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  // Inline styles for broad layout
  const styles = {
    page: {
      display: "flex",
      minHeight: "100vh",
      background: "#FFF7F3",
      fontFamily:
        "Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
      color: "#4B3A36",
    },
    sidebar: {
      width: 260,
      padding: "28px 20px",
      background: "#FAD7C4",
      boxShadow: "4px 0 18px rgba(75,58,54,0.04)",
      display: "flex",
      flexDirection: "column",
      gap: 16,
    },
    main: {
      flex: 1,
      padding: 28,
      overflowY: "auto",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 20,
    },
    headerLeft: {},
    headerRight: { display: "flex", gap: 14, alignItems: "center" },
    searchBox: {
      background: "#FFF",
      padding: "10px 12px",
      borderRadius: 12,
      boxShadow: "0 6px 18px rgba(75,58,54,0.04)",
      display: "flex",
      alignItems: "center",
      gap: 8,
    },
    grid4: {
      display: "grid",
      gridTemplateColumns: "repeat(4,1fr)",
      gap: 18,
      marginBottom: 22,
    },
    bigGrid: {
      display: "grid",
      gridTemplateColumns: "2fr 1fr",
      gap: 18,
      marginBottom: 22,
    },
    triGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(3,1fr)",
      gap: 18,
      marginBottom: 22,
    },
    wideCard: {
      background: "#FFFFFF",
      borderRadius: 18,
      padding: 18,
      boxShadow: "0 10px 28px rgba(75,58,54,0.06)",
    },
    smallCard: {
      background: "#FFFFFF",
      borderRadius: 14,
      padding: 12,
      boxShadow: "0 8px 20px rgba(75,58,54,0.05)",
    },
  };

  return (
    <div style={styles.page}>
      {/* SIDEBAR */}
      <aside style={styles.sidebar}>
        <div style={{ fontSize: 20, fontWeight: 800, color: "#4B3A36" }}>
          PeachAI
        </div>

        <div style={{ fontSize: 13, color: "#5E4743" }}>Menu</div>

        <nav style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <SidebarItem label="Overview" active />
          <SidebarItem label="Patients" />
          <SidebarItem label="Imaging" />
          <SidebarItem label="Documentation" />
          <SidebarItem label="Coding (ICD-10)" />
          <SidebarItem label="Settings" />
        </nav>

        <div style={{ flex: 1 }} />

        <div
          style={{
            marginTop: "auto",
            fontSize: 12,
            color: "#5E4743",
            opacity: 0.9,
          }}
        >
          © 2025 PeachAI • Hospital Suite
        </div>
      </aside>

      {/* MAIN */}
      <main style={styles.main}>
        {/* HEADER */}
        <div style={styles.header}>
          <div style={styles.headerLeft}>
            <div style={{ fontSize: 28, fontWeight: 800, color: "#4B3A36" }}>
              Dashboard Overview
            </div>
            <div style={{ marginTop: 6, color: "#7A6059", fontSize: 13 }}>
              Warm, clear insights into imaging, documentation & coding
            </div>
          </div>

          <div style={styles.headerRight}>
            <div style={styles.searchBox}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ opacity: 0.7 }}
              >
                <path
                  d="M21 21L15 15"
                  stroke="#7A6059"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
                  stroke="#7A6059"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <input
                placeholder="Search patients, scans, notes..."
                style={{
                  border: "none",
                  outline: "none",
                  fontSize: 13,
                  background: "transparent",
                  color: "#4B3A36",
                }}
              />
            </div>

            <div
              style={{
                background: "#FFFFFF",
                padding: 10,
                borderRadius: 12,
                boxShadow: "0 8px 20px rgba(75,58,54,0.05)",
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 12, color: "#7A6059" }}>Dr. Aria</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#4B3A36" }}>
                  Admin
                </div>
              </div>
              <div
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 10,
                  background:
                    "linear-gradient(135deg,#F7BFA0 0%, #E89A7C 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#4B3A36",
                  fontWeight: 800,
                }}
              >
                A
              </div>
            </div>
          </div>
        </div>

        {/* TOP STATS */}
        <div style={styles.grid4}>
          <StatCard
            label="Images Enhanced"
            value="112"
            hint="Since last 7 days"
            icon="IMG"
          />
          <StatCard
            label="Notes Generated"
            value="54"
            hint="Auto and assisted"
            icon="DOC"
          />
          <StatCard
            label="ICD-10 Suggestions"
            value="163"
            hint="Confidence > 80%"
            icon="ICD"
          />
          <StatCard
            label="Active Patients"
            value="9"
            hint="Currently monitored"
            icon="PT"
          />
        </div>

        {/* LARGE CHARTS ROW */}
        <div style={styles.bigGrid}>
          <div style={styles.wideCard}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontSize: 16, fontWeight: 700, color: "#4B3A36" }}>
                  Image Enhancement Activity
                </div>
                <div style={{ fontSize: 12, color: "#7A6059", marginTop: 6 }}>
                  Weekly trend of enhanced images across modalities
                </div>
              </div>

              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <div
                  style={{
                    background: "#FFF",
                    padding: "8px 12px",
                    borderRadius: 12,
                    fontSize: 12,
                    color: "#7A6059",
                    boxShadow: "0 6px 18px rgba(75,58,54,0.03)",
                  }}
                >
                  Last 30 days
                </div>
                <div
                  style={{
                    background:
                      "linear-gradient(135deg,#F7BFA0 0%, #FAD7C4 100%)",
                    padding: "8px 12px",
                    borderRadius: 12,
                    fontSize: 12,
                    fontWeight: 700,
                    color: "#4B3A36",
                  }}
                >
                  Export
                </div>
              </div>
            </div>

            <div style={{ marginTop: 18, height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={areaData}>
                  <defs>
                    <linearGradient id="peachFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#F7BFA0" stopOpacity={0.6} />
                      <stop offset="95%" stopColor="#FAD7C4" stopOpacity={0.06} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#FAEDE9" />
                  <XAxis dataKey="month" stroke="#7A6059" />
                  <YAxis stroke="#7A6059" />
                  <Tooltip
                    wrapperStyle={{
                      background: "#FFF",
                      borderRadius: 8,
                      boxShadow: "0 6px 20px rgba(75,58,54,0.08)",
                      color: "#4B3A36",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="enhanced"
                    stroke="#E89A7C"
                    strokeWidth={3}
                    fill="url(#peachFill)"
                    activeDot={{ r: 6 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div style={styles.wideCard}>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#4B3A36" }}>
              Quality Distribution
            </div>
            <div style={{ fontSize: 12, color: "#7A6059", marginTop: 6 }}>
              Snapshot of scan quality across processed images
            </div>

            <div style={{ marginTop: 18, height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={95}
                    paddingAngle={4}
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    wrapperStyle={{
                      background: "#FFF",
                      borderRadius: 8,
                      boxShadow: "0 6px 20px rgba(75,58,54,0.08)",
                      color: "#4B3A36",
                    }}
                  />
                  <Legend verticalAlign="bottom" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* SECOND ROW — BAR / RADIAL / LINE */}
        <div style={styles.triGrid}>
          <div style={styles.wideCard}>
            <div style={{ fontSize: 15, fontWeight: 700 }}>Modality Usage</div>
            <div style={{ fontSize: 12, color: "#7A6059", marginTop: 6 }}>
              Volume of scans by modality
            </div>

            <div style={{ marginTop: 12, height: 180 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#FAEDE9" />
                  <XAxis dataKey="modality" stroke="#7A6059" />
                  <YAxis stroke="#7A6059" />
                  <Tooltip
                    wrapperStyle={{
                      background: "#FFF",
                      borderRadius: 8,
                      boxShadow: "0 6px 20px rgba(75,58,54,0.08)",
                      color: "#4B3A36",
                    }}
                  />
                  <Bar dataKey="count" radius={[8, 8, 4, 4]} fill="#E89A7C" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div style={styles.wideCard}>
            <div style={{ fontSize: 15, fontWeight: 700 }}>Image Quality Scores</div>
            <div style={{ fontSize: 12, color: "#7A6059", marginTop: 6 }}>
              Radial representation of PSNR / SSIM
            </div>

            <div style={{ marginTop: 10, height: 180 }}>
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart
                  innerRadius="10%"
                  outerRadius="100%"
                  data={radialData}
                  startAngle={90}
                  endAngle={-270}
                >
                  <RadialBar
                    minAngle={15}
                    background
                    clockWise
                    dataKey="value"
                    cornerRadius={8}
                  />
                  <Tooltip
                    wrapperStyle={{
                      background: "#FFF",
                      borderRadius: 8,
                      boxShadow: "0 6px 20px rgba(75,58,54,0.08)",
                      color: "#4B3A36",
                    }}
                  />
                </RadialBarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div style={styles.wideCard}>
            <div style={{ fontSize: 15, fontWeight: 700 }}>AI Docs Throughput</div>
            <div style={{ fontSize: 12, color: "#7A6059", marginTop: 6 }}>
              Daily documents generated by the assistant
            </div>

            <div style={{ marginTop: 12, height: 180 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lineData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#FAEDE9" />
                  <XAxis dataKey="day" stroke="#7A6059" />
                  <YAxis stroke="#7A6059" />
                  <Tooltip
                    wrapperStyle={{
                      background: "#FFF",
                      borderRadius: 8,
                      boxShadow: "0 6px 20px rgba(75,58,54,0.08)",
                      color: "#4B3A36",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="docs"
                    stroke="#F7BFA0"
                    strokeWidth={3}
                    dot={{ r: 3 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* BOTTOM ROW — SPARKLINE + ACTIVITY LIST + NOTIFICATIONS */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 420px", gap: 18 }}>
          <div style={styles.wideCard}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: 16, fontWeight: 700 }}>System Reliability Trend</div>
                <div style={{ fontSize: 12, color: "#7A6059", marginTop: 6 }}>
                  Sparkline of uptime / reliability (higher is better)
                </div>
              </div>

              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 12, color: "#7A6059" }}>Current</div>
                <div style={{ fontSize: 18, fontWeight: 800, color: "#4B3A36" }}>
                  0.95
                </div>
              </div>
            </div>

            <div style={{ marginTop: 16, height: 100 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={sparkData}>
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#E89A7C"
                    strokeWidth={3}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div style={{ marginTop: 18, display: "flex", gap: 12 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, color: "#7A6059" }}>Uptime</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: "#4B3A36" }}>99.7%</div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, color: "#7A6059" }}>Avg Latency</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: "#4B3A36" }}>82 ms</div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, color: "#7A6059" }}>Queue</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: "#4B3A36" }}>3</div>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div style={styles.smallCard}>
              <div style={{ fontSize: 14, fontWeight: 700 }}>Recent Activity</div>
              <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 10 }}>
                <ActivityItem
                  title="MRI scan enhanced"
                  subtitle="Patient: #A231 — Model v2.4"
                />
                <ActivityItem
                  title="Auto-note generated"
                  subtitle="Discharge summary — Level: assisted"
                />
                <ActivityItem
                  title="ICD-10 codes suggested"
                  subtitle="Top code match confidence 92%"
                />
                <ActivityItem
                  title="Upload failed — low resolution"
                  subtitle="Please review image #I0045"
                />
              </div>
            </div>

            <div style={styles.smallCard}>
              <div style={{ fontSize: 14, fontWeight: 700 }}>Notifications</div>
              <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 8 }}>
                <NotificationItem
                  message="Model v2.4 deployed to inference cluster."
                  type="success"
                />
                <NotificationItem
                  message="Storage nearing 85% capacity."
                  type="warning"
                />
                <NotificationItem
                  message="New security patch available."
                  type="info"
                />
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div style={{ marginTop: 26, fontSize: 12, color: "#7A6059", textAlign: "center" }}>
          Built with care • PeachAI EHR Suite • 2025
        </div>
      </main>
    </div>
  );
}

/* -------------------------
   Small subcomponents
   ------------------------- */

function SidebarItem({ label, active }) {
  return (
    <div
      style={{
        padding: "12px 14px",
        borderRadius: 10,
        background: active ? "#FFFFFF" : "transparent",
        color: active ? "#4B3A36" : "#6E524B",
        fontWeight: active ? 700 : 600,
        boxShadow: active ? "0 8px 22px rgba(75,58,54,0.06)" : "none",
        cursor: "pointer",
      }}
    >
      {label}
    </div>
  );
}

function ActivityItem({ title, subtitle }) {
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: 10,
          background: "linear-gradient(135deg,#FAD7C4,#F7BFA0)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 700,
          color: "#4B3A36",
        }}
      >
        ✓
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#4B3A36" }}>{title}</div>
        <div style={{ fontSize: 12, color: "#7A6059" }}>{subtitle}</div>
      </div>
    </div>
  );
}

function NotificationItem({ message, type }) {
  const colorMap = {
    success: "#DFF3EC",
    warning: "#FFF0E6",
    info: "#F7F3FF",
  };
  const borderMap = {
    success: "#5BC0BE",
    warning: "#E89A7C",
    info: "#D8C0A7",
  };

  return (
    <div
      style={{
        display: "flex",
        gap: 12,
        alignItems: "center",
        padding: 10,
        borderRadius: 10,
        background: colorMap[type] || "#FFF",
        border: `1px solid ${borderMap[type] || "#E89A7C"}`,
      }}
    >
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: 8,
          background: borderMap[type],
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#FFF",
          fontWeight: 700,
        }}
      >
        !
      </div>
      <div style={{ flex: 1, fontSize: 13, color: "#4B3A36" }}>{message}</div>
    </div>
  );
}
