export type TimelineEntryType = "work" | "studies"

export interface TimelineEntry {
  id: string
  type: TimelineEntryType
  period: string
  title: string
  organization: string
}

export const TIMELINE_DATA: TimelineEntry[] = [
  {
    id: "studies-2019",
    type: "studies",
    period: "2019",
    title: "Tecnico en Programacion y Analisis de Sistemas",
    organization: "Inacap",
  },
  {
    id: "work-2020",
    type: "work",
    period: "2020",
    title: "Trainee",
    organization: "Pares&Alvarez",
  },
  {
    id: "work-2021",
    type: "work",
    period: "2021",
    title: "Developer",
    organization: "Pares&Alvarez",
  },
  {
    id: "studies-2022",
    type: "studies",
    period: "2022",
    title: "Bootcamp Full Stack JavaScript",
    organization: "Desafio Latam",
  },
  {
    id: "work-2023",
    type: "work",
    period: "2023",
    title: "Full Stack Developer",
    organization: "Pares&Alvarez",
  },
  {
    id: "work-2024",
    type: "work",
    period: "2024",
    title: "Full Stack Developer",
    organization: "Pares&Alvarez",
  },
  {
    id: "work-2025",
    type: "work",
    period: "2025",
    title: "Full Stack Developer",
    organization: "Pares&Alvarez",
  },
]
