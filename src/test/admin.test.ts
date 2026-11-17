import { describe,it,expect } from 'vitest';
import { ADMIN_IDLE_MS,ADMIN_PAGE_SIZE,idleExpired,deletionConfirmed,hireStatuses,csvValue } from '@/lib/admin';
describe('admin rules',()=>{
it('expires at 30 minutes of inactivity',()=>{expect(ADMIN_IDLE_MS).toBe(1800000);expect(idleExpired(1000,1800999)).toBe(false);expect(idleExpired(1000,1801000)).toBe(true);});
it('uses 25 records per page',()=>expect(ADMIN_PAGE_SIZE).toBe(25));
it('requires the exact creator ID before deletion',()=>{expect(deletionConfirmed(['JV-0007'],'JV-0006')).toBe(false);expect(deletionConfirmed(['JV-0007'],'JV-0007')).toBe(true);});
it('requires all IDs for bulk deletion',()=>{expect(deletionConfirmed(['JV-0007','JV-0008'],'JV-0007')).toBe(false);expect(deletionConfirmed(['JV-0007','JV-0008'],'JV-0007, JV-0008')).toBe(true);});
it('supports only the four requested hire statuses',()=>expect(hireStatuses).toEqual(['New','Contacted','In Progress','Closed']));
it('neutralizes formulas in exported user data',()=>{expect(csvValue('=HYPERLINK("evil")')).toBe('"\'=HYPERLINK(""evil"")"');});
});
