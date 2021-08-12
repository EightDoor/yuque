# 初衷
- 语雀没有提供linux版本,web端使用交互不方便,自己根据开放api搭建
# 安装依赖
- 建议使用cnpm install 
  - 不然electron无法下载
# 运行
- 构建node-gpy
  - 执行 nmp run rebuild
- `npm run z`
# 打包
- `npm run dist`
- win 打包在linux环境需要安装wine
# 其他
- 编辑器使用webstorm 
  - 配置Prettier  实现代码保存自动格式化
    - 详细参考 https://prettier.bootcss.com/docs/webstorm.html
# 依赖
- concurrently 同时运行多条命令
- prettier 代码格式化
- debugout.js 前端日志
- vue3编辑器 md-editor-v3

# 完成功能
- 知识库 添加、修改、删除
<!-- - 知识库查询目录 天加目录 目录删除，目录修改 -->
- 文档详情  文档创建、文档修改、文档删除


# 坑点
- 语雀编辑的文章，只能在语雀编辑
- 默认当前新建的都是makedown和语雀自研编辑器格式不兼容
