import { Article } from "@/types/article";

export const samplePDFs: Article[] = [
  {
    id: "pdf-1",
    title: "Web Development Best Practices",
    description: "A comprehensive guide to modern web development patterns and best practices for building scalable applications.",
    content: "", // PDF content is handled by the PDF viewer
    contentType: "pdf",
    source: "Web Dev Academy",
    originalUrl: "https://arxiv.org/pdf/2212.14034.pdf", // Sample PDF URL
    coverImage: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    addedAt: "2023-10-12T14:30:00Z",
    publishedAt: "2023-09-25T09:15:00Z",
    readingTime: 45,
    status: "inbox"
  },
  {
    id: "pdf-2",
    title: "Artificial Intelligence Fundamentals",
    description: "Learn about core AI concepts including machine learning, neural networks, and natural language processing.",
    content: "", // PDF content is handled by the PDF viewer
    contentType: "pdf",
    source: "AI Research Institute",
    originalUrl: "https://arxiv.org/pdf/2303.08774.pdf", // Sample PDF URL
    coverImage: "https://images.unsplash.com/photo-1677442136019-21780ecad979?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80",
    addedAt: "2023-10-10T10:45:00Z",
    publishedAt: "2023-09-18T14:20:00Z",
    readingTime: 60,
    status: "later"
  },
  {
    id: "pdf-3",
    title: "Financial Planning: Guide to Personal Investment",
    description: "A detailed guide to personal finance, investment strategies, and retirement planning.",
    content: "", // PDF content is handled by the PDF viewer
    contentType: "pdf",
    source: "Finance Academy",
    originalUrl: "https://arxiv.org/pdf/2310.06825.pdf", // Sample PDF URL
    coverImage: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
    addedAt: "2023-10-05T11:20:00Z",
    publishedAt: "2023-09-10T08:45:00Z",
    readingTime: 50,
    status: "archive"
  }
];