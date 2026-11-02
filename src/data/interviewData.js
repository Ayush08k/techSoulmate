export const countryCodes = [
  { code: '+91', country: 'India (IN)', flag: '🇮🇳' },
  { code: '+1', country: 'United States / Canada (US/CA)', flag: '🇺🇸' },
  { code: '+44', country: 'United Kingdom (UK)', flag: '🇬🇧' },
  { code: '+61', country: 'Australia (AU)', flag: '🇦🇺' },
  { code: '+49', country: 'Germany (DE)', flag: '🇩🇪' },
  { code: '+33', country: 'France (FR)', flag: '🇫🇷' },
  { code: '+65', country: 'Singapore (SG)', flag: '🇸🇬' },
  { code: '+971', country: 'UAE (AE)', flag: '🇦🇪' },
  { code: '+81', country: 'Japan (JP)', flag: '🇯🇵' },
  { code: '+41', country: 'Switzerland (CH)', flag: '🇨🇭' }
];

export const interviewPositions = [
  'Senior Full-Stack Engineer (React & Node.js)',
  'Frontend Developer (React / Next.js)',
  'Backend Engineer (Node.js / Python / Go)',
  'Mobile App Developer (React Native / Flutter)',
  'DevOps & Cloud Engineer (AWS / Azure / GCP)',
  'System Administrator & IT Support',
  'Software QA & Test Automation Specialist',
  'AI / ML Engineer & Data Scientist',
  'UI/UX Product Designer',
  'Technical Project Manager / Scrum Master'
];

export const timeSlots = [
  '09:00 AM - 10:00 AM',
  '10:30 AM - 11:30 AM',
  '12:00 PM - 01:00 PM',
  '02:00 PM - 03:00 PM',
  '03:30 PM - 04:30 PM',
  '05:00 PM - 06:00 PM',
  '06:30 PM - 07:30 PM',
  '08:00 PM - 09:00 PM'
];

export const interviewTypes = [
  {
    id: 'technical',
    title: 'System Design & Coding',
    duration: '60 Mins',
    desc: 'Live pair-programming, data structures, algorithms, and modular architecture.'
  },
  {
    id: 'behavioral',
    title: 'Managerial & Behavioral',
    duration: '45 Mins',
    desc: 'Situational leadership, conflict resolution, STAR methodology, and culture fit.'
  },
  {
    id: 'full-mock',
    title: 'Comprehensive End-to-End',
    duration: '90 Mins',
    desc: 'Full simulation of top-tier FAANG/enterprise technical rounds and deep-dive review.'
  }
];

export const mockInterviewPerks = [
  {
    title: '1-on-1 Senior Tech Mentors',
    desc: 'Conducted directly by Staff Engineers and Tech Leads from tier-1 companies.'
  },
  {
    title: 'Detailed Scorecard & Feedback',
    desc: 'Receive comprehensive analytics on code quality, communication, and speed within 2 hours.'
  },
  {
    title: 'Recorded Session & Notes',
    desc: 'Full video recording and actionable revision notes to refine your interview strategy.'
  }
];

export const interviewMentors = [
  {
    id: 'm1',
    name: 'Sarah Chen',
    role: 'Staff Infrastructure Architect',
    company: 'Ex-Google Cloud',
    rating: 4.98,
    reviewsCount: 142,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    tags: ['Distributed Systems', 'Kubernetes', 'Go', 'GCP'],
    bio: '12+ years designing high-throughput distributed systems. Specialized in Tier-1 system design and concurrent backend rounds.'
  },
  {
    id: 'm2',
    name: 'Devon Vance',
    role: 'Principal Frontend Engineer',
    company: 'Ex-Meta / Stripe',
    rating: 4.95,
    reviewsCount: 118,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    tags: ['React 19', 'Performance', 'Browser Internals', 'System Design'],
    bio: 'Architected design systems and web apps serving 100M+ monthly users. Expert in frontend system design and tricky JS interview mechanics.'
  },
  {
    id: 'm3',
    name: 'Aarav Mehta',
    role: 'Engineering Director & Tech Lead',
    company: 'Ex-Amazon AWS',
    rating: 4.99,
    reviewsCount: 204,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    tags: ['STAR Leadership', 'System Design', 'Microservices', 'Bar Raiser'],
    bio: 'Former Amazon Bar Raiser with 500+ interviews conducted. Master in behavioral STAR debriefs and architectural scalability.'
  },
  {
    id: 'm4',
    name: 'Elena Rostova',
    role: 'Lead ML / Data Platform Engineer',
    company: 'Ex-Snowflake',
    rating: 4.92,
    reviewsCount: 87,
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
    tags: ['Python', 'LLM Pipeline', 'Data Engineering', 'Vector DBs'],
    bio: 'Specialist in machine learning infrastructure and production pipeline interviews for senior AI/ML roles.'
  }
];

