import {
  AwardIcon,
  GraduationCapIcon,
  BriefcaseIcon,
  LandmarkIcon,
  BookOpenIcon,
  ScaleIcon } from
'lucide-react';

export const person = {
  name: 'David L. Adebayo',
  initials: 'DA',
  title: 'Dedicated Civil Servant',
  headline: 'Integrity, Accountability & Equity',
  email: 'office@davidadebayo.gov',
  phone: '+1 (202) 555-0147',
  location: 'Washington, D.C.'
};

export const images = {
  hero: "/04f2be64-c371-46c3-8dd4-4b39bfe648d0.jpg",
  bio: "/99ddcded-d2b9-4f7a-bdd7-a74a7a58c212.jpg",
  banner: "/6c724452-ba16-48a7-a908-e7e55e3cfaa0.jpg"
};

export const navLinks = [
{ label: 'Home', href: '#home' },
{ label: 'Featured', href: '#featured' },
{ label: 'Bio', href: '#bio' },
{ label: 'Awards', href: '#awards' },
{ label: 'Education', href: '#education' },
{ label: 'Projects', href: '#projects' },
{ label: 'Contact', href: '#contact' }];

export type NavLink = {label: string;href: string;};
export type NavItem = NavLink | {label: string;children: NavLink[];};

export const headerNav: NavItem[] = [
{ label: 'Home', href: '#home' },
{ label: 'Featured', href: '#featured' },
{
  label: 'Experience',
  children: [
  { label: 'Bio', href: '#bio' },
  { label: 'Awards', href: '#awards' },
  { label: 'Education', href: '#education' },
  { label: 'Projects', href: '#projects' }]

},
{ label: 'Contact', href: '#contact' }];


export const featuredItems = [
{
  title: 'Professional Certificates & Awards',
  subtitle: 'Achievements',
  description:
  'Recognized nationally for advancing transparent governance, fiscal stewardship, and equitable public service delivery.',
  icon: AwardIcon,
  href: '#awards'
},
{
  title: 'Educational Institutions Attended',
  subtitle: 'Learned',
  description:
  'Trained in public policy, law, and administration at institutions committed to rigorous scholarship and civic duty.',
  icon: GraduationCapIcon,
  href: '#education'
},
{
  title: 'Professional Experiences',
  subtitle: 'Professionalism',
  description:
  'Over two decades leading federal agencies, interagency task forces, and reform programs that serve millions.',
  icon: BriefcaseIcon,
  href: '#projects'
}];


export const bio = {
  quote:
  'Public trust is earned in the quiet moments — in every decision made fairly, and every promise kept.',
  paragraph:
  'David L. Adebayo is a senior executive with more than twenty years of service across federal and municipal government. He has led agency-wide modernization efforts, championed open-data initiatives, and built teams grounded in fairness and accountability. His work focuses on making public institutions more responsive, more transparent, and more equitable for the communities they serve. Outside the office, he mentors emerging public leaders and serves on the boards of two civic nonprofits.'
};

export const awards = [
{
  title: 'Presidential Rank Award for Distinguished Executive Service',
  year: '2023'
},
{
  title: 'National Academy of Public Administration Fellowship',
  year: '2021'
},
{
  title: 'Excellence in Government Transparency Award',
  year: '2019'
},
{
  title: 'Certified Public Manager — Senior Executive Program',
  year: '2016'
}];


// Professional Certificates carousel. Swap `src` / `alt` for your own photos in /public/certificates.
export const certificates = [
{
  src: '/certificates/ansicta-award-of-honour.jpg',
  alt: 'ANSICTA Award of Honour plaque for outstanding achievements in driving the digital economy, 2020'
},
{
  src: '/certificates/ims-uk-fellowship-award.jpg',
  alt: 'Institute of Management Specialists UK Fellowship Award crystal plaque'
},
{
  src: '/certificates/nitda-local-content-award.jpg',
  alt: 'Local Content Award crystal trophy, June 2021'
},
{
  src: '/certificates/muryar-talaka-leadership-award.jpg',
  alt: 'Muryar Talaka Awareness Initiative Leadership Award certificate, February 2021'
},
// Placeholders — replace with two more certificate photos.
{
  src: '/certificates/ansicta-award-of-honour.jpg',
  alt: 'Certificate placeholder'
},
{
  src: '/certificates/ims-uk-fellowship-award.jpg',
  alt: 'Certificate placeholder'
}];


