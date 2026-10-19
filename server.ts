import express, { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import dotenv from 'dotenv';
import { initialPortfolioData } from './src/data/initialData.ts';
import { ContactMessage, PortfolioData, Project } from './src/types/portfolio.ts';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const IS_PROD = process.env.NODE_ENV === 'production';

// Ensure data directory exists
const DATA_DIR = path.resolve(process.cwd(), 'data');
const PORTFOLIO_FILE = path.join(DATA_DIR, 'portfolio-data.json');
const MESSAGES_FILE = path.join(DATA_DIR, 'messages.json');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initialize portfolio data if not present
function getPortfolioData(): PortfolioData {
  try {
    if (fs.existsSync(PORTFOLIO_FILE)) {
      const content = fs.readFileSync(PORTFOLIO_FILE, 'utf-8');
      return JSON.parse(content) as PortfolioData;
    }
  } catch (err) {
    console.error('Error reading portfolio data file:', err);
  }
  // Initialize with defaults
  savePortfolioData(initialPortfolioData);
  return initialPortfolioData;
}

function savePortfolioData(data: PortfolioData): boolean {
  try {
    fs.writeFileSync(PORTFOLIO_FILE, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error writing portfolio data file:', err);
    return false;
  }
}

function getMessages(): ContactMessage[] {
  try {
    if (fs.existsSync(MESSAGES_FILE)) {
      const content = fs.readFileSync(MESSAGES_FILE, 'utf-8');
      return JSON.parse(content) as ContactMessage[];
    }
  } catch (err) {
    console.error('Error reading messages file:', err);
  }
  return [];
}

function saveMessages(messages: ContactMessage[]): boolean {
  try {
    fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messages, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error writing messages file:', err);
    return false;
  }
}

// Session store for owner authorization
interface Session {
  token: string;
  expiresAt: number;
}
const activeSessions = new Map<string, Session>();

// Rate-limiting for auth attempts
interface FailedAttempt {
  count: number;
  firstAttempt: number;
  lockedUntil?: number;
}
const loginAttempts = new Map<string, FailedAttempt>();

// Middleware to parse JSON
app.use(express.json({ limit: '10mb' }));

// Auth middleware for protected routes
function requireAuth(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Unauthorized: Missing or invalid authentication token.' });
    return;
  }

  const token = authHeader.substring(7).trim();
  const session = activeSessions.get(token);

  if (!session) {
    res.status(401).json({ error: 'Unauthorized: Session invalid or expired.' });
    return;
  }

  if (Date.now() > session.expiresAt) {
    activeSessions.delete(token);
    res.status(401).json({ error: 'Unauthorized: Session has expired. Please log in again.' });
    return;
  }

  // Extend session on active use
  session.expiresAt = Date.now() + 24 * 60 * 60 * 1000;
  next();
}

// Public API: Get Portfolio Data
app.get('/api/portfolio', (_req: Request, res: Response) => {
  const data = getPortfolioData();
  res.json(data);
});

// Public API: Contact Form Submission
app.post('/api/contact', (req: Request, res: Response) => {
  const { name, email, subject, message, honeypot } = req.body;

  // Spam prevention honeypot
  if (honeypot) {
    res.status(400).json({ error: 'Invalid submission detected.' });
    return;
  }

  // Validation
  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    res.status(400).json({ error: 'Please provide a valid name.' });
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
    res.status(400).json({ error: 'Please provide a valid email address.' });
    return;
  }

  if (!subject || typeof subject !== 'string' || subject.trim().length < 2) {
    res.status(400).json({ error: 'Please provide a message subject.' });
    return;
  }

  if (!message || typeof message !== 'string' || message.trim().length < 5) {
    res.status(400).json({ error: 'Message must be at least 5 characters long.' });
    return;
  }

  const newMessage: ContactMessage = {
    id: 'msg_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
    name: name.trim().slice(0, 100),
    email: email.trim().slice(0, 150),
    subject: subject.trim().slice(0, 200),
    message: message.trim().slice(0, 5000),
    createdAt: new Date().toISOString(),
    read: false
  };

  const messages = getMessages();
  messages.unshift(newMessage);
  saveMessages(messages);

  console.log(`[Contact Form] New message from ${newMessage.name} (${newMessage.email}): ${newMessage.subject}`);

  res.status(200).json({
    success: true,
    messageId: newMessage.id,
    message: 'Your message has been safely received. Mangal Kant will get back to you shortly.'
  });
});

