import type { StrapiApp } from '@strapi/strapi/admin';

export default {
  config: {
    // 启用简体中文作为管理面板语言
    locales: ['zh-Hans'],
    // 自定义翻译覆盖
    translations: {
      'zh-Hans': {
        // ===== 全局通用 =====
        'Analytics': '分析',
        'Content Manager': '内容管理器',
        'Content Type Builder': '内容类型构建器',
        'Documentation': '文档',
        'Email': '电子邮件',
        'Files Upload': '文件上传',
        'Media Library': '媒体库',
        'New entry': '新条目',
        'Password': '密码',
        'Provider': '提供商',
        'Role': '角色',
        'Roles & Permissions': '角色和权限',

        // ===== 首页 =====
        'HomePage.head.title': '主页',
        'HomePage.welcome.congrats': '恭喜！',
        'HomePage.welcome.congrats.content': '您已登录为第一个管理员。为了发现Strapi提供的强大功能，',
        'HomePage.welcome.congrats.content.bold': '我们建议您创建您的第一个集合类型。',

        // ===== 全局标签 =====
        'global.content-manager': '内容管理器',
        'global.continue': '继续',
        'global.delete': '删除',
        'global.description': '描述',
        'global.details': '详情',
        'global.disabled': '已禁用',
        'global.documentation': '文档',
        'global.enabled': '已启用',
        'global.finish': '完成',
        'global.name': '名称',
        'global.none': '无',
        'global.password': '密码',
        'global.plugins': '插件',
        'global.plugins.content-manager': '内容管理器',
        'global.plugins.content-manager.description': '快速查看、编辑和删除数据库中的数据。',
        'global.plugins.content-type-builder': '内容类型构建器',
        'global.plugins.content-type-builder.description': '为您的API建模数据结构。',
        'global.plugins.upload': '媒体库',
        'global.plugins.upload.description': '媒体文件管理。',
        'global.plugins.i18n': '国际化',
        'global.plugins.i18n.description': '此插件可让您使用不同语言在管理面板和API中创建、读取和更新内容。',
        'global.profile': '个人资料',
        'global.prompt.unsaved': '您确定要离开此页面吗？您的所有修改都将丢失',
        'global.roles': '角色',
        'global.save': '保存',
        'global.search': '搜索',
        'global.see-more': '查看更多',
        'global.select': '选择',
        'global.select-all-entries': '全选条目',
        'global.settings': '设置',
        'global.type': '类型',
        'global.users': '用户',

        // ===== 认证相关 =====
        'Auth.form.active.label': '激活',
        'Auth.form.button.forgot-password': '发送电子邮件',
        'Auth.form.button.go-home': '返回主页',
        'Auth.form.button.login': '登录',
        'Auth.form.button.login.strapi': '通过Strapi登录',
        'Auth.form.button.password-recovery': '密码恢复',
        'Auth.form.button.register': '开始使用',
        'Auth.form.confirmPassword.label': '确认密码',
        'Auth.form.currentPassword.label': '当前密码',
        'Auth.form.email.label': '电子邮件',
        'Auth.form.email.placeholder': '例如: kai@doe.com',
        'Auth.form.firstname.label': '名字',
        'Auth.form.lastname.label': '姓氏',
        'Auth.form.password.hint': '必须至少8个字符，包含1个大写字母，1个小写字母和1个数字',
        'Auth.form.rememberMe.label': '记住我',
        'Auth.form.username.label': '用户名',
        'Auth.form.welcome.subtitle': '登录您的Strapi账户',
        'Auth.form.welcome.title': '欢迎使用Strapi！',
        'Auth.link.forgot-password': '忘记密码？',
        'Auth.link.ready': '准备好登录了吗？',
        'Auth.link.signin': '登录',
        'Auth.link.signin.account': '已经有账户了？',
        'Auth.reset-password.title': '重置密码',

        // ===== 设置页面 =====
        'Settings.PageTitle': '设置 — {name}',
        'Settings.application.title': '概览',
        'Settings.application.description': '管理面板的全局信息',
        'Settings.application.edition-title': '当前版本',
        'Settings.application.strapi-version': 'Strapi版本',
        'Settings.application.node-version': '节点版本',
        'Settings.global': '全局设置',
        'Settings.permissions': '管理面板',
        'Settings.error': '错误',

        // ===== API令牌 =====
        'Settings.apiTokens.title': 'API令牌',
        'Settings.apiTokens.addNewToken': '添加新的API令牌',
        'Settings.apiTokens.create': '创建新的API令牌',
        'Settings.apiTokens.description': '生成的令牌列表以使用API',
        'Settings.apiTokens.ListView.headers.name': '名称',
        'Settings.apiTokens.ListView.headers.description': '描述',
        'Settings.apiTokens.ListView.headers.createdAt': '创建时间',
        'Settings.apiTokens.ListView.headers.lastUsedAt': '上次使用',
        'Settings.apiTokens.ListView.headers.type': '令牌类型',

        // ===== 通知 =====
        'notification.error': '发生错误',
        'notification.form.error.fields': '表单包含一些错误',
        'notification.form.success.fields': '更改已保存',
        'notification.success.saved': '已保存',
        'notification.success.delete': '项目已被删除',
        'notification.success.title': '成功：',
        'notification.default.title': '信息：',
        'notification.warning.title': '警告：',

        // ===== Content Manager 插件翻译 =====
        'content-manager.header.name': '内容管理器',
        'content-manager.plugin.name': '内容管理器',

        // Content Manager 通用字段标签
        'content-manager.form.Input.label.title': '标题',
        'content-manager.form.Input.label.description': '描述',
        'content-manager.form.Input.label.content': '内容',
        'content-manager.form.Input.label.slug': 'URL别名',
        'content-manager.form.Input.label.image': '图片',
        'content-manager.form.Input.label.name': '名称',
        'content-manager.form.Input.label.email': '邮箱',
        'content-manager.form.Input.label.locale': '语言',

        // Content Manager 列表视图
        'content-manager.containers.list.table-headers.name': '名称',
        'content-manager.containers.list.table-headers.title': '标题',
        'content-manager.containers.list.table-headers.description': '描述',
        'content-manager.containers.list.table-headers.createdAt': '创建时间',
        'content-manager.containers.list.table-headers.updatedAt': '更新时间',

        // Content Manager 操作
        'content-manager.actions.create': '创建条目',
        'content-manager.actions.edit': '编辑条目',
        'content-manager.actions.delete': '删除条目',
        'content-manager.actions.publish': '发布',
        'content-manager.actions.unpublish': '取消发布',

        // Content Manager 表单
        'content-manager.edit-settings-view.link-to-ctb.content-types': '编辑模型',
        'content-manager.edit-settings-view.link-to-ctb.components': '编辑组件',

        // ===== Content Type Builder 插件翻译 =====
        'content-type-builder.plugin.name': '内容类型构建器',
        'content-type-builder.header.name': '内容类型构建器',

        // Content Type Builder 通用
        'content-type-builder.form.attribute.item.requiredField': '必填字段',
        'content-type-builder.form.attribute.item.uniqueField': '唯一字段',
        'content-type-builder.form.attribute.item.maximumLength': '最大长度',
        'content-type-builder.form.attribute.item.minimumLength': '最小长度',

        // ===== i18n 插件翻译 =====
        'i18n.plugin.name': '国际化',

        // ===== Upload 插件翻译 =====
        'upload.plugin.name': '媒体库',

        // ===== 其他 =====
        'or': '或',
        'submit': '提交',
        'skipToContent': '跳至内容',
        'light': '浅色',
        'dark': '深色',
      },
    },
  },
  bootstrap(app: StrapiApp) {
    // 可在此处添加额外的启动逻辑
  },
};
