import medical from '../assets/medical.png';
import engineer from '../assets/engineer.png';
import entrepreneur from '../assets/entrepreneur.png';
import harryPotter from '../assets/harryPotter.png';
import gk from '../assets/general-Knowledge.png';
import lawyer from '../assets/Lawyer.png';

const characters = [
  {
    name: 'Medical',
    Department: 'Science',
    color: '#F42C38',
    image: medical,
    description: 'Test your knowledge on various medical concepts, anatomy, physiology, and common diseases.',
    clips: [
      '/api/placeholder/200/120',
      '/api/placeholder/200/120',
      '/api/placeholder/200/120',
    ],
    flashcards: [
      {
        question: "What is the largest organ in the human body?",
        answer: "The skin is the largest organ, covering about 20 square feet in adults."
      },
      {
        question: "What are the four chambers of the human heart?",
        answer: "The four chambers are the right atrium, right ventricle, left atrium, and left ventricle."
      },
      {
        question: "What is the normal resting heart rate for adults?",
        answer: "60-100 beats per minute is considered normal for adults."
      }
    ]
  },
  {
    name: 'Harry Potter',
    Department: 'Movies',
    color: '#6366f1',
    image: harryPotter,
    description: 'Test your knowledge of the wizarding world, characters, spells, and magical creatures.',
    clips: [
      '/api/placeholder/200/120',
      '/api/placeholder/200/120',
      '/api/placeholder/200/120',
    ],
    flashcards: [
      {
        question: "What is Harry Potter's Patronus?",
        answer: "A stag (like his father's)"
      },
      {
        question: "Who is the Half-Blood Prince?",
        answer: "Severus Snape"
      },
      {
        question: "What are the three Unforgivable Curses?",
        answer: "Avada Kedavra (Killing Curse), Crucio (Cruciatus Curse), and Imperio (Imperius Curse)"
      }
    ]
  },
  {
    name: 'Network-Engineer',
    Department: 'BTech',
    color: '#006CA5',
    image: engineer,
    description: 'Challenge yourself with networking concepts, protocols, and infrastructure knowledge.',
    clips: [
      '/api/placeholder/200/120',
      '/api/placeholder/200/120',
      '/api/placeholder/200/120',
    ],
    flashcards: [
      {
        question: "What does OSI stand for in networking?",
        answer: "Open Systems Interconnection"
      },
      {
        question: "What is the purpose of DHCP?",
        answer: "Dynamic Host Configuration Protocol automatically assigns IP addresses and other network configuration parameters to devices on a network."
      },
      {
        question: "What is the difference between a router and a switch?",
        answer: "A router connects different networks and routes packets between them using IP addresses. A switch connects devices within the same network using MAC addresses."
      }
    ]
  },
  {
    name: 'Entrepreneur',
    Department: 'Business',
    color: '#48a860',
    image: entrepreneur,
    description: 'Test your knowledge of business concepts, startup strategies, and entrepreneurial skills.',
    clips: [
      '/api/placeholder/200/120',
      '/api/placeholder/200/120',
      '/api/placeholder/200/120',
    ],
    flashcards: [
      {
        question: "What is a minimum viable product (MVP)?",
        answer: "A product with just enough features to gather validated learning about the product and its continued development."
      },
      {
        question: "What is the difference between B2B and B2C?",
        answer: "B2B (Business-to-Business) involves transactions between businesses, while B2C (Business-to-Consumer) involves transactions directly with end consumers."
      },
      {
        question: "What is bootstrapping in business?",
        answer: "Building a company from the ground up with personal finances or operating revenues rather than external funding."
      }
    ]
  },
  {
    name: 'General-Knowledge',
    Department: 'General Knowledge',
    color: '#ffa500',
    image: gk,
    description: 'Test your knowledge across various subjects including history, geography, science, and current affairs.',
    clips: [
      '/api/placeholder/200/120',
      '/api/placeholder/200/120',
      '/api/placeholder/200/120',
    ],
    flashcards: [
      {
        question: "Which is the largest ocean on Earth?",
        answer: "The Pacific Ocean"
      },
      {
        question: "What year did the Berlin Wall fall?",
        answer: "1989"
      },
      {
        question: "Who wrote 'War and Peace'?",
        answer: "Leo Tolstoy"
      }
    ]
  },
  {
    name: 'Lawyer',
    Department: 'Law',
    color: '#808000',
    image: lawyer,
    description: 'Challenge yourself with legal concepts, terminology, and important case knowledge.',
    clips: [
      '/api/placeholder/200/120',
      '/api/placeholder/200/120',
      '/api/placeholder/200/120',
    ],
    flashcards: [
      {
        question: "What does 'habeas corpus' mean?",
        answer: "A legal principle ensuring that a prisoner can be released from unlawful detention - literally 'you may have the body'."
      },
      {
        question: "What is the difference between civil and criminal law?",
        answer: "Civil law deals with disputes between individuals/organizations where compensation may be awarded, while criminal law deals with crimes against the state/public where punishment is typically imprisonment or fines."
      },
      {
        question: "What is precedent in law?",
        answer: "A principle where judges are obliged to respect the precedents established by prior decisions."
      }
    ]
  },
];

export default characters;