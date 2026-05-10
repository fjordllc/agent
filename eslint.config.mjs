import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';

export default [
  {
    ignores: ['**/node_modules/**', '.next/**', 'out/**'],
  },
  ...nextCoreWebVitals,
  {
    rules: {
      // react-hooks v7 で追加された新ルール。既存コードの修正は別 PR で対応。
      'react-hooks/set-state-in-effect': 'off',
      'react-hooks/immutability': 'off',
    },
  },
];
