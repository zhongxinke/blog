export interface CoreFunction {
  name: string;
  package: string;
  children?: CoreFunction[];
}

export interface Package {
  dir: string;
}

export interface PackageIndexes {
  packages: Record<string, any>;
  functions: CoreFunction[];
}
