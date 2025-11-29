
import React, { useState } from 'react';
import { Icon } from '../Icon';
import { ProgramType } from '../../types';
import { PROTOCOL_DATA } from '../../data/protocols';

export const ProtocolLibrary: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedProtocol, setExpandedProtocol] = useState<ProgramType | null>(null);

  const protocolsList = Object.keys(PROTOCOL_DATA).map(key => {
    const type = key as ProgramType;
    const sessions = PROTOCOL_DATA[type];
    return {
        type,
        title: type.charAt(0).toUpperCase() + type.slice(1),
        description: `Programme ${sessions.length} séances.`,
        sessions
    };
  });

  const filteredProtocols = protocolsList.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen bg-background-dark pb-24">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background-dark/90 backdrop-blur p-4 border-b border-border-dark flex items-center justify-between">
        <div className="w-10">
            <Icon name="menu" className="text-text-secondary-dark" />
        </div>
        <h1 className="text-lg font-bold text-white">Protocoles</h1>
        <button className="w-10 h-10 rounded-full flex items-center justify-center text-white">
            <Icon name="more_vert" />
        </button>
      </header>

      {/* Search */}
      <div className="px-4 py-3">
        <div className="flex items-center bg-surface-dark border border-border-dark rounded-xl px-3 h-12">
            <Icon name="search" className="text-text-secondary-dark" />
            <input 
                type="text" 
                placeholder="Rechercher un protocole..."
                className="flex-1 bg-transparent border-none outline-none text-white px-3 placeholder:text-text-secondary-dark/50"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
      </div>

      {/* List */}
      <main className="flex-1 px-4 space-y-3">
        {filteredProtocols.map((protocol) => (
            <div 
                key={protocol.type} 
                onClick={() => setExpandedProtocol(expandedProtocol === protocol.type ? null : protocol.type)}
                className={`bg-surface-dark border ${expandedProtocol === protocol.type ? 'border-primary' : 'border-border-dark'} rounded-xl overflow-hidden transition-all`}
            >
                <div className="flex items-center gap-4 p-4 cursor-pointer hover:bg-white/5">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl transition-colors ${expandedProtocol === protocol.type ? 'bg-primary text-black' : 'bg-primary/10 text-primary'}`}>
                        <Icon 
                            name={
                                protocol.type === ProgramType.TABAC ? 'smoking_rooms' :
                                protocol.type === ProgramType.ALCOOL ? 'liquor' :
                                protocol.type === ProgramType.CANNABIS ? 'grass' :
                                protocol.type === ProgramType.CRACK ? 'pill' : 'blender'
                            } 
                            filled 
                        />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-base font-bold text-white">{protocol.title}</h3>
                        <p className="text-xs text-text-secondary-dark">12 Séances • 4 Semaines</p>
                    </div>
                    <Icon name="expand_more" className={`text-text-secondary-dark transition-transform ${expandedProtocol === protocol.type ? 'rotate-180' : ''}`} />
                </div>
                
                {/* Expanded Syllabus */}
                {expandedProtocol === protocol.type && (
                    <div className="border-t border-white/5 bg-black/20">
                        {protocol.sessions.map((session, idx) => (
                            <div key={session.id} className="p-3 flex gap-3 border-b border-white/5 last:border-0 hover:bg-white/5">
                                <span className="text-xs font-bold text-primary w-6 pt-1">S{session.id}</span>
                                <div>
                                    <p className="text-sm font-bold text-white">{session.title}</p>
                                    <p className="text-xs text-text-secondary-dark mt-0.5">{session.focus}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        ))}
      </main>
    </div>
  );
};
