"use client";

import React from "react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQsProps {
  items: FAQItem[];
}

export default function FAQs({ items }: FAQsProps) {
  return (
    <div style={{
      background: "#f0f2f5",
      borderRadius: "12px",
      padding: "24px",
      border: "1px solid #e4e6ea"
    }}>
      <h3 style={{
        fontSize: "18px",
        fontWeight: "700",
        color: "#1c1e21",
        marginBottom: "16px",
        marginTop: 0
      }}>
        Frequently Asked Questions
      </h3>
      {items.map((item, index) => (
        <div key={index} style={{ marginBottom: "16px" }}>
          <h4 style={{
            fontSize: "14px",
            fontWeight: "600",
            color: "#1c1e21",
            marginBottom: "8px",
            marginTop: 0
          }}>
            {item.question}
          </h4>
          <p style={{
            fontSize: "13px",
            color: "#65676b",
            margin: 0,
            lineHeight: "1.5"
          }}>
            {item.answer}
          </p>
        </div>
      ))}
    </div>
  );
}
