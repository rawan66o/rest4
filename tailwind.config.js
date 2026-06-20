export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bodyColor: "rgba(249, 250, 251, 0.9)",
        textSecondary: "rgba(111, 103, 95, 1)",
        textPrimary: "rgba(47, 42, 37, 1)",
        primary: "rgba(254, 148, 42, 1)",
        buttonColor:"#F496181A",
        error :"#B56A6A",
        color6:"#A39A91",
        dashGreen:"#4CAF50",
        redDash:"#FF0707"
      },
       fontSize: {
    h1: ['24px', { lineHeight: '32px' }],
    h2: ['24.61px', { lineHeight: '32px' }],
    h3: ['18px', { lineHeight: '28px' }],
  },
  screens:{
    xs:'440px',
  }
    },
  },
  plugins: [],
}