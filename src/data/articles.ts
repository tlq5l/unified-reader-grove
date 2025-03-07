
import { Article } from "@/types/article";

export const sampleArticles: Article[] = [
  {
    id: "1",
    title: "The Future of Digital Reading",
    description: "How technology is changing the way we consume written content and what it means for the future of reading.",
    content: `
      <h1>The Future of Digital Reading</h1>
      <p>The way we read and consume content has changed dramatically over the past few decades. With the advent of e-readers, tablets, and smartphones, people now have access to vast libraries of content at their fingertips.</p>
      <h2>Evolution of Reading</h2>
      <p>From ancient scrolls to printed books to digital screens, the medium through which we read has evolved, but the fundamental act of reading itself remains crucial to human knowledge acquisition.</p>
      <p>Digital reading platforms now offer features that were impossible with traditional books:</p>
      <ul>
        <li>Instant dictionary lookups</li>
        <li>Note-taking and highlighting</li>
        <li>Sharing annotations with others</li>
        <li>Adjustable font sizes and styles</li>
        <li>Night reading modes</li>
      </ul>
      <h2>AI and Reading Assistance</h2>
      <p>The newest frontier in digital reading involves artificial intelligence. AI assistants can now help readers by:</p>
      <ol>
        <li>Summarizing long articles</li>
        <li>Explaining difficult concepts</li>
        <li>Translating text to other languages</li>
        <li>Answering questions about the content</li>
      </ol>
      <p>These tools are especially valuable for academic and professional reading, where comprehension of complex material is essential.</p>
      <h2>The Challenge of Digital Distraction</h2>
      <p>Despite these advances, digital reading comes with challenges. The same devices we use to read also expose us to distractions like notifications, social media, and email.</p>
      <p>Research has shown that deep reading—the kind that happens when you immerse yourself in a book—may be more difficult to achieve on digital devices.</p>
      <blockquote>
        <p>"We are not only what we read. We are how we read." — Maryanne Wolf, cognitive neuroscientist</p>
      </blockquote>
      <h2>The Future Landscape</h2>
      <p>Looking ahead, we can expect to see even more innovation in digital reading:</p>
      <p>Augmented reality might overlay additional information on physical books. Personalized reading experiences could adapt to an individual's reading level and interests. Collaborative reading platforms might allow book clubs to gather virtually and share thoughts in real-time.</p>
      <p>What remains clear is that reading itself—regardless of medium—will continue to be essential for education, entertainment, and enlightenment.</p>
    `,
    contentType: "article",
    source: "Digital Trends Magazine",
    originalUrl: "https://example.com/future-of-reading",
    coverImage: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1290&q=80",
    addedAt: "2023-10-15T10:30:00Z",
    publishedAt: "2023-10-10T08:00:00Z",
    readingTime: 8,
    status: "inbox",
    highlights: [
      {
        id: "h1",
        text: "The way we read and consume content has changed dramatically over the past few decades.",
        position: "p1",
        createdAt: "2023-10-16T11:24:00Z"
      },
      {
        id: "h2",
        text: "From ancient scrolls to printed books to digital screens, the medium through which we read has evolved, but the fundamental act of reading itself remains crucial to human knowledge acquisition.",
        position: "p2",
        note: "Important point about the consistent value of reading across history",
        createdAt: "2023-10-16T11:26:00Z"
      }
    ]
  },
  {
    id: "2",
    title: "Understanding Neural Networks in Deep Learning",
    description: "A comprehensive guide to understanding how neural networks function in deep learning applications.",
    content: `
      <h1>Understanding Neural Networks in Deep Learning</h1>
      <p>Neural networks are the backbone of modern artificial intelligence. This article explores how they work and why they've revolutionized computing.</p>
      <h2>What Are Neural Networks?</h2>
      <p>Neural networks are computational systems inspired by the human brain. They consist of layers of interconnected nodes or "neurons" that process information.</p>
      <p>Each connection between neurons has a weight that adjusts as the network learns, allowing it to recognize patterns and make predictions.</p>
      <h2>Types of Neural Networks</h2>
      <ul>
        <li>Feed-forward Neural Networks</li>
        <li>Convolutional Neural Networks (CNNs)</li>
        <li>Recurrent Neural Networks (RNNs)</li>
        <li>Transformer Networks</li>
      </ul>
      <p>Each type excels at different tasks, from image recognition to natural language processing.</p>
    `,
    contentType: "article",
    source: "Tech Insights",
    originalUrl: "https://example.com/neural-networks",
    coverImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1334&q=80",
    addedAt: "2023-10-14T15:45:00Z",
    publishedAt: "2023-10-05T09:30:00Z",
    readingTime: 12,
    status: "inbox"
  },
  {
    id: "3",
    title: "Sustainable Urban Planning: Cities of Tomorrow",
    description: "How innovative urban planning is creating more sustainable, livable cities around the world.",
    content: `
      <h1>Sustainable Urban Planning: Cities of Tomorrow</h1>
      <p>As urban populations grow, cities face unprecedented challenges in providing sustainable, livable environments for their residents.</p>
      <h2>Green Infrastructure</h2>
      <p>Modern cities are incorporating green spaces, urban forests, and living architecture to combat pollution and improve quality of life.</p>
      <h2>Smart City Technologies</h2>
      <p>IoT devices and data analytics are helping cities manage resources more efficiently, from traffic flow to energy consumption.</p>
    `,
    contentType: "article",
    source: "Urban Development Journal",
    originalUrl: "https://example.com/sustainable-cities",
    coverImage: "https://images.unsplash.com/photo-1518005068251-37900150dfca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1325&q=80",
    addedAt: "2023-10-10T09:15:00Z",
    publishedAt: "2023-09-28T11:00:00Z",
    readingTime: 15,
    status: "later"
  },
  {
    id: "4",
    title: "Introduction to Quantum Computing",
    description: "A beginner's guide to understanding quantum computing and its potential applications.",
    content: `
      <h1>Introduction to Quantum Computing</h1>
      <p>Quantum computing represents a paradigm shift in how we process information, leveraging quantum mechanics to perform computations impossible for classical computers.</p>
      <h2>Quantum Bits (Qubits)</h2>
      <p>Unlike classical bits that are either 0 or 1, qubits can exist in multiple states simultaneously through superposition.</p>
      <h2>Quantum Algorithms</h2>
      <p>Quantum algorithms like Shor's and Grover's offer exponential speedups for certain problems, potentially revolutionizing cryptography and database searches.</p>
    `,
    contentType: "article",
    source: "Quantum Review",
    originalUrl: "https://example.com/quantum-computing",
    coverImage: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    addedAt: "2023-10-08T14:20:00Z",
    publishedAt: "2023-09-20T10:15:00Z",
    readingTime: 18,
    status: "archive"
  },
  {
    id: "5",
    title: "Modern JavaScript Frameworks Comparison",
    description: "An in-depth comparison of popular JavaScript frameworks like React, Vue, and Angular.",
    content: `
      <h1>Modern JavaScript Frameworks Comparison</h1>
      <p>Choosing the right JavaScript framework is crucial for web development projects. This article compares leading options to help you make an informed decision.</p>
      <h2>React</h2>
      <p>Developed by Facebook, React offers a component-based architecture and virtual DOM for efficient rendering.</p>
      <h2>Vue</h2>
      <p>Vue combines the best aspects of React and Angular, offering an approachable framework with strong performance.</p>
      <h2>Angular</h2>
      <p>Google's Angular provides a complete solution with built-in tools for routing, forms, and state management.</p>
    `,
    contentType: "article",
    source: "Web Dev Insights",
    originalUrl: "https://example.com/js-frameworks",
    coverImage: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
    addedAt: "2023-10-05T16:30:00Z",
    publishedAt: "2023-09-15T13:45:00Z",
    readingTime: 10,
    status: "later"
  },
  {
    id: "6",
    title: "The Psychology of Productivity",
    description: "Exploring the mental factors that influence productivity and strategies for improvement.",
    content: `
      <h1>The Psychology of Productivity</h1>
      <p>Productivity isn't just about tools and techniques—it's deeply connected to our psychology and mental state.</p>
      <h2>Flow State</h2>
      <p>The concept of "flow," coined by psychologist Mihaly Csikszentmihalyi, describes a state of complete immersion in a task that maximizes productivity.</p>
      <h2>Motivation Types</h2>
      <p>Understanding intrinsic motivation (driven by internal rewards) versus extrinsic motivation (driven by external rewards) can help tailor productivity strategies to individual preferences.</p>
    `,
    contentType: "article",
    source: "Psychology Today",
    originalUrl: "https://example.com/productivity-psychology",
    coverImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    addedAt: "2023-10-01T11:20:00Z",
    publishedAt: "2023-09-10T09:00:00Z",
    readingTime: 14,
    status: "archive"
  },
  {
    id: "7",
    title: "Introduction to Machine Learning with Python",
    description: "Learn the basics of implementing machine learning algorithms using Python and scikit-learn.",
    content: `
      <h1>Introduction to Machine Learning with Python</h1>
      <p>Python has become the de facto language for machine learning. This guide introduces key concepts and practical implementations.</p>
      <h2>Setting Up Your Environment</h2>
      <p>Learn how to set up Python with essential libraries like NumPy, pandas, and scikit-learn.</p>
      <h2>Supervised Learning Algorithms</h2>
      <p>Explore classification and regression algorithms including decision trees, random forests, and support vector machines.</p>
    `,
    contentType: "article",
    source: "Data Science Journal",
    originalUrl: "https://example.com/ml-python",
    coverImage: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80",
    addedAt: "2023-09-28T13:10:00Z",
    publishedAt: "2023-09-05T14:30:00Z",
    readingTime: 16,
    status: "inbox"
  },
  {
    id: "8",
    title: "Climate Change: The Latest Science",
    description: "A comprehensive review of the current scientific understanding of climate change and its impacts.",
    content: `
      <h1>Climate Change: The Latest Science</h1>
      <p>This article summarizes recent scientific findings on climate change, focusing on new data and updated projections.</p>
      <h2>Temperature Trends</h2>
      <p>Global temperature records continue to show warming trends, with the past decade being the warmest on record.</p>
      <h2>Impact on Ecosystems</h2>
      <p>From coral reefs to polar environments, ecosystems worldwide are showing signs of stress due to climate change.</p>
    `,
    contentType: "newsletter",
    source: "Environmental Science Review",
    originalUrl: "https://example.com/climate-science",
    coverImage: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    addedAt: "2023-09-25T10:05:00Z",
    publishedAt: "2023-09-01T08:15:00Z",
    readingTime: 20,
    status: "inbox"
  }
];
