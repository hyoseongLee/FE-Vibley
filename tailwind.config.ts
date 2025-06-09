import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',  // 타입스크립트 사용 시
  ],
  theme: {
    extend: {
      borderRadius: {
        '20': '20px',
        '100': '100%',
      },
      colors: {
        black: '#101010',
        gray: '#525252',
        lightgray: '#949494',
        palegray: '#EAEAEA',
        primary: '#1DCDA6',
        secondary: '#74CCB9',
        tertiary: '#E2F0EF',
        background: '#F5F9F8',
        white: '#FFFFFF',
      },
      fontSize: {
        'logo': ['52px', '1.2'],
        'title': ['40px', '1.2'],
        '24-bold': ['24px', '1.2'],
        '24-semibold': ['24px', '1.2'],
        '24-medium': ['24px', '1.2'],
        '20-bold': ['20px', '1.2'],
        '20-semibold': ['20px', '1.2'],
        '18-regular': ['18px', '1.5'],
        '18-semibold': ['18px', '1.5'],
        '16-regular': ['16px', '1.5'],
        '16-semibold': ['16px', '1.5'],
        '14-medium': ['14px', '1.5'],
      },
      fontWeight: {
        regular: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
      fontFamily: {
        sans: ['Pretendard', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config