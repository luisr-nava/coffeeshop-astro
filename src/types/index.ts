import { z } from "astro:content";

const imageSchema = z.object({
  url: z.string(),
  width: z.number(),
  height: z.number(),
});

const featureImageSchema = z.object({
  thumbnail: imageSchema,
  medium: imageSchema,
  medium_large: imageSchema,
  large: imageSchema,
  full: imageSchema,
});

export const BaseWPSchema = z.object({
  id: z.number(),
  slug: z.string(),
  title: z.object({
    rendered: z.string(),
  }),
  content: z.object({
    rendered: z.string(),
  }),
  excerpt: z.object({
    rendered: z.string(),
  }),
  feature_images: featureImageSchema,
  acf: z.object({
    subtitle: z.string(),
  }),
});

const gallerySchema = z.object({
  large: imageSchema,
  full: imageSchema,
});

export const GalleryPageSchema = BaseWPSchema.extend({
  gallery: z.array(gallerySchema),
});

const processSchema = z.object({
  title: z.string(),
  description: z.string(),
  image: z.string(),
});

export const CategorySchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
});

export const CategoriesSlugSchema = z.array(
  CategorySchema.pick({
    slug: true,
  }),
);

const CategoriesSchema = z.array(CategorySchema);

export const ProcessWPSchema = BaseWPSchema.extend({
  acf: z
    .object({
      subtitle: z.string(),
    })
    .catchall(processSchema),
});

export const PostSchema = BaseWPSchema.omit({
  acf: true,
}).extend({
  date: z.string(),
  category_details: CategoriesSchema,
});

export const PostsSchema = z.array(PostSchema);

const MenuItemSchema = BaseWPSchema.pick({
  title: true,
  feature_images: true,
}).extend({
  acf: z.object({
    description: z.string(),
    price: z.coerce.number(),
  }),
});

const MarkersSchema = z.object({
  label: z.string(),
  lat: z.number(),
  lng: z.number(),
});

const LocationSchema = z.object({
  lat: z.number(),
  lng: z.number(),
  zoom: z.number(),
  markers: z.array(MarkersSchema),
});

export const ContactPageSchema = BaseWPSchema.extend({
  acf: z
    .object({
      subtitle: z.string(),
    })
    .catchall(LocationSchema),
});

export const MenuItemsSchema = z.array(MenuItemSchema);

export type Post = z.infer<typeof PostSchema>;

export type Gallery = z.infer<typeof gallerySchema>;

export type FeatureImages = z.infer<typeof featureImageSchema>;

export type Location = z.infer<typeof LocationSchema>;
