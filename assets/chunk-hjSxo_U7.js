import {o as defineCollection}from'./chunk-Dz7Rnveg.js';import {o as objectType,s as stringType,i as booleanType,j as arrayType,k as dateType}from'./chunk-Div6EpxG.js';defineCollection({
  schema: objectType({
    title: stringType(),
    published: dateType(),
    updated: dateType().optional(),
    draft: booleanType().optional().default(false),
    description: stringType().optional().default(""),
    image: stringType().optional().default(""),
    tags: arrayType(stringType()).optional().default([]),
    category: stringType().optional().nullable().default(""),
    lang: stringType().optional().default(""),
    ai: stringType().optional().default(""),
    customSlug: stringType().optional(),
    // 自定义文章路径，覆盖默认的文件名作为路径
    sticky: booleanType().optional().default(false),
    // 文章置顶
    password: stringType().optional(),
    // 文章访问密码
    /* For internal use */
    prevTitle: stringType().default(""),
    prevSlug: stringType().default(""),
    nextTitle: stringType().default(""),
    nextSlug: stringType().default("")
  })
});
defineCollection({
  schema: objectType({
    title: stringType().optional().default("更新公告"),
    date: stringType().optional()
  })
});