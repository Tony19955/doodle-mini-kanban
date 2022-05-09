export interface TaskProps {
  tag: string,
  status: string,
  description: string,
  category: string,
  assignee: string,
  points: number
}

export interface ResponseTaskProps {
  id: string,
  tag: string,
  status: string,
  description: string,
  category: string,
  assignee: string,
  points: number
}