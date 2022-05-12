export type DMCorn = string;

export interface YDMCornOptions {
  epoch?: number;
  machineId?: number;
  errorMessage?: string;
}

export interface YDMCornGenerateCustomIdOptions {
  timestamp: number;
  sequence: number;
}