export const education = [
{
  id: 'kennedy',
  tab: 'School of Public Policy',
  institution: 'Harrington School of Public Policy',
  degree: 'Master of Public Administration',
  years: '2004 — 2006',
  summary:
  'Concentration in public management and budgeting. Graduated with honors; capstone on performance-based budgeting for federal agencies.',
  image: "/0e2a6747-8c13-415e-92dd-6c000dce2854.jpg",
  icon: LandmarkIcon
},
{
  id: 'law',
  tab: 'College of Law',
  institution: 'Whitmore College of Law',
  degree: 'Juris Doctor',
  years: '2000 — 2003',
  summary:
  'Focus on administrative and constitutional law. Senior editor of the Law Review and member of the Public Interest Clinic.',
  image: "/8e793960-3b63-4b4b-bace-b1adada14f2d.jpg",
  icon: ScaleIcon
},
{
  id: 'undergrad',
  tab: 'State University',
  institution: 'Fairmont State University',
  degree: 'B.A. Political Science & Economics',
  years: '1996 — 2000',
  summary:
  'Graduated magna cum laude. Student government president and founder of the campus civic engagement society.',
  image: "/c71dfe42-2c6a-494e-98e5-4a932a615021.jpg",
  icon: BookOpenIcon
}];


export const projectCategories = [
'Digital Services',
'Infrastructure',
'Policy & Regulation',
'Capacity Building'] as
const;

export type ProjectCategory = (typeof projectCategories)[number];

export type Project = {
  title: string;
  category: ProjectCategory;
  client: string;
  year: string;
  description: string;
  // Optional project photo or client logo. Without one, the card shows a category icon.
  image?: string;
  href?: string;
};

// Placeholder projects — replace titles, clients, years and descriptions with your own.
export const projects: Project[] = [
{
  title: 'Unified e-Government Services Portal',
  category: 'Digital Services',
  client: 'Office of the Head of Service',
  year: '2019',
  description:
  'A single online gateway bringing 120+ public services together, with one citizen login and real-time application tracking.'
},
{
  title: 'Government Data Centre Modernisation',
  category: 'Infrastructure',
  client: 'National Data Centre Authority',
  year: '2017',
  description:
  'Upgraded a Tier III government data centre and migrated 40 agency systems to shared, secure cloud hosting.'
},
{
  title: 'National Data Protection Framework',
  category: 'Policy & Regulation',
  client: 'Data Protection Commission',
  year: '2021',
  description:
  'Drafted the regulatory framework and compliance guidelines that set data privacy standards for public and private bodies.'
},
{
  title: 'Digital Skills for Civil Servants',
  category: 'Capacity Building',
  client: 'Public Service Institute',
  year: '2020',
  description:
  'A blended training programme that equipped 25,000 civil servants with digital literacy and e-governance skills.'
},
{
  title: 'Statewide Broadband Backbone',
  category: 'Infrastructure',
  client: 'State ICT Development Agency',
  year: '2018',
  description:
  'Laid 1,200 km of fibre connecting ministries, hospitals and schools across 23 local government areas.'
},
{
  title: 'Digital Revenue Collection Platform',
  category: 'Digital Services',
  client: 'State Internal Revenue Service',
  year: '2022',
  description:
  'Moved tax and levy payments online with instant receipts, raising collections and cutting cash handling at revenue offices.'
}];


export const testimonialsImage = '/testimonials-crowd.jpg';

// Placeholder testimonials — replace with real quotes, names and roles before publishing.
export const testimonials = [
{
  quote:
  'Their team turned a decade-old paper process into a service our citizens can use from their phones. Delivery was on time and every step was transparent.',
  name: 'Placeholder Name',
  role: 'Permanent Secretary, Partner Ministry'
},
{
  quote:
  'What stood out was the commitment to training our own staff. Two years on, we run the platform ourselves with confidence.',
  name: 'Placeholder Name',
  role: 'Director of ICT, State Agency'
},
{
  quote:
  'A partner that listens first. The policy framework they helped us draft is now the reference point for the whole sector.',
  name: 'Placeholder Name',
  role: 'Head of Regulation, Government Commission'
}];


// Contact Information section. Replace with your real details.
// mapEmbedUrl: paste the URL from Google Maps → Share → Embed a map (the iframe's src).
// Leave it empty to build a free, keyless embed from `address` automatically.
export const contact = {
  address: person.location,
  phone: person.phone,
  email: person.email,
  mapEmbedUrl: ''
};
