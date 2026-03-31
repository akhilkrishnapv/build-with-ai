import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X, LayoutTemplate, Palette, Zap, Type, Frame } from 'lucide-react';
import { useSettings, Theme, LayoutObj, CardStyle, AnimationSpeed, FontSize } from '@/contexts/SettingsContext';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

export default function SettingsModal({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) {
  const { theme, layout, cardStyle, animations, fontSize, updateSetting } = useSettings();

  const themes: { id: Theme, name: string, color: string }[] = [
    { id: 'dark', name: 'Dark Mode', color: 'bg-zinc-900 border-zinc-700' },
    { id: 'light', name: 'Light Mode', color: 'bg-white border-zinc-200' },
    { id: 'red-black', name: 'Blood Red', color: 'bg-red-950 border-red-700' },
    { id: 'green-black', name: 'Terminal Green', color: 'bg-green-950 border-green-700' },
    { id: 'blue-white', name: 'Corporate Blue', color: 'bg-blue-600 border-blue-400' },
    { id: 'cyberpunk', name: 'Cyberpunk Neon', color: 'bg-pink-600 border-cyan-400' },
    { id: 'minimal-gray', name: 'Minimal Gray', color: 'bg-neutral-200 border-neutral-400' },
  ];

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[999] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed left-[50%] top-[50%] z-[1000] w-full max-w-2xl translate-x-[-50%] translate-y-[-50%] bg-background text-foreground border border-border shadow-2xl rounded-2xl p-0 overflow-hidden outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]">
          
          <div className="flex items-center justify-between p-6 border-b border-border bg-card/50">
            <h2 className="text-xl font-bold tracking-tight">System Preferences</h2>
            <Dialog.Close className="rounded-full p-2 hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors">
              <X className="w-5 h-5" />
            </Dialog.Close>
          </div>

          <div className="p-6">
            <Tabs defaultValue="appearance" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-6">
                <TabsTrigger value="appearance" className="flex gap-2"><Palette className="w-4 h-4"/> Appearance</TabsTrigger>
                <TabsTrigger value="layout" className="flex gap-2"><LayoutTemplate className="w-4 h-4"/> Layout</TabsTrigger>
                <TabsTrigger value="animations" className="flex gap-2"><Zap className="w-4 h-4"/> Motion</TabsTrigger>
                <TabsTrigger value="typography" className="flex gap-2"><Type className="w-4 h-4"/> Typography</TabsTrigger>
              </TabsList>

              {/* Appearance */}
              <TabsContent value="appearance" className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-3">
                     <h3 className="text-sm font-semibold">Color Theme</h3>
                     <label className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground cursor-pointer">
                        <input type="checkbox" className="accent-primary" onChange={(e) => {
                           if(e.target.checked) {
                              updateSetting('theme', window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                           }
                        }}/>
                        System Default
                     </label>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {themes.map(t => (
                      <div 
                        key={t.id}
                        onClick={() => updateSetting('theme', t.id)}
                        className={`cursor-pointer border-2 rounded-xl p-3 text-center transition-all flex flex-col items-center gap-2 ${theme === t.id ? 'border-primary bg-primary/10' : 'border-border bg-card hover:border-primary/50'}`}
                      >
                        <div className={`w-8 h-8 rounded-full border shadow-sm ${t.color}`} />
                        <div className="text-xs font-semibold">{t.name}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* Layout */}
              <TabsContent value="layout" className="space-y-6">
                <div>
                  <h3 className="text-sm font-semibold mb-3">Dashboard Width</h3>
                  <div className="flex gap-3">
                    {(['narrow', 'comfortable', 'wide'] as LayoutObj[]).map(l => (
                      <button 
                        key={l} onClick={() => updateSetting('layout', l)}
                        className={`flex-1 py-2 text-sm rounded-md border text-center capitalize ${layout === l ? 'bg-primary text-primary-foreground border-primary' : 'bg-card text-foreground border-border hover:bg-secondary'}`}
                      >
                        {l}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-semibold mb-3">Card Style</h3>
                  <div className="flex gap-3 text-sm">
                     {(['rounded', 'sharp', 'glass'] as CardStyle[]).map(c => (
                      <button 
                        key={c} onClick={() => updateSetting('cardStyle', c)}
                        className={`flex-1 py-4 flex flex-col items-center gap-2 border capitalize ${cardStyle === c ? 'border-primary text-primary' : 'border-border text-muted-foreground hover:bg-secondary'} ${c === 'rounded' ? 'rounded-xl' : c === 'sharp' ? 'rounded-none' : 'rounded-lg bg-background/50 backdrop-blur-md'}`}
                      >
                        <Frame className="w-5 h-5"/>
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* Animations */}
              <TabsContent value="animations">
                <h3 className="text-sm font-semibold mb-3">Transition Speeds</h3>
                <div className="flex flex-col gap-2">
                   {(['none', 'slow', 'default', 'fast'] as AnimationSpeed[]).map(a => (
                      <label key={a} className="flex items-center gap-3 p-3 rounded-lg border border-border cursor-pointer hover:bg-secondary">
                        <input 
                          type="radio" 
                          name="animation" 
                          checked={animations === a} 
                          onChange={() => updateSetting('animations', a)} 
                          className="w-4 h-4 accent-primary"
                        />
                        <span className="capitalize text-sm font-medium">{a === 'none' ? 'Disabled (Reduce Motion)' : a}</span>
                      </label>
                   ))}
                </div>
              </TabsContent>

              {/* Typography */}
              <TabsContent value="typography">
                <h3 className="text-sm font-semibold mb-3">Global Font Size</h3>
                <div className="flex items-baseline gap-4">
                  {(['sm', 'md', 'lg'] as FontSize[]).map(f => (
                    <button 
                      key={f} onClick={() => updateSetting('fontSize', f)}
                      className={`flex-1 py-4 rounded-lg border flex flex-col items-center justify-center ${fontSize === f ? 'bg-primary/10 border-primary text-primary' : 'border-border bg-card'}`}
                    >
                      <Type className={`${f === 'sm' ? 'w-4 h-4' : f === 'md' ? 'w-6 h-6' : 'w-8 h-8'} mb-2`} />
                      <span className="text-xs uppercase tracking-wider font-semibold">{f}</span>
                    </button>
                  ))}
                </div>
              </TabsContent>

            </Tabs>
          </div>

          <div className="p-4 border-t border-border bg-card/50 flex justify-end">
            <button className="text-sm text-muted-foreground hover:text-foreground mr-4" onClick={() => {
              updateSetting('theme', 'dark');
              updateSetting('layout', 'comfortable');
              updateSetting('cardStyle', 'rounded');
            }}>Reset to Defaults</button>
            <Dialog.Close className="bg-primary text-primary-foreground px-6 py-2 rounded-md font-medium shadow hover:bg-primary/90">
              Save & Close
            </Dialog.Close>
          </div>

        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
