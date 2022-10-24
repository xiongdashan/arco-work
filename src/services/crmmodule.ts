export interface OpRefCustomersVo {
  name: string;
  value: string;
  owner: {
    user_name: string;
    department_name: string;
    ownerId: string;
  };
  ownerId: string;
  userName: string;
}

export interface SuplierVo {
  name: string;
  cid: string;
}
