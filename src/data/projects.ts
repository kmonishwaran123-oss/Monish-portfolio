import bajaImage from "@/assets/baja-e.jpg";
import nsdcLogo from "@/assets/nsdc-logo.jpg";
import IOTImage from "@/assets/IOT.jpg";
import resumeImage from "@/assets/resume.jpeg";
import f1Image from "@/assets/f1.png";
import mscart from "@/assets/mscart.png";

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
    tech: ['Streamlit', 'LangChain', 'Ollama'],
  },
  {
    id: "F1-RoadMap tracker",
    title: "F1 RoadMap Tracker",
    tags: ['ALL','IT' ],
    shortDesc: "A tool to track and analyze F1 race data.",
    longDesc: "Developed a tool to track and analyze F1 race data, providing insights into driver performance and race strategies.",
    challenge: "Designing an efficient data analysis system and extracting meaningful insights from complex race data.",
    approach: "Implemented a data analysis system using Python and machine learning techniques to extract insights from F1 race data.",
    result: "Successfully analyzed F1 race data with high accuracy and provided actionable insights for teams and drivers.",
    images: [f1Image],
    tech: ['Python', 'Machine Learning', 'Data Analysis'],
  },
  {
    id: "MScart",
    title: "MScart",
    tags: ['ALL','IT' ],
    shortDesc: "An e-commerce platform for buying and selling products online.",
    longDesc: "Developed an e-commerce platform that allows users to buy and sell products online, providing a seamless shopping experience.",
    challenge: "Designing a user-friendly interface and implementing secure payment processing.",
    approach: "Implemented a user-friendly interface using React and integrated secure payment processing using Stripe.",
    result: "Successfully launched the e-commerce platform with a growing user base and positive feedback from customers.",
    images: [mscart],
    tech: ['React', 'Node.js', 'Stripe', 'MongoDB', 'Express', 'Tailwind CSS'],

  },

];

export const skills = {
  programming: [
    { name: "Python", level: 70 },
    { name: "C/C++", level: 70 },
    { name: "JavaScript/TypeScript", level: 65 },
    { name: "Java", level: 60 },
  ],
  web: [
    { name: "Next.js", level: 65 },
    { name: "Tailwind CSS", level: 60 },
    { name: "React", level: 58 },
    { name: "Node.js", level: 52 },
    
    
  ],
  embedded: [
    { name: "Arduino", level: 75 },
    { name: "ESP32", level: 70 },
    { name: "Raspberry Pi", level: 60},
    
  ],
  mechanical: [
    { name: "AutoCAD", level: 75 },
    { name: "SolidWorks", level: 65 },
     { name: "ANSYS", level: 60 },
    { name: "CATIA", level: 55 },
  ],
};

