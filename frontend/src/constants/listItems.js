import { ICONS, IMAGES } from '../configs';
export const headerList = [
    {
        name: 'About',
        value: 'about',
        to: 'section1'
    },
    {
        name: 'Skill',
        value: 'skill',
        to: 'section2',
    },
    {
        name: 'Experience',
        value: 'experience',
        to: 'section3'
    },
    {
        name: 'Portfolio',
        value: 'portfolio',
        to: 'section4'
    },

];

export const contactList = [
    {
        icon: ICONS.W_LINKEDIN,
        value: 'linkedin',
        title: 'Follow me on Linkedin',
        url: 'https://www.linkedin.com/in/cosmoas/'
    },
    {
        icon: ICONS.W_GITHUB,
        value: 'github',
        title: 'Follow me on Github',
        url: 'https://github.com/cosmoas13'
    },
    {
        icon: ICONS.W_INSTAGRAM,
        value: 'instagram',
        title: 'Follow me on Instagram',
        url: 'https://www.instagram.com/cosmoas13/'
    },
];

export const aboutList = [
    {
        name: 'FULLNAME:',
        value: 'Kevin'
    },
    {
        name: 'EMAIL:',
        value: 'cosmoas13@gmail.com'
    },
    {
        name: 'PHONE:',
        value: '+62 896 0872 7198'
    },
    {
        name: 'ADDRESS:',
        value: 'Ciputat, South Tangerang'
    },
];

export const skillList = [
    {
        name: 'Node.js',
        value: 'nodejs',
        icon: IMAGES.NODEJS
    },
    {
        name: 'React',
        value: 'react',
        icon: IMAGES.REACT
    },
    {
        name: 'GitHub',
        value: 'github',
        icon: IMAGES.GITHUB
    },
    {
        name: 'Git',
        value: 'git',
        icon: IMAGES.GIT
    },
    {
        name: 'Material-UI',
        value: 'mui',
        icon: IMAGES.MATERIALUI
    },
    {
        name: 'Bootstrap',
        value: 'boostrap',
        icon: IMAGES.BOOTSTRAP
    },
    {
        name: 'Tailwind',
        value: 'tailwind',
        icon: IMAGES.API_RESTFUL
    },
];

export const workList = [
    {
        name: 'CODEX',
        role: 'Basic Front End Developer',
        since: 'Jun 2020 - Present',
        description: `CODEX is the official recruiter to support the DXB (Digital and Next Business) Department to change Telkom Indonesia from Telco Company to Digital Telco Company. We believe that good quality product starts from good quality people, are you one of good-quality-people? Let's digitize the nation with Telkom Indonesia, join now: www.codex.works`,
        icon: ICONS.CODEX
    },
    {
        name: 'UMeetMe',
        role: 'Front End Web Developer',
        since: 'Jun 2020 - Present',
        description: 'Video meeting application made in Indonesia that can be used for teaching and learning activities, virtual meetings, and daily activities. UMeetMe, the seamless video communication solution',
        icon: ICONS.UMEETME
    },
    {
        name: 'Maitreyawira School',
        role: 'Internship as Programmer',
        since: 'Mar 2018 - Jun 2018',
        description: 'The pioneering of Maitreyawira Palembang School which is under the auspices of the Cahaya Maitreya Palembang Foundation began with a sincere intention to aspire to establish a school that will be able to educate the younger generation to have noble character and personality.',
        icon: ICONS.MAITREYAWIRA
    },
];

export const projectList = [
    {
        name: 'UMeetMe Vertical',
        description: `Assist in the development of features found in UMeetMe Vertical, API integration, figma design implementation`,
        icon: ICONS.UMEETME,
        urlData: 'https://umeetme.id/'
    },
    {
        name: 'UMeetMe API - FAB',
        description: `added new features such as pagination, displaying data, responsive display, and API integration in the UMeetMe FAB project`,
        icon: ICONS.UMEETME,
        urlData: 'https://developers.umeetme.id/'
    },
    {
        name: 'UMeetMe Whitelabel',
        description: 'Helping UMeetMe Clients to develop and implement the Meeting API into a video conference website',
        icon: ICONS.WHITELABEL,
        urlData: 'https://whitelabel-poc.umeetme.id/'
    },
];

export const personalList = [
    {
        name: 'Coronas19',
        description: 'This website aims to be used in checking and tracking the spread of the COVID-19 virus, created using React.js and the neumorphism style',
        icon: ICONS.ICO_CORONA,
        urlData: 'https://coronas19.netlify.app/'
    },
    {
        name: 'Tilawah Quran',
        description: 'a website that is intended to display the suras contained in the Al-Quran, created and developed using React.js, Tailwind',
        icon: ICONS.ICO_QURAN,
        urlData: 'https://tilawah-quran.netlify.app/'
    },
    {
        name: 'Tiket Tiket',
        description: 'Tiket Tiket is an application that provides train tickets booking service, developed and built using Express.js, MySQL, and Sequileze ORM for Backend, React.js, Material-UI, Axios and Redux for Frontend',
        icon: ICONS.ICO_TICKET,
        urlData: '#'
    },
];

export const educationList = [
    {
        title: 'PT. DumbWays Indonesia Teknologi',
        role: 'Fullstack Javascript',
        job: 'Talent',
        since: 'Feb 2020 - Mar 2020',
        detail: 'Learn Express.js, React.js, and Axios',
        icon: ICONS.DUMBWAYS,
    },
    {
        title: 'Universitas MDP',
        role: 'Teknik Informatika',
        job: 'S1',
        since: 'Sep 2015 - Mar 2019',
        detail: 'Data Structure, Algorithms & Coding',
        icon: ICONS.MDP,
    },
];
