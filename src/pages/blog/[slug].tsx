import Head from "next/head";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import {
  getAllBlogs,
  getAllBlogSlugs,
  getBlogBySlug,
  type BlogMeta,
  type BlogPost,
} from "@/lib/blogs";
import { ArrowLeft, Clock, Share2, User, Calendar, ArrowRight, Check } from "lucide-react";
import type { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import { useState } from "react";

interface BlogDetailProps {
  blog: BlogPost;
  relatedBlogs: BlogMeta[];
}

export default function BlogDetailPage({
  blog,
  relatedBlogs,
}: BlogDetailProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Layout>
      <Head>
        <title>{`DevNest | ${blog.title}`}</title>
        <meta name="description" content={blog.excerpt} />
      </Head>

      <div className="min-h-screen py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <div className="mb-8">
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-primary transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Knowledge Hub</span>
            </Link>
          </div>

          <article className="glass-panel rounded-3xl overflow-hidden border border-border/80 shadow-premium">
            {/* Header Banner */}
            <div className="h-64 sm:h-80 bg-gradient-to-br from-primary/15 via-secondary/40 to-primary/5 flex items-center justify-center border-b border-border/50">
              <span className="text-8xl select-none" aria-hidden="true">
                {blog.thumbnail}
              </span>
            </div>

            <div className="p-6 sm:p-12">
              {/* Category Pill */}
              <div className="mb-4">
                <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider border border-primary/20">
                  {blog.category}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-poppins font-bold tracking-tight text-foreground mb-6 leading-tight">
                {blog.title}
              </h1>

              {/* Meta Info Bar */}
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 pb-6 border-b border-border/60 text-xs sm:text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5 font-medium text-foreground/90">
                  <User className="w-4 h-4 text-primary" />
                  <span>{blog.author}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span>
                    {new Date(blog.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-primary" />
                  <span>{blog.readTime}</span>
                </div>
              </div>

              {/* Excerpt Lead */}
              <p className="text-base sm:text-lg text-muted-foreground my-8 leading-relaxed italic border-l-2 border-primary/40 pl-4">
                {blog.excerpt}
              </p>

              {/* Article Content */}
              <div className="prose dark:prose-invert max-w-none mb-12 text-foreground/90 leading-relaxed">
                <div
                  className="space-y-4 text-sm sm:text-base"
                  dangerouslySetInnerHTML={{ __html: blog.contentHtml }}
                />
              </div>

              {/* Share Strip */}
              <div className="rounded-2xl p-6 mb-12 bg-secondary/60 border border-border/60 shadow-subtle flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="font-bold text-sm sm:text-base text-foreground mb-0.5">
                    Found this article valuable?
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Share it with your peer circle and tech student networks.
                  </p>
                </div>

                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleShare}
                  className="rounded-xl border-border/80 hover:border-primary/40 text-xs font-semibold gap-2 shadow-subtle active:scale-95 transition-all"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-primary" />
                      <span>Link Copied!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3.5 h-3.5 text-primary" />
                      <span>Copy Article Link</span>
                    </>
                  )}
                </Button>
              </div>

              {/* About Author Card */}
              <div className="border-t border-border/60 pt-8">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                  About the Author
                </h3>

                <div className="flex items-start gap-4 p-5 rounded-2xl bg-secondary/40 border border-border/50">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-3xl shrink-0">
                    {blog.thumbnail}
                  </div>

                  <div>
                    <h4 className="font-bold text-sm sm:text-base text-foreground mb-1">
                      {blog.author}
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Passionate builder, developer, and core member at DevNest tech community. Dedicated to mentoring junior engineers and sharing practical knowledge.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* Related Articles */}
          {relatedBlogs.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-poppins font-bold text-foreground mb-6">
                Related Articles
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedBlogs.map((relatedBlog) => (
                  <Link
                    key={relatedBlog.slug}
                    href={`/blog/${relatedBlog.slug}`}
                    className="group block h-full"
                  >
                    <article className="glass-panel rounded-2xl overflow-hidden border border-border/80 group-hover:border-primary/40 shadow-subtle group-hover:shadow-premium-hover transition-all duration-300 flex flex-col justify-between h-full">
                      <div className="h-36 bg-gradient-to-br from-primary/10 to-secondary/30 flex items-center justify-center border-b border-border/50">
                        <span className="text-5xl group-hover:scale-110 transition-transform duration-300">
                          {relatedBlog.thumbnail}
                        </span>
                      </div>

                      <div className="p-5 flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="font-bold font-poppins text-foreground group-hover:text-primary transition-colors text-sm sm:text-base mb-1.5 line-clamp-2">
                            {relatedBlog.title}
                          </h3>

                          <p className="text-xs text-muted-foreground line-clamp-2 mb-4">
                            {relatedBlog.excerpt}
                          </p>
                        </div>

                        <div className="inline-flex items-center justify-between text-xs font-semibold text-primary pt-2 border-t border-border/50">
                          <span>Read Story</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: getAllBlogSlugs(),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<BlogDetailProps> = async ({
  params,
}) => {
  const slug = params?.slug as string;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    return { notFound: true };
  }

  const relatedBlogs = getAllBlogs().filter(
    (b) => b.category === blog.category && b.slug !== blog.slug,
  );

  return {
    props: {
      blog,
      relatedBlogs: relatedBlogs.slice(0, 2),
    },
  };
};