"use client";

import React from "react";

interface ToCProps {
  items: {
    id: string;
    title: string;
  }[];
}

export default function ToC({ items }: ToCProps) {
  return (
    <div style={{
      background: "#f0f2f5",
      borderRadius: "12px",
      padding: "24px",
      marginBottom: "24px",
      border: "1px solid #e4e6ea"
    }}>
      <h3 style={{
        fontSize: "18px",
        fontWeight: "700",
        color: "#1c1e21",
        marginBottom: "16px",
        marginTop: 0
      }}>
        Table of Contents
      </h3>
      <ul style={{
        listStyle: "none",
        padding: 0,
        margin: 0
      }}>
        {items.map((item, index) => (
          <li key={index} style={{ marginBottom: "12px" }}>
            <a
              href={`#${item.id}`}
              style={{
                color: "#23272f",
                textDecoration: "none",
                fontSize: "14px",
                display: "block",
                padding: "8px 0",
                borderBottom: "1px solid #e4e6ea",
                transition: "text-decoration 0.2s, color 0.2s"
              }}
              onMouseEnter={e => {
                e.currentTarget.style.textDecoration = "underline";
                e.currentTarget.style.color = "#1c1e21";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.textDecoration = "none";
                e.currentTarget.style.color = "#23272f";
              }}
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
