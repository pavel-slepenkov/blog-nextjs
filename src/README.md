Personal blog build with **Next.js**

### up and running
```bash
npm install
npm install use-dark-mode --legacy-peer-deps
npm run dev
```
OR
```bash
docker build . -t blog:1 --no-cache
docker run -p 4401:4400 blog:1
```

### 2023-03-05:
- nodeJS v18.12.1
- added Dockerfile with node v14 in order to validate compatibility
- package versions:
```
├── date-fns@2.29.3
├── gray-matter@4.0.3
├── next@13.1.1
├── prism@1.0.0
├── prismjs@1.29.0
├── react-dom@18.2.0
├── react@18.2.0
├── remark-html@13.0.2
├── remark-prism@1.3.6
├── remark@13.0.0
├── sass@1.57.1
└── use-dark-mode@2.3.1
```