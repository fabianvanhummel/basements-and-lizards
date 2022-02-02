export interface locationInterface {
  name: string;
  description: string;
  paths: pathsInterface[];    
  override: overrideInterface[];
  events: string[];
}

interface pathsInterface {
  toLocationId: string;
  name: string;
  description: string;
  requirements: string[];
}

interface overrideInterface {
  byLocationId: string;
  requirements: requirementsInterface[];
}

export interface requirementsInterface {
  type: string;
  id: string;
}
