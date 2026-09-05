// content.config.ts — 内容集合定义
// 只做基础元数据校验与默认值；分类完全由文章所在目录结构决定，
// 不再适配任何其他博客的 frontmatter 分类字段（categories/category/分类 等一律忽略）。
import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  type: 'content',
  schema: z
    .object({
      title: z.string().optional(),
      date: z.coerce.date().optional(),
      description: z.string().optional(),
      image: z.string().optional(),
      tags: z.array(z.string()).optional(),
      pinned: z.boolean().optional(),
    })
    .passthrough()
    .transform((fm) => {
      if (fm.title == null) fm.title = '无标题';
      if (fm.tags == null) fm.tags = [];
      if (fm.pinned == null) fm.pinned = false;
      return fm;
    }),
});

export const collections = { posts };