// Admin Authentication: Login
app.post('/api/auth/login', (req: Request, res: Response) => {
  const clientIp = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || 'unknown';
  const now = Date.now();

  // Check rate limit
  const attempt = loginAttempts.get(clientIp);
  if (attempt && attempt.lockedUntil && attempt.lockedUntil > now) {
    const minutesRemaining = Math.ceil((attempt.lockedUntil - now) / 60000);
    res.status(429).json({
      error: `Too many failed attempts. Temporary lockout active. Try again in ${minutesRemaining} minute(s).`
    });
    return;
  }

  const { password } = req.body;
  const configuredPassword = process.env.ADMIN_PASSWORD || 'orbit-mangal-2026!';

  if (!password || typeof password !== 'string') {
    res.status(400).json({ error: 'Password is required.' });
    return;
  }

  // Constant-time comparison to prevent timing attacks
  const bufA = Buffer.from(password);
  const bufB = Buffer.from(configuredPassword);
  const isValid = bufA.length === bufB.length && crypto.timingSafeEqual(bufA, bufB);

  if (!isValid) {
    // Record failure
    const current = loginAttempts.get(clientIp) || { count: 0, firstAttempt: now };
    current.count += 1;
    if (current.count >= 5) {
      current.lockedUntil = now + 15 * 60 * 1000; // 15 min lock
      console.warn(`[Security] IP ${clientIp} locked out after 5 consecutive failed login attempts.`);
    }
    loginAttempts.set(clientIp, current);

    res.status(401).json({ error: 'Invalid administrator password.' });
    return;
  }

  // Reset attempt count on success
  loginAttempts.delete(clientIp);

  // Generate secure token
  const token = crypto.randomBytes(32).toString('hex');
  const expiresAt = now + 24 * 60 * 60 * 1000; // 24 hours

  activeSessions.set(token, { token, expiresAt });

  res.json({
    success: true,
    token,
    expiresAt,
    user: {
      role: 'owner',
      name: 'Mangal Kant'
    }
  });
});

// Admin Authentication: Verify Session
app.get('/api/auth/verify', requireAuth, (_req: Request, res: Response) => {
  res.json({ valid: true, role: 'owner' });
});

// Admin Authentication: Logout
app.post('/api/auth/logout', requireAuth, (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7).trim();
    activeSessions.delete(token);
  }
  res.json({ success: true, message: 'Logged out successfully.' });
});

// Protected: Update Entire Portfolio Data
app.put('/api/portfolio', requireAuth, (req: Request, res: Response) => {
  const updatedData = req.body as PortfolioData;
  if (!updatedData || !updatedData.profile || !updatedData.projects) {
    res.status(400).json({ error: 'Invalid portfolio data payload.' });
    return;
  }
  savePortfolioData(updatedData);
  res.json({ success: true, message: 'Portfolio successfully updated.', data: updatedData });
});

// Protected: Update Projects Array (Reordering, batch changes)
app.put('/api/portfolio/projects', requireAuth, (req: Request, res: Response) => {
  const { projects } = req.body;
  if (!Array.isArray(projects)) {
    res.status(400).json({ error: 'Projects must be an array.' });
    return;
  }

  const current = getPortfolioData();
  current.projects = projects;
  savePortfolioData(current);
  res.json({ success: true, message: 'Projects successfully updated.', projects });
});

// Protected: Add a Single Project
app.post('/api/portfolio/projects', requireAuth, (req: Request, res: Response) => {
  const project = req.body as Project;
  if (!project.title || !project.shortDescription) {
    res.status(400).json({ error: 'Project title and description are required.' });
    return;
  }

  const current = getPortfolioData();
  if (!project.id) {
    project.id = 'proj_' + Date.now();
  }
  current.projects.unshift(project);
  savePortfolioData(current);
  res.status(201).json({ success: true, message: 'Project added successfully.', project });
});

// Protected: Update a Single Project
app.put('/api/portfolio/projects/:id', requireAuth, (req: Request, res: Response) => {
  const { id } = req.params;
  const projectUpdate = req.body as Partial<Project>;

  const current = getPortfolioData();
  const index = current.projects.findIndex((p) => p.id === id);

  if (index === -1) {
    res.status(404).json({ error: 'Project not found.' });
    return;
  }

  current.projects[index] = {
    ...current.projects[index],
    ...projectUpdate,
    id // preserve immutable ID
  };

  savePortfolioData(current);
  res.json({ success: true, message: 'Project updated successfully.', project: current.projects[index] });
});

