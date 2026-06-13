const Icon = ({ name, size = 22, className = "" }) => {
  const icons = {
    bell: (
      <>
        <path d="M18 8.8A6 6 0 0 0 6 8.8c0 6.6-2.6 6.9-2.6 8.4h17.2c0-1.5-2.6-1.8-2.6-8.4Z" />
        <path d="M14.2 20.4a2.4 2.4 0 0 1-4.4 0" />
      </>
    ),
    search: <path d="m21 21-4.4-4.4M10.7 18.1a7.4 7.4 0 1 1 0-14.8 7.4 7.4 0 0 1 0 14.8Z" />,
    dashboard: (
      <>
        <rect x="3" y="3" width="7.5" height="7.5" rx="2" />
        <rect x="13.5" y="3" width="7.5" height="7.5" rx="2" />
        <rect x="3" y="13.5" width="7.5" height="7.5" rx="2" />
        <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="2" />
      </>
    ),
    menu: (
      <>
        <path d="M6 3.8h12A2.2 2.2 0 0 1 20.2 6v12A2.2 2.2 0 0 1 18 20.2H6A2.2 2.2 0 0 1 3.8 18V6A2.2 2.2 0 0 1 6 3.8Z" />
        <path d="M8 8.2h8M8 12h8M8 15.8h5" />
      </>
    ),
    orders: (
      <>
        <path d="M7 3.5h10v17l-2-1.2-2 1.2-2-1.2-2 1.2-2-1.2v-17Z" />
        <path d="M10 8h4M10 12h4M10 16h3" />
      </>
    ),
    users: (
      <>
        <path d="M16.5 20.5v-1.6a3.7 3.7 0 0 0-3.7-3.7H7.2a3.7 3.7 0 0 0-3.7 3.7v1.6" />
        <circle cx="10" cy="7.6" r="3.8" />
        <path d="M21 20.5v-1.4a3.7 3.7 0 0 0-2.8-3.6M16.1 4a3.8 3.8 0 0 1 0 7.2" />
      </>
    ),
    logout: (
      <>
        <path d="M10 17.5 4.5 12 10 6.5" />
        <path d="M4.8 12H16" />
        <path d="M14 4h5.5v16H14" />
      </>
    ),
    chevron: <path d="m6 9 6 6 6-6" />,
    revenue: (
      <>
        <path d="M3.8 7.2h16.4v11.6H3.8z" />
        <path d="M7 7.2V5.4h10v1.8M7 18.8v-1.6M17 18.8v-1.6" />
        <circle cx="12" cy="13" r="2.4" />
      </>
    ),
    dollar: (
      <>
        <path d="M12 3v18" />
        <path d="M17 7.2c-1.2-.9-2.7-1.3-4.4-1.3-2.3 0-4 .9-4 2.6 0 3.8 8.5 1.7 8.5 6.7 0 2.1-2 3.4-4.7 3.4-2 0-3.9-.6-5.1-1.7" />
      </>
    ),
    chef: (
      <>
        <path d="M7.2 10.6h9.6v8.1a2.1 2.1 0 0 1-2.1 2.1H9.3a2.1 2.1 0 0 1-2.1-2.1v-8.1Z" />
        <path d="M7.3 10.6a3.8 3.8 0 1 1 4.2-5.7 4 4 0 0 1 6.4 3.1 3 3 0 0 1-1.1 5.8" />
        <path d="M9.4 15h5.2" />
      </>
    ),
    receipt: (
      <>
        <path d="M7 3.5h10v17l-2-1.2-2 1.2-2-1.2-2 1.2-2-1.2v-17Z" />
        <path d="M10 8h4M10 12h4M10 16h3" />
      </>
    ),
    chart: (
      <>
        <path d="M4 19.5V4.5" />
        <path d="M4 19.5h16" />
        <rect x="7" y="11" width="2.8" height="5.5" rx="1" />
        <rect x="11" y="7.5" width="2.8" height="9" rx="1" />
        <rect x="15" y="5.2" width="2.8" height="11.3" rx="1" />
      </>
    ),
    trend: <path d="m3 17 6-6 4 4 8-8M15 7h6v6" />,
    filter: (
      <>
        <path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3" />
        <path d="M1 14h6M9 8h6M17 16h6" />
      </>
    ),
    download: <path d="M12 3v12M7 10l5 5 5-5M5 21h14" />,
    trash: (
      <>
        <path d="M3 6h18M8 6V4h8v2M19 6l-1 15H6L5 6" />
        <path d="M10 11v6M14 11v6" />
      </>
    ),
    eye: (
      <>
        <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ),
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {icons[name] || icons.dashboard}
    </svg>
  );
};

export default Icon;
