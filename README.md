# 图片转PDF工具

一个纯前端的图片转PDF工具，可以将多张图片合并成一个PDF文件，制作照片图册。

## 功能特点

- ✅ 支持多种图片格式（JPG、PNG、GIF等）
- ✅ 支持批量选择图片
- ✅ 保持图片原始尺寸比例
- ✅ 每张图片独占一页PDF
- ✅ 图片在PDF中居中显示
- ✅ 实时预览选择的图片
- ✅ 可以删除单张图片或清空所有
- ✅ 纯前端处理，数据不上传到服务器

## 使用方法

1. 安装依赖包
```bash
npm install
```

2. 启动应用
```bash
npm start
```

3. 在浏览器中打开 http://localhost:3000

4. 点击"选择图片文件"按钮，选择一张或多张图片

5. 预览选择的图片，可以删除不需要的图片

6. 点击"生成PDF图册"按钮，自动下载生成的PDF文件

## 技术栈

- React 18 + TypeScript
- React Hook Form（表单处理）
- jsPDF（PDF生成）
- Tailwind CSS（样式）

## 项目结构

```
src/
  ├── components/
  │   └── ImageToPdf.tsx    # 核心组件
  ├── App.tsx               # 主应用组件
  └── index.tsx             # 入口文件
```

## 浏览器兼容性

支持所有现代浏览器，包括：
- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+ 