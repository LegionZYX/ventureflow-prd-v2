export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'fa' | 'broker';
}

const DEMO_USER: User = {
  id: '1',
  email: 'admin@ventureflow.com',
  name: 'FA Admin',
  role: 'admin',
};

export function authenticate(email: string, password: string): User | null {
  if (email === 'admin@ventureflow.com' && password === 'admin123') {
    return DEMO_USER;
  }
  return null;
}

export function getSession(): User | null {
  if (typeof window === 'undefined') return null;
  try {
    const session = localStorage.getItem('vf_session');
    if (!session) return null;
    return JSON.parse(session);
  } catch {
    return null;
  }
}

export function setSession(user: User): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('vf_session', JSON.stringify(user));
}

export function clearSession(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('vf_session');
}

export function isAuthenticated(): boolean {
  return getSession() !== null;
}
