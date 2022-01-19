export interface locationInterface {
  name: string;
  description: "This is a default description of room number 1";
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

interface requirementsInterface {
  type: string;
  id: string;
}