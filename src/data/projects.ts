import bajaImage from "@/assets/baja-e.jpg";
import nsdcLogo from "@/assets/nsdc-logo.jpg";
import IOTImage from "@/assets/IOT.jpg";
import resumeImage from "@/assets/resume.png";
export interface Project {
  id: string;
  title: string;
  tags: string[];
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
    images: [bajaImage],
    tech: ['CAD', 'SOLIDWORKS', 'MATLAB'],
  },  
  {
    id: "jarvis ai",
    title: "Jarvis AI Assistant",
    tags: ['ALL','IT' ],
    shortDesc: " Voice-only AI assistant with a single input field that gives concise, one-line responses.",
    longDesc: "Developed an IoT-based  agriculture system that monitors soil moisture, temperature, and humidity in real-time, and automates irrigation based on sensor data to optimize water usage and enhance crop yield.",
    challenge: "Designing a reliable sensor network for accurate data collection and implementing an efficient irrigation control system.",
    approach: "Utilized low-power sensors, microcontrollers, and cloud integration to collect data and automate irrigation based on predefined thresholds.",
    result: "Reduced water consumption by 30%, improved crop yield by 20%, and provided farmers with actionable insights through a user-friendly dashboard.",
    images: [nsdcLogo],
    tech: ['Python', 'CSS', 'HTML', ],

  },
  {
    id: "IOT",
    title: " Distance measurement System",
    tags: ['ALL','Core' ],
    shortDesc: "An IoT-based system to measure distance accurately using sensors.",
    longDesc: "This project uses ultrasonic sensors and a microcontroller to measure and display distance in real time.",
    challenge: "Ensuring accurate distance measurement in varying environmental conditions.",
    approach: "Calibrated the sensor and optimized code for stable and precise measurements.",
    result: "The system successfully measured distances with good accuracy and reliability.",
    images: [IOTImage],
    tech: ["Arduino", "C++", "Sensors" ],
  },
  {
    id: "Resume-Analyzer",
    title: "Resume Analyzer",
    tags: ['ALL','IT' ],
    shortDesc: "A tool to analyze resumes and extract key information.",
    longDesc: "Developed a resume analyzer that extracts key information from resumes and provides insights for recruiters.",
    challenge: "Designing an efficient parsing algorithm and extracting relevant data from various resume formats.",
    approach: "Implemented a parsing algorithm using NLP techniques to extract key information from resumes.",
    result: "Successfully extracted key information from resumes with high accuracy and provided actionable insights for recruiters.",
    images: [resumeImage],
    tech: ['Python', 'LLM', 'Machine Learning'],
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
    { name: "Raspberry Pi", level: 65 },
  ],
  mechanical: [
    { name: "SolidWorks", level: 68 },
    { name: "AutoCAD", level: 75 },
    { name: "CATIA", level: 55 },
    { name: "ANSYS", level: 60 },
  ],
};

