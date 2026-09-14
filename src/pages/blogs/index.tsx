import Head from "next/head";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ArrowRight, Clock, User, BookOpen, Sparkles, Send } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import type { GetStaticProps } from "next";
import { getAllBlogs, type BlogMeta } from "@/lib/blogs";

interface BlogsPageProps {
  blogs: BlogMeta[];
}

export default function BlogsPage({ blogs }: BlogsPageProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    null,
  );

  const categories = Array.from(new Set(blogs.map((blog) => blog.category)));

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      !selectedCategory || blog.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <Layout>
      <Head>
        <title>DevNest | Blog & Technical Insights</title>
        <meta
          name="description"
          content="Articles, tutorials, tech guides, and architectural stories written by DevNest members and engineering leads."
        />
      </Head>

      <div className="min-h-screen py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Left-Aligned Header */}
          <div className="text-left mb-12">
            <div className="badge-pill mb-4">
              <BookOpen className="w-3.5 h-3.5 text-primary" />
              <span>DevNest Knowledge Base</span>
              <span className="text-muted-foreground/60">•</span>
              <span className="text-foreground/80 font-medium">Technical Publications</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-poppins font-bold tracking-tight mb-4 text-foreground">
              Blogs & <span className="text-gradient-primary">Insights</span>
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Curated articles, deep-dives, career pathways, and tech tutorials contributed by our
              community members, domain leads, and mentors.
            </p>
          </div>

          {/* Search and Filter (Left-Aligned Toolbar) */}
          <div className="mb-12 space-y-4">
            {/* Search Bar */}
            <div className="relative max-w-xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search articles by title or keyword..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                className="pl-11 pr-4 h-12 rounded-2xl border border-border/80 bg-card/90 shadow-subtle focus:border-primary/50 text-sm transition-all duration-200"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 justify-start">
              <button
                type="button"
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                  selectedCategory === null
                    ? "bg-primary text-primary-foreground shadow-subtle hover:shadow-glow-primary"
                    : "bg-secondary/70 hover:bg-secondary text-muted-foreground hover:text-foreground border border-border/60"
                }`}
              >
                All Categories ({blogs.length})
              </button>

              {categories.map((category) => (
                <button
                  type="button"
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground shadow-subtle hover:shadow-glow-primary"
                      : "bg-secondary/70 hover:bg-secondary text-muted-foreground hover:text-foreground border border-border/60"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Blogs Grid */}
          {filteredBlogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-20">
              {filteredBlogs.map((blog) => (
                <Link
                  key={blog.slug}
                  href={`/blog/${blog.slug}`}
                  className="group block h-full"
                >
                  <article className="glass-panel rounded-3xl overflow-hidden border border-border/80 group-hover:border-primary/40 shadow-subtle group-hover:shadow-premium-hover transition-all duration-300 flex flex-col justify-between h-full">
                    {/* Thumbnail */}
                    <div className="relative h-44 bg-gradient-to-br from-primary/10 via-secondary/40 to-primary/5 overflow-hidden flex items-center justify-center border-b border-border/50">
                      <span className="text-6xl select-none group-hover:scale-110 transition-transform duration-300" aria-hidden="true">
                        {blog.thumbnail}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        {/* Category Badge */}
                        <div className="mb-2.5">
                          <span className="inline-block px-2.5 py-0.5 rounded-md bg-primary/10 text-primary border border-primary/20 text-[11px] font-semibold">
                            {blog.category}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-lg font-bold font-poppins text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2 leading-snug">
                          {blog.title}
                        </h3>

                        {/* Excerpt */}
                        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-4">
                          {blog.excerpt}
                        </p>
                      </div>

                      <div>
                        {/* Meta Info */}
                        <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border/60 pt-3.5 mb-3.5">
                          <div className="flex items-center gap-1.5 font-medium truncate max-w-[140px]">
                            <User className="w-3.5 h-3.5 text-primary shrink-0" />
                            <span className="truncate">{blog.author}</span>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-primary shrink-0" />
                            <span>{blog.readTime}</span>
                          </div>
                        </div>

                        {/* Read Link */}
                        <div className="inline-flex items-center justify-between w-full text-xs font-semibold text-primary pt-1">
                          <span>Read Full Story</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 glass-panel rounded-3xl border border-border/80 max-w-md mx-auto mb-20">
              <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <h3 className="text-lg font-bold text-foreground mb-1">No Articles Found</h3>
              <p className="text-xs text-muted-foreground mb-4">
                No posts match your current search query or active category filter.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory(null);
                }}
                className="rounded-xl"
              >
                Reset Filters
              </Button>
            </div>
          )}

          {/* CTA Section */}
          <div className="mt-16 text-center">
            <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-border/80 shadow-premium max-w-2xl mx-auto">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mx-auto mb-4">
                <Sparkles className="w-6 h-6" />
              </div>

              <h3 className="text-2xl sm:text-3xl font-poppins font-bold text-foreground mb-3">
                Want to Share Your Knowledge?
              </h3>

              <p className="text-sm text-muted-foreground max-w-md mx-auto mb-6 leading-relaxed">
                We welcome technical write-ups, project breakdowns, and beginner-friendly guides from DevNest students and alumni.
              </p>

              <a
                href="mailto:devnest.techclub@gmail.com?subject=DevNest%20Blog%20Submission"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-xs sm:text-sm shadow-subtle hover:shadow-glow-primary transition-all duration-200 active:scale-95"
              >
                <Send className="w-4 h-4" />
                <span>Submit an Article</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<BlogsPageProps> = async () => {
  return {
    props: {
      blogs: getAllBlogs(),
    },
  };
};