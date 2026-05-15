import { Injectable, signal, computed } from '@angular/core';
import {
  Profile,
  Stat,
  Skill,
  Experience,
  Project,
  Certification,
  NavLink,
  HoloBar,
  ContactInfo,
} from '../models';

@Injectable({
  providedIn: 'root',
})
export class PortfolioData {
  // ── PROFILE ──────────────────────────────────────────────────────────────
 readonly profile = signal<Profile>({
  name: 'ELMEHDI EL KALAKHI',
  firstName: 'ELMEHDI',
  lastName: 'EL KALAKHI',
  title: 'profile.title',
  subtitle: 'profile.subtitle',
  description: 'profile.description',
  email: 'elmehdi.elkalakhi@gmail.com',
  linkedin: 'www.linkedin.com/in/elmehdi-el-kalakhi-98aab5203/',
  github: 'github.com/elkalakhi',
  available: false,
  initials: 'AM',
  id: '1.0.0',
  image: 'profile/elmehdi.png',
});

  // ── NAVIGATION ────────────────────────────────────────────────────────────
  readonly navLinks = signal<NavLink[]>([
  { label: 'nav.about',           fragment: 'about' },
  { label: 'nav.experience',      fragment: 'experience' },
  { label: 'nav.projects',        fragment: 'projects' },
  { label: 'nav.skills',          fragment: 'skills' },
  { label: 'nav.certifications',  fragment: 'certifications' },
  { label: 'nav.contact',         fragment: 'contact' },
]);

  private readonly startDate = new Date(2023, 4, 1);
  private readonly yearsExp = Math.floor(
    (new Date().getTime() - this.startDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25),
  );

 readonly stats = signal<Stat[]>([
  { value: this.yearsExp, label: 'stats.experience', suffix: '+' },
  { value: 30,            label: 'stats.projects',   suffix: '+' },
  { value: 3,             label: 'stats.education',  suffix: '' },
]);

  // ── HOLO BARS ─────────────────────────────────────────────────────────────
  readonly holoBars = signal<HoloBar[]>([
    { label: 'Backend', percentage: 95, colorClass: 'b1' },
    { label: 'Frontend', percentage: 65, colorClass: 'b2' },
    { label: 'DevOps', percentage: 40, colorClass: 'b3' },
    { label: 'Cloud', percentage: 20, colorClass: 'b4' },
    { label: 'Security', percentage: 30, colorClass: 'b5' },
  ]);

  // ── SKILLS ────────────────────────────────────────────────────────────────
  readonly skills = signal<Skill[]>([
    { id: 's1', name: 'Java', icon: 'java.png', level: 95, category: 'backend' },
    { id: 's2', name: 'Spring Boot', icon: 'spring.png', level: 92, category: 'backend' },
    { id: 's3', name: 'Angular', icon: 'angular.jpg', level: 85, category: 'frontend' },
    { id: 's4', name: 'React', icon: 'react.png', level: 88, category: 'frontend' },
    { id: 's5', name: 'Docker', icon: 'docker.png', level: 90, category: 'devops' },
    { id: 's6', name: 'Redis', icon: 'redis.png', level: 80, category: 'database' },
    { id: 's7', name: 'PostgreSQL', icon: 'postgresql.png', level: 88, category: 'database' },
    { id: 's8', name: 'Git', icon: 'git.jpg', level: 95, category: 'devops' },
    { id: 's9', name: 'Linux', icon: 'linux.png', level: 87, category: 'tools' },
    { id: 's10', name: 'MinIo', icon: 'minio.png', level: 78, category: 'cloud' },
    { id: 's11', name: 'TypeScript', icon: 'ts.png', level: 86, category: 'frontend' },
    { id: 's12', name: 'alfresco', icon: 'alfresco.png', level: 82, category: 'tools' },
  ]);

  // ── COMPUTED: skills by category ──────────────────────────────────────────
  readonly skillCategories = computed(() => {
    const allSkills = this.skills();
    const categories = [...new Set(allSkills.map((s) => s.category))];
    return categories.map((cat) => ({
      name: cat,
      skills: allSkills.filter((s) => s.category === cat),
    }));
  });

