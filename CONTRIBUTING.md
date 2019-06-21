## Vue 开发风格指南

> 参考： https://cn.vuejs.org/v2/style-guide/

## Cube Git flow

> 参考： http://www.ruanyifeng.com/blog/2012/07/git.html

摘要：仓库中包含以下分支
- `master` `release` 用来发布稳定的生产版本
- `develop` 日常开发，包括二期的内容
- `dev-*` 用于个人或大模块的开发
- `fixbug-*` 用于生产环境紧急bug 修复

### 主分支 `master`

首先，代码库应该有一个、且仅有一个主分支。所有提供给用户使用的正式版本，都在这个主分支上发布。

> `master` 是受保护的分支，从`develop` `fixbug-*` 需要发起Merge Request 才能合并到主分支。

### 开发分支 `develop`
日常开发应该在另一条分支上完成，我们把开发用的分支，叫做Develop。

如果想正式对外发布，就在Master分支上，对Develop分支进行"合并"（merge）。

> 开发分支的push 动作会触发Gitlab CI 编译部署。
> 对应公众号：魔方测试，测试网址：http://devcube.lenovo.com.cn

### 功能分支 `dev-*`
这一种是功能分支，它是为了开发某种特定功能，从Develop分支上面分出来的。开发完成后，要再并入Develop。

功能分支的名字，可以采用dev-*的形式命名。

```bash
# 创建一个功能分支：
git checkout -b dev-x develop

# 开发完成后，将功能分支合并到develop分支：
git checkout develop
git merge --no-ff dev-x

# 删除dev分支：
git branch -d dev-x
```

### 修补分支 `fixbug-*`
最后一种是修补bug分支。软件正式发布以后，难免会出现bug。这时就需要创建一个分支，进行bug修补。

修补bug分支是从Master分支上面分出来的。修补结束以后，再合并进Master和Develop分支。它的命名，可以采用fixbug-*的形式

```bash
# 创建一个修补bug分支：
git checkout -b fixbug-jira2018 master

# 修补测试通过后，合并到master分支：
# 这一步请通过Gitlab 提交Merge Request

# 再合并到develop分支：
git checkout develop
git merge --no-ff fixbug-jira2018

# 最后，删除"修补bug分支"：
git branch -d fixbug-jira2018
```

> fixbug-* push 动作会触发Gitlab CI 编译部署。
> 对应公众号：24小时，测试网址：http://testcube.lenovo.com.cn

> *注意，如果同时有多个fixbug 分支并行，会造成测试资源挤占，需要协商使用测试环境

### 何时做Code Review ？

循序渐进，我们会在向Master 合并的Merge Request 里做Code Review。

### Git hook
- 前端eslint 代码规范检测
- git commit 规范检测

> 在Cube 项目，写好关键字和简短描述，请勿提交无实际内容的commit msg
> 简化为 
```
<type>(<scope>): <subject>
```

关于git commit 规范检测，参考文档如下：
- http://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html
- https://zhuanlan.zhihu.com/p/34223150

Commit Message 格式

目前规范使用较多的是 Angular 团队的规范, 继而衍生了 Conventional Commits specification. 很多工具也是基于此规范, 它的 message 格式如下:

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

- 标题行: 必填, 描述主要修改类型和内容
- 主题内容: 描述为什么修改, 做了什么样的修改, 以及开发的思路等等
- 页脚注释: 放 Breaking Changes 或 Closed Issues
- type: commit 的类型
  - feat: 新特性
  - fix: 修改问题
  - refactor: 代码重构
  - docs: 文档修改
  - style: 代码格式修改, 注意不是 css 修改
  - test: 测试用例修改
  - chore: 其他修改, 比如构建流程, 依赖管理.
- scope: commit 影响的范围, 比如: route, component, utils, build...
- subject: commit 的概述, 建议符合 50/72 formatting
- body: commit 具体修改内容, 可以分为多行, 建议符合 50/72 formatting
- footer: 一些备注, 通常是 BREAKING CHANGE 或修复的 bug 的链接.

这样一个符合规范的 commit message, 就好像是一份邮件.