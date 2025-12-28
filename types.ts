
export enum TaskStatus {
  PENDING = 'PENDING',
  COLLECTING = 'COLLECTING',
  VALIDATING = 'VALIDATING',
  COMPLETED = 'COMPLETED',
  REJECTED = 'REJECTED'
}

// Added ProjectStatus enum for automation pipelines
export enum ProjectStatus {
  IDLE = 'IDLE',
  RUNNING = 'RUNNING',
  WAITING_APPROVAL = 'WAITING_APPROVAL',
  COMPLETED = 'COMPLETED',
  ERROR = 'ERROR'
}

export interface MonographTask {
  id: string;
  title: string;
  block: 'GLOBAL_INDICES' | 'HEALTH' | 'MORALITY' | 'INTELLECT' | 'PHILOSOPHY' | 'DYNAMICS';
  status: TaskStatus;
  perplexityPrompt: string;
  progress: number;
}

// Added Workflow interface for automation pipelines
export interface Workflow {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  lastRun: string;
  progress: number;
}

export interface ConsiliumResult {
  consensusScore: number; // 0.0 - 1.0
  verifiedFacts: string[];
  contradictions: string[];
  draftText: string;
  sources: string[];
}