  // ── EXPERIENCE ────────────────────────────────────────────────────────────
  readonly experiences = signal<Experience[]>([
    {
      id: 'e1',
      company: 'Exia Technologies',
      role: 'experience.experiences.0.role',
      period: 'experience.experiences.0.period',
      projects: [
        {
          id: '1',
          title: 'experience.experiences.0.projects.0.title',
          description: 'experience.experiences.0.projects.0.description',
          icon: 'company/exia.png',
          status: 'client',
          technologies: [
            'Java',
            'Spring Boot',
            'Angular',
            'Kafka',
            'MongoDB',
            'PostgreSQL',
            'Flyway',
          ],
          mission: ['experience.experiences.0.projects.0.mission'],
          liveUrl: '',
          githubUrl: '',
          featured: true,
        },
        {
          id: '2',
          title: 'experience.experiences.0.projects.1.title',
          description: 'experience.experiences.0.projects.1.description',
          icon: 'company/exia.png',
          status: 'intern',
          technologies: ['Java', 'Spring Boot', 'Keycloak', 'PostgreSQL'],
          mission: ['experience.experiences.0.projects.1.mission'],
          liveUrl: '',
          githubUrl: '',
          featured: true,
        },
        {
          id: '3',
          title: 'experience.experiences.0.projects.2.title',
          description: 'experience.experiences.0.projects.2.description',
          icon: 'company/exia.png',
          status: 'client',
          technologies: ['Java', 'Spring Boot', 'Kafka', 'MongoDB', 'PostgreSQL', 'MinIO'],
          mission: ['experience.experiences.0.projects.2.mission'],
          liveUrl: '',
          githubUrl: '',
          featured: true,
        },
        {
          id: '4',
          title: 'experience.experiences.0.projects.3.title',
          description: 'experience.experiences.0.projects.3.description',
          icon: 'company/exia.png',
          status: 'client',
          technologies: ['Java', 'Spring Boot', 'Kafka', 'MongoDB', 'PostgreSQL', 'MinIO'],
          mission: ['experience.experiences.0.projects.3.mission'],
          liveUrl: '',
          githubUrl: '',
          featured: true,
        },
        {
          id: '5',
          title: 'Plateforme E-commerce B2B — Distribution Automobile',
          description: 'experience.experiences.0.projects.4.description',
          icon: 'company/exia.png',
          status: 'client',
          technologies: ['Java', 'Spring Boot', 'PostgreSQL', 'Redis', 'MinIO', 'Loki', 'Grafana'],
          mission: ['experience.experiences.0.projects.4.mission'],
          liveUrl: '',
          githubUrl: '',
          featured: true,
        },
      ],
      type: 'experience.experiences.0.type',
    },
    {
      id: 'e2',
      company: 'SIHATY-HITECH',
      role: 'experience.experiences.1.role',
      period: 'experience.experiences.1.period',
      projects: [
        {
          id: '1',
          title: 'experience.experiences.1.projects.0.title',
          description: 'experience.experiences.1.projects.0.description',
          icon: 'company/sihaty.jpg',
          status: 'intern',
          technologies: ['Java', 'Spring Boot', 'Angular', 'MySQL', 'MongoDB', 'Redis'],
          mission:  ['experience.experiences.1.projects.0.mission'],
          liveUrl: '',
          githubUrl: '',
          featured: true,
        },
      ],
      type: 'experience.experiences.1.type',
    },
  ]);

  // ── PROJECTS ──────────────────────────────────────────────────────────────
  readonly projects = signal<Project[]>([
    {
      id: 'p1',
      title: 'ParcLoc',
      description:'projects.items.0.description',
      icon: 'projects/parc-loc.png',
      status: 'projects.items.0.tag',
      technologies: ['Java 21', 'Spring Cloud', 'Angular', 'PostgreSQL', 'Redis', 'AWS'],
      mission: [],
      liveUrl: '',
      githubUrl: '',
      featured: true,
    },
    {
      id: 'p2',
      title: 'AIHub',
      description:'projects.items.1.description',
      icon: 'projects/ia-hub.png',
      status: 'projects.items.1.tag',
      technologies: ['Kubernetes', 'Docker', 'React', 'Spring Boot', 'Prometheus'],
      mission: [],
      liveUrl: '',
      githubUrl: '',
      featured: true,
    },
    {
      id: 'p3',
      title: 'CodeDelta',
      description:'projects.items.2.description',
      icon: 'projects/code-delta.png',
      status: 'projects.items.2.tag',
      technologies: ['Docker', 'Angular', 'Spring Boot'],
      mission: [],
      liveUrl: '',
      githubUrl: '',
      featured: true,
    },
  ]);

  // ── CERTIFICATIONS ────────────────────────────────────────────────────────
  readonly certifications = signal<Certification[]>([
    {
      id: 'c1',
      title: 'education.items.0.degree',
      description: 'education.items.0.institution',
      date: 'education.items.0.period',
      icon: 'education/enset_mohammedia.png',
      badgeVariant: 'gold',
      lifetime: true,
    },
    {
      id: 'c2',
      title: 'education.items.1.degree',
      description: 'education.items.1.institution',
      date: 'education.items.1.period',
      icon: 'education/fst.png',
      badgeVariant: 'blue',
      lifetime: true,
    },
    {
      id: 'c3',
      title: 'education.items.2.degree',
      description: 'education.items.2.institution',
      date: 'education.items.2.period',
      icon: 'education/ofppt.png',
      badgeVariant: 'purple',
      lifetime: true,
    },
  ]);

  // ── CONTACT INFO ──────────────────────────────────────────────────────────
  readonly contactInfoList = computed<ContactInfo[]>(() => {
    const p = this.profile();
    return [
      { icon: 'contact/email.png', label: 'Email', value: p.email, href: `mailto:${p.email}` },
      {
        icon: 'contact/linkedin.png',
        label: 'LinkedIn',
        value: p.linkedin,
        href: `https://${p.linkedin}`,
      },
      { icon: 'contact/github.png', label: 'GitHub', value: p.github, href: `https://${p.github}` },
    ];
  });
}
