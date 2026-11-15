import { createContext, useContext, useState, type ReactNode } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { MissionFlow } from './MissionFlow';
import type { MissionPath } from '@/lib/mission';
import { btn } from '@/components/site/ui';
const Context=createContext<(path:MissionPath)=>void>(()=>{});
export function MissionProvider({children}:{children:ReactNode}) {
 const [path,setPath]=useState<MissionPath|undefined>(),[source,setSource]=useState('/');
 return <Context.Provider value={p=>{setSource(window.location.pathname);setPath(p);}}>{children}<Dialog open={!!path} onOpenChange={open=>{if(!open)setPath(undefined);}}><DialogContent className="z-[80] block h-[100svh] max-h-[100svh] w-full max-w-none overflow-y-auto rounded-none border-0 bg-background/95 p-6 md:p-12" aria-describedby="mission-description"><DialogTitle className="sr-only">Join JOMOVERSE</DialogTitle><DialogDescription id="mission-description" className="sr-only">Mission Launch registration</DialogDescription><div className="mx-auto max-w-6xl">{path&&<MissionFlow key={path} initialPath={path} source={source}/>}</div></DialogContent></Dialog></Context.Provider>;
}
export function MissionButton({path,children,className,variant='primary'}:{path:MissionPath;children:ReactNode;className?:string;variant?:'primary'|'outline'}) {
 const open=useContext(Context);
 return <Button className={`${btn(variant)} h-auto ${className??''}`} onClick={()=>open(path)}>{children}</Button>;
}
