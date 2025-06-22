# GitHub Pages 部署指南

本项目已配置GitHub Actions自动部署到GitHub Pages。

## 🚀 部署步骤

### 1. 更新配置
首先，更新 `package.json` 中的 `homepage` 字段：
```json
"homepage": "https://your-username.github.io/your-repo-name"
```
将 `your-username` 替换为您的GitHub用户名，`your-repo-name` 替换为仓库名称。

### 2. 启用GitHub Pages
1. 打开您的GitHub仓库
2. 点击 **Settings** 标签页
3. 在左侧菜单中找到 **Pages**
4. 在 **Source** 下选择 **GitHub Actions**

### 3. 推送代码触发部署
```bash
git add .
git commit -m "配置GitHub Pages部署"
git push origin main
```

### 4. 查看部署状态
- 在 **Actions** 标签页可以看到部署进度
- 部署成功后，访问 `https://your-username.github.io/your-repo-name`

## ⚡ 自动部署特性

- **主分支推送时自动部署** - 每次向main分支推送代码都会触发自动部署
- **构建优化** - 自动构建并优化React应用
- **缓存加速** - 使用npm缓存加速构建过程

## 🔧 工作流说明

GitHub Actions工作流（`.github/workflows/deploy.yml`）包含：

1. **代码检出** - 获取最新代码
2. **Node.js设置** - 安装Node.js 18
3. **依赖安装** - 运行 `npm ci`
4. **项目构建** - 运行 `npm run build`
5. **部署到Pages** - 将构建文件部署到GitHub Pages

## 📝 注意事项

- 确保仓库是公开的（或者有GitHub Pro账户）
- 首次部署可能需要几分钟时间
- 更新后的部署通常在1-2分钟内完成

## 🎯 访问您的应用

部署成功后，您可以通过以下地址访问：
```
https://your-username.github.io/your-repo-name
```

工具将完全在浏览器中运行，无需服务器！ 