// Protected: Delete a Project
app.delete('/api/portfolio/projects/:id', requireAuth, (req: Request, res: Response) => {
  const { id } = req.params;
  const current = getPortfolioData();
  const initialLength = current.projects.length;
  current.projects = current.projects.filter((p) => p.id !== id);

  if (current.projects.length === initialLength) {
    res.status(404).json({ error: 'Project not found.' });
    return;
  }

  savePortfolioData(current);
  res.json({ success: true, message: 'Project removed successfully.' });
});

// Protected: Update Profile & About Details
app.put('/api/portfolio/profile', requireAuth, (req: Request, res: Response) => {
  const { profile, about } = req.body;
  const current = getPortfolioData();

  if (profile) current.profile = { ...current.profile, ...profile };
  if (about) current.about = { ...current.about, ...about };

  savePortfolioData(current);
  res.json({ success: true, message: 'Profile details updated.', profile: current.profile, about: current.about });
});

// Protected: Update Skills
app.put('/api/portfolio/skills', requireAuth, (req: Request, res: Response) => {
  const { skills } = req.body;
  if (!Array.isArray(skills)) {
    res.status(400).json({ error: 'Skills must be an array.' });
    return;
  }
  const current = getPortfolioData();
  current.skills = skills;
  savePortfolioData(current);
  res.json({ success: true, message: 'Skills updated.', skills });
});

// Protected: Update Tech Stack
app.put('/api/portfolio/tech-stack', requireAuth, (req: Request, res: Response) => {
  const { techStack } = req.body;
  if (!Array.isArray(techStack)) {
    res.status(400).json({ error: 'Tech stack must be an array.' });
    return;
  }
  const current = getPortfolioData();
  current.techStack = techStack;
  savePortfolioData(current);
  res.json({ success: true, message: 'Tech stack updated.', techStack });
});

// Protected: Get Contact Inquiries
app.get('/api/admin/messages', requireAuth, (_req: Request, res: Response) => {
  const messages = getMessages();
  res.json(messages);
});

// Protected: Mark message as read / delete message
app.patch('/api/admin/messages/:id/read', requireAuth, (req: Request, res: Response) => {
  const { id } = req.params;
  const messages = getMessages();
  const msg = messages.find((m) => m.id === id);
  if (msg) {
    msg.read = true;
    saveMessages(messages);
  }
  res.json({ success: true, message: 'Message marked as read.' });
});

// Public / Owner Avatar Upload (Accepts base64 or file upload)
app.post('/api/upload-avatar', (req: Request, res: Response) => {
  const { imageBase64, filename } = req.body;
  if (!imageBase64 || typeof imageBase64 !== 'string') {
    res.status(400).json({ error: 'Image data is required.' });
    return;
  }

  try {
    const publicImagesDir = path.resolve(process.cwd(), 'public', 'images');
    if (!fs.existsSync(publicImagesDir)) {
      fs.mkdirSync(publicImagesDir, { recursive: true });
    }

    // Strip prefix like data:image/png;base64,
    const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');

    const targetFile = path.join(publicImagesDir, 'mangal-kant.png');
    fs.writeFileSync(targetFile, buffer);

    const targetFileJpg = path.join(publicImagesDir, 'mangal-kant.jpg');
    fs.writeFileSync(targetFileJpg, buffer);

    // Update portfolio data
    const current = getPortfolioData();
    const avatarPath = `/images/mangal-kant.png?t=${Date.now()}`;
    current.profile.avatarUrl = avatarPath;
    savePortfolioData(current);

    console.log('[Avatar Upload] Successfully saved new portrait to public/images/mangal-kant.png');
    res.json({ success: true, avatarUrl: avatarPath, message: 'Portrait updated successfully.' });
  } catch (err: unknown) {
    console.error('Failed to save avatar image:', err);
    res.status(500).json({ error: 'Server error saving image.' });
  }
});

// Bootstrapping Dev Vite Server or Prod Static Files
async function startServer() {
  if (!IS_PROD) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[ORBIT Portfolio] Server running on http://0.0.0.0:${PORT} (Mode: ${IS_PROD ? 'Production' : 'Development'})`);
  });
}

startServer().catch((err) => {
  console.error('Fatal server boot error:', err);
  process.exit(1);
});
