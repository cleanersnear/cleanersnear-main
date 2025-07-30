import React from "react";
import Link from "next/link";
import Image from "next/image";

const blog = [
  {
    url: "/blog/regular-vs-once-off-cleaning", // 👈 hardcoded URL
    title: "Regular vs One-Off Cleaning Services in Melbourne",
    description:
      "Struggling to decide between regular and one-off house cleaning in Melbourne? We break down the pros, costs, and best situations for each — direct from our local experts.",
    image: "/blog/regular-vs-once-off-cleaning.png", // 👈 use local public path
  },
  // Add more blogs manually
];


export const metadata = {
  title: "Melbourne House Cleaning Blog | Expert Tips & Guides",
  description: "Browse our latest cleaning blogs, tips, and guides for Melbourne homes. Find expert advice, pricing, and service comparisons from Cleaning Professionals Australia.",
};

export default function BlogListingPage() {
  return (
    <section style={{
      maxWidth: 900,
      margin: '2.5rem auto',
      padding: '0 1.2rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '2.5rem',
    }}>
      <h1 style={{
        color: '#23272f',
        fontWeight: 800,
        fontSize: '2.2rem',
        marginBottom: '1.5rem',
        letterSpacing: '-1px',
      }}>
        Melbourne Cleaning Blog
      </h1>
      {blog.map((blog) => (
        <article
          key={blog.url}
          style={{
            background: '#fff',
            borderRadius: 18,
            boxShadow: '0 2px 12px rgba(35,39,47,0.06)',
            padding: '2.5rem 2rem',
            display: 'flex',
            flexDirection: 'row',
            gap: '2rem',
            alignItems: 'center',
            minHeight: 180,
          }}
        >
          {blog.image && (
            <div style={{ flex: '0 0 180px', maxWidth: 180 }}>
              <Image
                src={blog.image}
                alt={blog.title}
                width={180}
                height={120}
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: 12,
                  objectFit: 'cover',
                  boxShadow: '0 1px 6px rgba(35,39,47,0.08)',
                }}
              />
            </div>
          )}
          <div style={{ flex: 1, minWidth: 0 }}>
            <h2 style={{
              color: '#23272f',
              fontWeight: 700,
              fontSize: '1.35rem',
              margin: 0,
              marginBottom: '0.7rem',
            }}>
              <Link href={blog.url} style={{ color: '#23272f', textDecoration: 'none' }}>
                {blog.title}
              </Link>
            </h2>
            <p style={{ color: '#444950', fontSize: '1.08rem', marginBottom: '1.2rem', lineHeight: 1.7 }}>
              {blog.description}
            </p>
            <Link
              href={blog.url}
              style={{
                display: 'inline-block',
                background: '#23272f',
                color: '#fff',
                padding: '0.7em 1.5em',
                borderRadius: 8,
                fontWeight: 600,
                fontSize: '1rem',
                textDecoration: 'none',
                transition: 'background 0.2s',
              }}
            >
              Read Full Blog
            </Link>
          </div>
        </article>
      ))}
    </section>
  );
} 