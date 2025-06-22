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

#### 方法一（推荐）：使用GitHub Actions
1. 打开您的GitHub仓库
2. 点击 **Settings** 标签页
3. 在左侧菜单中找到 **Pages**
4. 在 **Source** 下选择 **GitHub Actions**

#### 推荐方法：使用简单部署
由于第一个workflow有YAML语法问题，推荐使用简单部署方法：

1. **删除有问题的workflow**：
   ```bash
   rm .github/workflows/deploy.yml
   ```

2. **将简单版本作为主要workflow**：
   ```bash
   mv .github/workflows/deploy-simple.yml .github/workflows/deploy.yml
   ```

3. **在仓库 Settings → Pages 中**：
   - **Source** 选择 **Deploy from a branch**
   - **Branch** 选择 **gh-pages** / **/ (root)**

4. **推送更改**：
   ```bash
   git add .
   git commit -m "使用简单部署方法"
   git push origin main
   ```

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

## 🔧 常见问题和解决方案

### 错误：Get Pages site failed
如果遇到此错误，请按以下步骤操作：

1. **确保仓库设置正确**：
   - 仓库必须是公开的（除非有GitHub Pro）
   - 在Settings → Pages中正确配置

2. **如果第一个workflow失败**：
   - 删除 `.github/workflows/deploy.yml`
   - 将 `deploy-simple.yml` 重命名为 `deploy.yml`
   - 重新推送代码

3. **检查权限**：
   - 确保Actions有读写权限
   - 在Settings → Actions → General中检查权限设置

### 错误：GITHUB_TOKEN permissions 或 Permission denied
如果遇到权限错误，请按以下步骤操作：

1. **检查仓库Actions权限**：
   - 进入仓库Settings → Actions → General
   - 在"Workflow permissions"中选择"**Read and write permissions**"
   - 勾选"**Allow GitHub Actions to create and approve pull requests**"
   - 点击"Save"保存

2. **如果还是失败，检查仓库设置**：
   - 确保仓库是**公开的**（Private仓库需要GitHub Pro）
   - 在Settings → Pages中确认已启用Pages

3. **强制重新运行**：
   ```bash
   git commit --allow-empty -m "触发重新部署"
   git push origin main
   ```

## 📝 注意事项

- 确保仓库是公开的（或者有GitHub Pro账户）
- 首次部署可能需要几分钟时间
- 更新后的部署通常在1-2分钟内完成
- 如果部署失败，查看Actions页面的错误日志

## 🎯 访问应用

部署成功后，可以通过以下地址访问：
```
https://amoyens1s.github.io/img2pdf
```

**🌐 当前在线地址：[https://amoyens1s.github.io/img2pdf](https://amoyens1s.github.io/img2pdf)**

工具将完全在浏览器中运行，无需服务器！ 