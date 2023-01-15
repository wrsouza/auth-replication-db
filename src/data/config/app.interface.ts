export interface IDatabase {
  type: string;
  masterUrl: string;
  slaveUrl: string;
}

export interface IJwt {
  secret: string;
  expires: string;
}