export const practiceQuestions = [
  {
    id: 'q1',
    category: 'System Design',
    title: 'Design a Real-Time Distributed Notification System',
    difficulty: 'Hard',
    targetCompany: 'Uber / Netflix',
    description: 'Design a scalable notification service capable of sending millions of notifications per minute across Push, SMS, and Email with guaranteed deduplication and rate limiting.',
    keyConcepts: ['Message Broker (Kafka)', 'Priority Queues', 'Redis Token Bucket', 'Idempotency Keys'],
    hint: 'Decouple client request ingestion from delivery workers via message queues. Use Redis idempotency keys with TTL to avoid duplicate alerts.',
    solutionOverview: 'Use API Gateway -> Notification Service -> Kafka Topics partitioned by user/channel -> Distributed Consumer Workers with third-party providers (APNS, FCM, Twilio) + Dead Letter Queues (DLQ).'
  },
  {
    id: 'q2',
    category: 'System Design',
    title: 'Design a Global URL Shortener with High Availability',
    difficulty: 'Medium',
    targetCompany: 'Meta / Twitter',
    description: 'Design a TinyURL service supporting 100M new URLs created per month, high read-to-write ratio (100:1), and custom aliases with millisecond latency.',
    keyConcepts: ['Base62 Encoding', 'Distributed Unique ID Generator', 'Redis Cache Cluster', 'Database Sharding'],
    hint: 'A 7-character Base62 string yields ~3.5 trillion unique keys. Pre-generate ID sequences using a distributed ticket server or Snowflake ID.',
    solutionOverview: 'Write path: API -> Token Generator -> DB Write -> Cache Invalidate. Read path: Cache lookup (LRU) -> on miss read PostgreSQL/Cassandra -> repopulate cache. 301 vs 302 HTTP redirects trade-off.'
  },
  {
    id: 'q3',
    category: 'Data Structures & Algorithms',
    title: 'LRU Cache with O(1) Get and Put Operations',
    difficulty: 'Medium',
    targetCompany: 'Amazon / Microsoft',
    description: 'Implement a Least Recently Used (LRU) cache with fixed capacity. Both `get(key)` and `put(key, value)` must run in strictly O(1) average time complexity.',
    keyConcepts: ['Hash Map', 'Doubly Linked List', 'O(1) Eviction', 'Pointers'],
    hint: 'Combine a Doubly Linked List (for tracking node recency) with a Hash Map (for O(1) key-to-node lookup).',
    solutionOverview: 'Store nodes in a Doubly Linked List with dummy head and tail. On access/insert, remove the node and re-insert at head. When capacity is exceeded, evict the node right before tail.'
  },
  {
    id: 'q4',
    category: 'Data Structures & Algorithms',
    title: 'Sliding Window Maximum / Median in Stream',
    difficulty: 'Hard',
    targetCompany: 'Google / Apple',
    description: 'Given an array of integers and a sliding window of size k moving from left to right, return the maximum element in each sliding window in O(N) total time.',
    keyConcepts: ['Monotonic Deque', 'Sliding Window', 'Two Heaps', 'O(N) Amortized'],
    hint: 'Use a double-ended queue (deque) storing indices, maintaining elements in strictly decreasing order.',
    solutionOverview: 'Maintain a Monotonic Deque: pop indices from back whose values are <= incoming element; pop indices from front that fell out of window range (i - k). Front always holds max.'
  },
  {
    id: 'q5',
    category: 'Behavioral (STAR)',
    title: 'Tell Me About a High-Impact Production Outage You Resolved',
    difficulty: 'Behavioral',
    targetCompany: 'All Tier-1',
    description: 'Demonstrates incident response, root cause triage under pressure, blameless post-mortem ownership, and long-term architectural prevention.',
    keyConcepts: ['Situation', 'Task', 'Action', 'Result', 'Blameless Post-Mortem'],
    hint: 'Structure using Situation -> Task -> Action -> Result. Emphasize user impact, immediate mitigation vs permanent fix, and what guardrails you added.',
    solutionOverview: 'Focus on communication with stakeholders during the P0 incident, systematic rollback/feature-flag disablement, followed by automated telemetry & circuit breakers in the post-mortem.'
  },
  {
    id: 'q6',
    category: 'Behavioral (STAR)',
    title: 'Disagreement on Architectural Direction with a Senior Peer',
    difficulty: 'Behavioral',
    targetCompany: 'Amazon / Stripe',
    description: 'Evaluates your technical humility, objective trade-off evaluation, ability to disagree and commit, and consensus building without ego.',
    keyConcepts: ['Empathy', 'Data-Driven Benchmarks', 'Disagree & Commit', 'Influence Without Authority'],
    hint: 'Highlight how you gathered benchmark metrics or ran a quick POC instead of arguing abstract opinions, and how you unified the team.',
    solutionOverview: 'Frame the differing philosophies objectively, describe the lightweight benchmark/spike test conducted, and show how the team aligned around customer reliability.'
  }
];

export const rubricCriteria = [
  {
    id: 'rc1',
    dimension: 'Problem Solving & Approach',
    weight: '25%',
    icon: 'Brain',
    excellent: 'Clarifies requirements, edge cases, proactively identifies bottlenecks, and chooses optimal algorithm without hand-holding.',
    developing: 'Jumps directly into code without clarifying inputs, struggles with edge conditions, requires heavy prompting.'
  },
  {
    id: 'rc2',
    dimension: 'System Architecture & Scalability',
    weight: '30%',
    icon: 'Layers',
    excellent: 'Correctly partitions data, accounts for network partitions, introduces caching/queuing judiciously with quantified trade-offs.',
    developing: 'Proposes monolithic single-point-of-failure designs, cannot explain CAP theorem or rate-limiting mechanics.'
  },
  {
    id: 'rc3',
    dimension: 'Code Quality & Clean Architecture',
    weight: '25%',
    icon: 'Code2',
    excellent: 'Writes idiomatic, modular, self-documenting code with meaningful variable naming and robust error handling.',
    developing: 'Spaghetti code, deeply nested conditionals, hardcoded values, missing type/boundary validations.'
  },
  {
    id: 'rc4',
    dimension: 'Communication & Culture Fit',
    weight: '20%',
    icon: 'MessageSquare',
    excellent: 'Articulates thought process clearly out loud, accepts hints gracefully, structured STAR behavioral responses.',
    developing: 'Silent for long stretches, defensive when challenged on sub-optimal assumptions, vague storytelling.'
  }
];

