export enum Roles {
    SuperAdmin = 'super-admin',
    Admin = 'admin',
    CRM = 'crm',
    Investor = "investor",
    Marketer = "marketer",
}

export const isSuperAdmin = (role: Roles): boolean => {
    const roles: Roles[] = [Roles.SuperAdmin]
    return roles.includes(role)
}

export const isAdmin = (role: Roles): boolean => {
    const roles: Roles[] = [Roles.Admin]
    return roles.includes(role)
}

export const isCRM = (role: Roles): boolean => {
    const roles: Roles[] = [Roles.CRM]
    return roles.includes(role)
}

export const isInvestor = (role: Roles): boolean => {
    const roles: Roles[] = [Roles.Investor]
    return roles.includes(role)
}
export const isMarketer = (role: Roles): boolean => {
    const roles: Roles[] = [Roles.Marketer]
    return roles.includes(role)
}
export const isInvestorMarketer = (role: Roles): boolean => {
    const roles: Roles[] = [Roles.Investor, Roles.Marketer]
    return roles.includes(role)
}

export const isCustomRole = (role: Roles, roles: Roles[]) => {
    return roles.includes(role)
}
