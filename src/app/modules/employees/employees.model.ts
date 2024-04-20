export interface Employee {
  name: string;
  age: number;
  isFullTime: boolean;
  position: Position;
}

export enum Position {
  Junior = 'Junior',
  Mid = 'Mid',
  Senior = 'Senior',
  Manager = 'Manager'
}

