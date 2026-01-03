
CREATE TABLE external_blog_posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  external_id TEXT UNIQUE,
  title TEXT NOT NULL,
  link TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  image_url TEXT,
  published_date DATETIME,
  author TEXT,
  category TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_external_blog_posts_published_date ON external_blog_posts(published_date DESC);
CREATE INDEX idx_external_blog_posts_category ON external_blog_posts(category);
CREATE INDEX idx_external_blog_posts_link ON external_blog_posts(link);
