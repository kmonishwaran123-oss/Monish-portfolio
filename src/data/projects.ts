export interface Project {
  id: string;
  title: string;
  tags: 'IT' | 'Core' | string[];
  shortDesc: string;
  longDesc: string;
  challenge: string;
  approach: string;
  result: string;
  images: string[];
  repoUrl?: string;
  liveUrl?: string;
  tech: string[];
}

export const projects: Project[] = [
 

  {
    id: "Hydrogen-baja",
    title: "Hydrogen Baja Competition",
    tags: ['ALL','Core' ],
    shortDesc: "Hydrogen–Petrol dual-fuel engine system with real-time monitoring and predictive maintenance.",
    longDesc: "Developed an intelligent Hydrogen–Petrol dual-fuel engine system that enables smooth fuel switching, monitors performance in real-time, predicts maintenance needs, and improves efficiency, reliability, and safety.",
    challenge: "Ensuring stable combustion, safe hydrogen handling, and efficient fuel switching between Hydrogen and Petrol under varying load conditions.",
    approach: "Implemented real-time sensor monitoring, adaptive injector control, and predictive diagnostics to optimize Hydrogen–Petrol fuel switching, engine performance, and safety.",
    result: "Achieved 15% higher fuel efficiency, 20% reduced downtime, smoother engine performance, and improved reliability and safety.",
    images: ["\baja e.jpg"],
    tech: ['CAD', 'SOLIDWORKS', 'MATLAB'],
  },  
  {
    id: "jarvis ai",
    title: "Jarvis AI Assistant",
    tags: ['ALL','IT' ],
    shortDesc: " Voice-only AI assistant with a single input field that gives concise, one-line responses.",
    longDesc: "Developed an IoT-based smart agriculture system that monitors soil moisture, temperature, and humidity in real-time, and automates irrigation based on sensor data to optimize water usage and enhance crop yield.",
    challenge: "Designing a reliable sensor network for accurate data collection and implementing an efficient irrigation control system.",
    approach: "Utilized low-power sensors, microcontrollers, and cloud integration to collect data and automate irrigation based on predefined thresholds.",
    result: "Reduced water consumption by 30%, improved crop yield by 20%, and provided farmers with actionable insights through a user-friendly dashboard.",
    images: ["jarvis.jpg"],
    tech: ['IoT', 'Arduino', 'Cloud Computing'],

  }
  
];

export const skills = {
  programming: [
    { name: "Python", level: 70 },
    { name: "JavaScript/TypeScript", level: 65 },
    { name: "C/C++", level: 70 },
    { name: "Java", level: 60 },
  ],
  web: [
    { name: "React", level: 58 },
    { name: "Node.js", level: 52 },
    { name: "Tailwind CSS", level: 60 },
    { name: "Next.js", level: 65 },
  ],
  embedded: [
    { name: "Arduino", level: 75 },
    { name: "ESP32", level: 60 },
    { name: "STM32", level: 60 },
    { name: "Raspberry Pi", level: 65 },
  ],
  mechanical: [
    { name: "SolidWorks", level: 68 },
    { name: "AutoCAD", level: 75 },
    { name: "CATIA", level: 55 },
    { name: "ANSYS", level: 60 },
  ],
};

export const certifications = [
  {
    id: "Programming",
    title: "Python Programming",
    issuer: ('NSDC & Reliance Foundation'),
    date: "2025",
    image: "/placeholder.svg",
  },
  {
    id: "IOT",
    title: "IoT Specialist",
    issuer:('NSDC & Reliance Foundation') ,
    date: "2025",
    image: "/placeholder.svg",
  },
  {
    id: "AI",
    title: "Gemini Certification For Students (K12)" ,
    issuer: "google",
    date: "2025",
    image: "/placeholder.svg",
  },
  {
    id: "cybersecurity",
    title: "cybersecurity",
    issuer: ('NSDC & Tech Mahindra Foundation'),
    date: "2025",
    image: "/placeholder.svg",
  },
];

export const events = [
     {
    id: "FESTX-2025",
    title: "Guess Build Unlock 2025",
    date: "October 2025",
    description: "The Event promoted innovation and creativity among engineering students through various competitions .",
    achievement: "winner",
    
  },
  
   {
    title: "Hackintym'25 2.0",
    type: "Hackathon",
    date: "october,2025",
    location: "Chennai, India",
    description:"Participated in a national-level technical hackathon, developing innovative solutions for real-world engineering and technology challenges",
    achievement: "top 10 finalist",
  },
 
   {
    title: "Prompt-o-Mania",
    type: "Coding & prompt Competition",
    date: "April 2025",
    location: "Meenakshi Sundararajan Engineering College",
    description: "Competitive programming contest focusing on algorithms and data structures.",
    achievement: "Top 10",
  },
 
];

export const timeline = [
  {
    year: "2025-Present",
    title: "Full-Stack Developer Intern",
    company: "Tech Startup",
    description: "Building scalable web applications with React and Node.js",
  },
   {
    title: "SAE India H-Baja",
    type: "National Competition",
    year: "2025 - Present",
    location: "India",
    description: "Participating in the design and fabrication of off-road vehicles for SAE India H-Baja competition.",
    achievement: "Ongoing",
   },
  {
    year: "2024-Present",
    title: "Started B.E. in Mechanical Engineering",
    college: "Meenakshi Sundararajan Engineering College",
    description: "Pursuing core mechanical and also focus on the software development skills.",
  },
  {
    year: "2017-2024",
    title: "Completed Higher Secondary Education",
    school: "The Hindu Higher Secondary School",
    description: " A chapter filled with lessons, friendships, and growth that shaped my foundation for the future.",
  }
];
