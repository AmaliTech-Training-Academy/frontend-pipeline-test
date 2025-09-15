import { RolesEmun } from "@/lib/enums/roles";

export function setDemoData(email: string) {
  if (email === "manager@gmail.com") {
    return {
      id: "1",
      email: "admin@gmail.com",
      username: "manager",
      fullName: "Manager Demo",
      role: RolesEmun.FinanceManager,
      profilePicture: null,
    };
  } else if (email === "developer@gmail.com") {
    return {
      id: "1",
      email: "admin@gmail.com",
      username: "developer",
      fullName: "Developer Demo",
      role: RolesEmun.DevOpsEngineer,
      profilePicture: null,
    };
  } else if (email === "admin@gmail.com") {
    return {
      id: "1",
      email: "admin@gmail.com",
      username: "admin",
      fullName: "Admin Demo",
      role: RolesEmun.CTO_CIO,
      profilePicture: null,
    };
  }
  return null;
}

export function mockUserData() {
  return {
    id: "1",
    email: "admin@gmail.com",
    username: "manager",
    fullName: "Manager Demo",
    role: RolesEmun.FinanceManager,
    profilePicture: null,
  };
}
