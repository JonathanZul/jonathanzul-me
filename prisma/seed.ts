import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Start seeding...')

  // 1. Define the Technologies first to ensure they exist
  // We map them to objects that Prisma can use to 'connect' or 'create'
  const techStack = [
    { name: 'Python' },
    { name: 'PyTorch' },
    { name: 'xarray' },
    { name: 'Dask' },
    { name: 'Computer Vision' },
    { name: 'YOLO' },
    { name: 'Segment Anything Model (SAM)' },
    { name: 'Next.js' },
    { name: 'React' },
    { name: 'Tailwind CSS' },
    { name: 'Sanity.io' },
    { name: 'TypeScript' },
  ]

  // Upsert technologies (create if not exists, do nothing if exists)
  for (const tech of techStack) {
    await prisma.technology.upsert({
      where: { name: tech.name },
      update: {},
      create: { name: tech.name },
    })
  }

  // 2. Define Projects with their specific technologies
  const projects = [
    {
      slug: 'deep-learning-weather-forecast',
      title: 'Deep Learning Weather Forecast',
      description:
        'A deep learning system built with PyTorch to forecast weather conditions using the massive ERA5 climate dataset. A key part of the project involved building an efficient data pipeline using xarray and Dask to handle and process the large-scale climate data for model training.',
      imageUrl: '/images/projects/weather-forecast.jpg', // Placeholder path
      githubUrl: 'https://github.com/yourusername/weather-project',
      liveUrl: null,
      technologies: ['Python', 'PyTorch', 'xarray', 'Dask'],
    },
    {
      slug: 'oyster-msx-detection',
      title: 'Oyster MSX Detection Pipeline',
      description:
        'A human-in-the-loop system to help pathologists diagnose MSX disease in oysters efficiently. Developed an end-to-end pipeline processing large histology images, segmenting tissue, and running a YOLO-based detector. Solved complex segmentation challenges using a hybrid approach with the Segment Anything Model (SAM).',
      imageUrl: '/images/projects/oyster-detection.jpg', // Placeholder path
      githubUrl: 'https://github.com/yourusername/oyster-project',
      liveUrl: null,
      technologies: ['Python', 'Computer Vision', 'YOLO', 'Segment Anything Model (SAM)'],
    },
    {
      slug: 'upei-climate-action',
      title: 'UPEI Climate Action Association',
      description:
        'The official website for the UPEI Climate Action Association. Designed and built from scratch to serve as the main hub for event info and member sign-ups. Features a modern component-based architecture and integration with a headless CMS (Sanity.io) for easy content management.',
      imageUrl: '/images/projects/upei-climate.jpg', // Placeholder path
      githubUrl: 'https://github.com/yourusername/upei-site',
      liveUrl: 'https://upei-climate-action.ca',
      technologies: ['Next.js', 'React', 'Tailwind CSS', 'Sanity.io'],
    },
  ]

  // 3. Upsert Projects and connect technologies
  for (const project of projects) {
    const { technologies, ...projectData } = project
    
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: {
        ...projectData,
        technologies: {
          deleteMany: {}, // Clear old connections to ensure fresh start
          create: technologies.map((tech) => ({
            technology: {
              connect: { name: tech },
            },
          })),
        },
      },
      create: {
        ...projectData,
        technologies: {
          create: technologies.map((tech) => ({
            technology: {
              connect: { name: tech },
            },
          })),
        },
      },
    })
  }

  console.log('Seeding finished.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })