import type { MissionPath } from './mission';
// No answers or contact details are included. Analytics integrations can subscribe to this event.
export function trackMission(event: 'step_viewed' | 'step_completed' | 'form_submitted', path: MissionPath, step: number) {
 const detail = { event, path, step, timestamp: new Date().toISOString() };
 window.dispatchEvent(new CustomEvent('jomoverse:analytics', { detail }));
 try { const events = JSON.parse(localStorage.getItem('jv-mission-events') ?? '[]'); localStorage.setItem('jv-mission-events', JSON.stringify([...events, detail].slice(-200))); } catch { /* Storage is optional. */ }
}
