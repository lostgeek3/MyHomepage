#!/bin/zsh

# 构建并发布React应用
npm run build

# 将CNAME文件添加回仓库
echo "www.lostgeek.icu" > build/CNAME

# 部署到GitHub Pages
gh-pages -d build