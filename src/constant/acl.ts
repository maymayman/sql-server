export interface ACL {
  [key:string]: { 
    read: boolean; 
    write: boolean; 
    delete: boolean;
  }
};

export const aclDefault: ACL = {
  public: {
    read: true,
    write: true, 
    delete: true,
  }
};