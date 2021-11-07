export interface PCL {
  find: {
    requiresAuthentication: boolean;
    [key: string]: boolean;
  },
  get: {
    requiresAuthentication: boolean;
    [key: string]: boolean;
  },
  create: { 
    requiresAuthentication: boolean;
    [key: string]: boolean; },
  update: { 
    requiresAuthentication: boolean;
    [key: string]: boolean; },
  delete: { 
    requiresAuthentication: boolean;
    [key: string]: boolean; 
  }
};

export const pclDefault: PCL = {
  find: {
    requiresAuthentication: false
  },
  get: {
    requiresAuthentication: false
  },
  create: { 
    requiresAuthentication: false
  },
  update: { 
    requiresAuthentication: false
  },
  delete: { 
    requiresAuthentication: false
  }
};
